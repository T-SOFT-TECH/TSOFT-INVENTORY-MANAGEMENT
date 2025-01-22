
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { BrandService } from '../../../../core/services/brand.service';
import {
  ProductFormConfigService,
  CategoryFormConfig,
  FormFieldConfig
} from '../../../../core/services/product-form-config.service';
import { HotToastService } from '@ngxpert/hot-toast';
import {
  Category,
  Brand,
  Product,
  ProductInput,
  ProductFormRawValue
} from '../../../../core/models/interfaces';


interface CategoryOption {
  $id: string;
  name: string;
  level: number;
  children?: CategoryOption[];
  parent?: CategoryOption;
}

interface CategoryNode {
  $id: string;
  name: string;
  level: number;
  children?: CategoryNode[];
  parent?: CategoryNode;
}


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private brandService = inject(BrandService);
  private formConfigService = inject(ProductFormConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toast = inject(HotToastService);

  // UI State
  isLoading = signal(false);
  isEditMode = signal(false);
  selectedCategory = signal<string | null>(null);
  imagePreview = signal<string | null>(null);

  // Data
  categories = signal<Category[]>([]);
  brands = signal<Brand[]>([]);
  formConfig = signal<CategoryFormConfig | null>(null);
  groupedFields = signal<{ [key: string]: FormFieldConfig[] }>({});

  subCategories = signal<CategoryNode[]>([]);


  // Form
  productForm: FormGroup = this.fb.group({});

  parentCategories = signal<CategoryOption[]>([]);
  selectedParentCategory = signal<CategoryOption | null>(null);


  ngOnInit() {
    this.loadInitialData();
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this.isEditMode.set(true);
      this.loadProduct(productId);
    }
  }

  private async loadInitialData() {
    try {
      this.isLoading.set(true);
    const [categories, brands] = await Promise.all([
      this.categoryService.getCategories(),
      this.brandService.getBrands()
    ]);

    this.parentCategories.set(this.buildCategoryTree(categories));
    this.brands.set(brands);

      this.categories.set(categories);
      this.brands.set(brands);

      this.formConfigService.updateBrandOptions(
        brands.map(b => b.$id)
      );
    } catch (error) {
      console.error('Error loading initial data:', error);
      this.toast.error('Failed to load initial data');
    } finally {
      this.isLoading.set(false);
    }
  }


  private buildCategoryTree(categories: Category[]): CategoryOption[] {
    const categoryMap = new Map<string, CategoryOption>();
    const roots: CategoryOption[] = [];

    // First pass: Create category options
    categories.forEach(cat => {
      categoryMap.set(cat.$id, {
        $id: cat.$id,
        name: cat.name,
        level: cat.level,
        children: []
      });
    });

    // Second pass: Build tree structure
    categories.forEach(cat => {
      const category = categoryMap.get(cat.$id)!;
      if (cat.parentId) {
        const parent = categoryMap.get(cat.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(category);
          category.parent = parent;
        }
      } else {
        roots.push(category);
      }
    });

    return roots;
  }

  onParentCategorySelect(category: CategoryOption) {
    this.selectedParentCategory.set(category);
    this.subCategories.set(category.children || []);
    this.selectedCategory.set(null);
  }

  onSubCategorySelect(categoryId: string) {
    this.selectedCategory.set(categoryId);
    const config = this.formConfigService.getFormConfig(categoryId);
    if (config) {
      this.formConfig.set(config);
      this.rebuildForm(config);
      this.groupFieldsByCategory(config.fields);
    }
  }






  onCategoryChange(categoryId: string) {
    this.selectedCategory.set(categoryId);
    const config = this.formConfigService.getFormConfig(categoryId);
    if (config) {
      this.formConfig.set(config);
      this.rebuildForm(config);
      this.groupFieldsByCategory(config.fields);
    }
  }

  private groupFieldsByCategory(fields: FormFieldConfig[]) {
    const grouped = fields.reduce<{ [key: string]: FormFieldConfig[] }>((acc, field) => {
      const group = field.group || 'other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(field);
      return acc;
    }, {});

    this.groupedFields.set(grouped);
  }

  private rebuildForm(config: CategoryFormConfig) {
    const formGroup: Record<string, any> = {};

    config.fields.forEach((field: FormFieldConfig) => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'number') {
        if (field.min !== undefined) validators.push(Validators.min(field.min));
        if (field.max !== undefined) validators.push(Validators.max(field.max));
      }

      formGroup[field.name] = [field.defaultValue ?? '', validators];
    });

    this.productForm = this.fb.group(formGroup);
  }

  private async loadProduct(id: string) {
    try {
      this.isLoading.set(true);
      const product = await this.productService.getProductById(id);
      if (product) {
        this.onCategoryChange(product.category);
        this.productForm.patchValue({
          ...product,
          specifications: product.specifications || {}
        });

        if (product.imageUrl) {
          this.imagePreview.set(
            this.productService.getProductImageUrl(product.imageUrl)
          );
        }
      }
    } catch (error) {
      console.error('Error loading product:', error);
      this.toast.error('Failed to load product');
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      this.isLoading.set(true);
      const fileId = await this.productService.uploadImage(file);
      this.productForm.patchValue({ imageUrl: fileId });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      this.toast.error('Failed to upload image');
    } finally {
      this.isLoading.set(false);
    }
  }

  generateSKU() {
    const nameControl = this.productForm.get('name');
    const category = this.selectedCategory();
    if (nameControl?.value && category) {
      const timestamp = Date.now().toString(36).toUpperCase();
      const categoryPrefix = category.substring(0, 3);
      const namePrefix = String(nameControl.value).substring(0, 3);
      const sku = `${categoryPrefix}-${namePrefix}-${timestamp}`;
      this.productForm.patchValue({ sku });
    }
  }

  getFieldError(field: FormFieldConfig): string {
    const control = this.productForm.get(field.name);
    if (!control?.errors || !control.touched) return '';

    if (control.errors['required']) return `${field.label} is required`;
    if (control.errors['min']) return `${field.label} must be at least ${field.min}`;
    if (control.errors['max']) return `${field.label} cannot exceed ${field.max}`;

    return 'Invalid value';
  }

  hasFieldError(fieldName: string): boolean {
    const control = this.productForm.get(fieldName);
    return !!control && control.invalid && control.touched;
  }

  async onSubmit() {
    if (!this.productForm.valid) {
      this.toast.error('Please check all required fields');
      return;
    }

    try {
      this.isLoading.set(true);
      const formValues = this.productForm.getRawValue() as ProductFormRawValue;
      const categoryId = this.selectedCategory();

      if (!categoryId) {
        this.toast.error('Please select a category');
        return;
      }

      const productData: ProductInput = {
        name: formValues.name,
        description: formValues.description,
        category: categoryId,
        brand: formValues.brand,
        sku: formValues.sku,
        price: Number(formValues.price),
        cost: Number(formValues.cost),
        stockQuantity: Number(formValues.stockQuantity),
        lowStockThreshold: Number(formValues.lowStockThreshold),
        status: formValues.status || 'active',
        imageUrl: formValues.imageUrl,
        specifications: {}
      };

      const config = this.formConfig();
      if (config) {
        const specFields = config.fields.filter(field => field.group === 'specifications');
        const specifications = specFields.reduce<Record<string, any>>((acc, field) => {
          if (formValues[field.name] != null) {
            acc[field.name] = formValues[field.name];
          }
          return acc;
        }, {});

        if (Object.keys(specifications).length > 0) {
          productData.specifications = specifications;
        }
      }

      if (this.isEditMode()) {
        await this.productService.updateProduct(
          this.route.snapshot.params['id'],
          productData
        );
        this.toast.success('Product updated successfully');
      } else {
        await this.productService.createProduct(productData);
        this.toast.success('Product created successfully');
      }

      this.router.navigate(['/admin/products']);
    } catch (error) {
      console.error('Form submission error:', error);
      this.toast.error(
        this.isEditMode()
          ? 'Failed to update product: ' + (error instanceof Error ? error.message : 'Unknown error')
          : 'Failed to create product: ' + (error instanceof Error ? error.message : 'Unknown error')
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  readonly objectKeys = Object.keys;

  getNumericValue(value: number | undefined): number | null {
    return value ?? null;
  }


  getGroupIcon(group: string): string {
    const icons: Record<string, string> = {
      basic: 'info',
      pricing: 'payments',
      specifications: 'settings',
      inventory: 'inventory',
      features: 'featured_play_list',
      dimensions: 'straighten',
      technical: 'memory',
      connectivity: 'wifi',
      display: 'desktop_windows',
      power: 'power',
      storage: 'storage',
      audio: 'headphones',
      other: 'more_horiz'
    };
    return icons[group.toLowerCase()] || 'label';
  }

  getFieldIcon(field: FormFieldConfig): string {
    const icons: Record<string, string> = {
      name: 'label',
      price: 'attach_money',
      cost: 'money',
      sku: 'qr_code',
      brand: 'business',
      stockQuantity: 'inventory_2',
      lowStockThreshold: 'warning',
      description: 'description',
      status: 'toggle_on',
      weight: 'scale',
      dimensions: 'square_foot',
      capacity: 'sd_storage',
      power: 'bolt',
      speed: 'speed',
      resolution: 'hd',
      size: 'straighten',
      type: 'category',
      color: 'palette',
      material: 'format_paint',
      warranty: 'verified',
      connectivity: 'wifi',
      features: 'featured_play_list'
    };

    // Try to find an icon based on the field name or type
    for (const [key, value] of Object.entries(icons)) {
      if (field.name.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }

    // Default icons based on field type
    const typeIcons: Record<string, string> = {
      text: 'text_fields',
      number: 'numbers',
      select: 'list',
      multiselect: 'checklist',
      textarea: 'notes',
      checkbox: 'check_box',
      radio: 'radio_button_checked',
      date: 'calendar_today',
      email: 'email',
      url: 'link',
      tel: 'phone',
      password: 'lock'
    };

    return typeIcons[field.type] || 'label';
  }

  getSelectedSubCategoryName(): string {
    return this.subCategories()
      .find((category: CategoryNode) => category.$id === this.selectedCategory())
      ?.name || '';
  }


}
