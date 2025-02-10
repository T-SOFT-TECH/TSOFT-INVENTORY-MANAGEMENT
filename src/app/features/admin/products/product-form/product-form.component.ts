import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ProductService} from '../../../../core/services/product.service';
import {CategoryService} from '../../../../core/services/category.service';
import {BrandService} from '../../../../core/services/brand.service';
import {
  CategoryFormConfig,
  FormFieldConfig,
  ProductFormConfigService
} from '../../../../core/services/product-form-config.service';
import {HotToastService} from '@ngxpert/hot-toast';
import {AutoAnimationDirective} from '../../../../core/Directives/auto-Animate.directive';
import {Category} from '../../../../core/interfaces/category/category.interfaces';
import {Brand} from '../../../../core/interfaces/brand/brand.interfaces';
import {QuillEditorComponent} from 'ngx-quill';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {FormFieldOption} from '../../../../core/interfaces/base/base.interfaces';



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
  isExpanded?: boolean;
  isSelected?: boolean; // Add this
}



@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    AutoAnimationDirective,
    QuillEditorComponent,

  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
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
  private sanitizer = inject(DomSanitizer);


// Quill Editor Config
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // Basic formatting
      [{ header: 1 }, { header: 2 }], // Headers
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      ['link', 'image'], // Links and images

    ],
  };

  editorStyle = {
    height: '200px', // Set the height of the editor
    width: '100%', // Set the width of the editor
    backgroundColor: '#111827 ', // Optional: Add custom styles
    color: 'white',
  };


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

  //  signal to store the selected file
  selectedImageFile = signal<File | null>(null);


  // Form
  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    sku: ['', Validators.required],
    description: [''],
    brand: ['', Validators.required],
    price: [0, Validators.required],
    cost: [0, Validators.required],
    stockQuantity: [0, Validators.required],
    lowStockThreshold: [0, Validators.required],
    status: ['active'],
    imageUrl: [''], // Add imageUrl control
  });

  parentCategories = signal<CategoryOption[]>([]);
  selectedParentCategory = signal<CategoryOption | null>(null);

  constructor() {

  }


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
    const buildTree = (cats: Category[], parentId: string | null = null): CategoryOption[] => {
      return cats
        .filter(cat => cat.parentId === parentId)
        .map(cat => {
          const children = buildTree(cats, cat.$id);
          return {
            $id: cat.$id,
            name: cat.name,
            level: cat.level,
            children: children.length > 0 ? children : undefined,
            parent: undefined
          };
        });
    };

    return buildTree(categories);
  }

  onParentCategorySelect(category: CategoryOption) {
    this.selectedParentCategory.set(category);
    this.subCategories.set(this.buildNestedCategories(category));
    this.selectedCategory.set(null);
  }

  private buildNestedCategories(category: CategoryOption): CategoryNode[] {
    if (!category.children) return [];

    return category.children.map(child => ({
      $id: child.$id,
      name: child.name,
      level: child.level,
      isExpanded: false,
      children: child.children ? this.buildNestedCategories(child) : undefined
    }));
  }

  onSubCategorySelect(category: CategoryNode) {
    // Clear previous expansions first
    this.collapseAll(this.subCategories());

    // Then handle new selection
    const selectParents = (cat: CategoryNode) => {
      cat.isSelected = true;
      cat.isExpanded = true;
      const parent = this.findParentCategory(cat, this.subCategories());
      if (parent) {
        selectParents(parent);
      }
    };

    this.selectedCategory.set(category.$id);
    selectParents(category);

    const config = this.formConfigService.getFormConfig(category.$id);
    if (config) {
      this.formConfig.set(config);
      this.rebuildForm(config);
      this.groupFieldsByCategory(config.fields);
    }

    // Re-generating the SKU
    const nameControl = this.productForm.get('name');
    if (nameControl?.value) {
      const timestamp = this.productForm.get('sku')?.value?.split('-')[2] || Date.now().toString(36).toUpperCase();
      const categoryPrefix = category.$id.substring(0, 3).toUpperCase();
      const namePrefix = String(nameControl.value).substring(0, 3).toUpperCase();
      const sku = `${categoryPrefix}-${namePrefix}-${timestamp}`;
      this.productForm.patchValue({ sku });
    }
  }

  private collapseAll(categories: CategoryNode[]) {
    categories.forEach(cat => {
      cat.isExpanded = false;
      cat.isSelected = false;
      if (cat.children?.length) {
        this.collapseAll(cat.children);
      }
    });
  }


  private findParentCategory(child: CategoryNode, categories: CategoryNode[]): CategoryNode | null {
    for (const cat of categories) {
      if (cat.children?.includes(child)) {
        return cat;
      }
      if (cat.children?.length) {
        const parent = this.findParentCategory(child, cat.children);
        if (parent) return parent;
      }
    }
    return null;
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
    // First, remove all dynamic controls
    const staticControls = ['name', 'sku', 'description', 'brand', 'price', 'cost',
      'stockQuantity', 'lowStockThreshold', 'status', 'imageUrl'];

    Object.keys(this.productForm.controls).forEach(key => {
      if (!staticControls.includes(key)) {
        this.productForm.removeControl(key);
      }
    });

    // Then add new controls from config
    config.fields.forEach((field: FormFieldConfig) => {
      if (!this.productForm.contains(field.name)) {
        this.productForm.addControl(
          field.name,
          this.fb.control(field.defaultValue ?? '',
            field.required ? [Validators.required] : [])
        );
      }
    });

    this.groupFieldsByCategory(config.fields);
  }

  private async loadProduct(id: string) {
    try {
      this.isLoading.set(true);
      const product = await this.productService.getProductById(id);
      if (product) {
        this.onCategoryChange(product.category.$id);
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

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Store the file for later upload
    this.selectedImageFile.set(file);
  }

  generateInitialSKU() {
    const nameControl = this.productForm.get('name');
    if (nameControl?.value) {
      const timestamp = Date.now().toString(36).toUpperCase();
      const namePrefix = String(nameControl.value).substring(0, 3).toUpperCase();
      const sku = `TEMP-${namePrefix}-${timestamp}`;
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


/// Form Submission Method ///
  async onSubmit() {
    if (this.productForm.invalid || !this.selectedCategory()) {
      this.toast.error('Please check form fields');
      return;
    }

    try {
      this.isLoading.set(true);

      let imageUrl = this.productForm.get('imageUrl')?.value;
      if (this.selectedImageFile()) {
        imageUrl = await this.productService.uploadImage(this.selectedImageFile()!);
      }

      const formValues = this.productForm.getRawValue();
      const specifications = this.getSpecifications();

      const productData = {
        name: formValues.name,
        description: formValues.description,
        category: this.selectedCategory()!,
        sku: formValues.sku,
        price: Number(formValues.price),
        cost: Number(formValues.cost),
        stockQuantity: Number(formValues.stockQuantity),
        lowStockThreshold: Number(formValues.lowStockThreshold),
        status: formValues.status || 'active',
        imageUrl,
        brand: formValues.brand,
        specifications
      };
      console.dir(productData);
      await this.productService.createProduct(productData);

      this.toast.success('Product created successfully');
      await this.router.navigate(['/admin/products']);

    } catch (error) {
      this.toast.error(error instanceof Error ? error.message : 'Failed to create product');
    } finally {
      this.isLoading.set(false);
    }
  }

  private getSpecifications(): Record<string, any> {
    const config = this.formConfigService.getFormConfig(this.selectedCategory()!);
    const specs: Record<string, any> = {};

    // Get all fields except the common product fields
    const commonFieldNames = ['name', 'sku', 'description', 'brand', 'price',
                            'cost', 'stockQuantity', 'lowStockThreshold',
                            'status', 'imageUrl'];

    config?.fields.forEach(field => {
        if (!commonFieldNames.includes(field.name)) {
            specs[field.name] = this.productForm.get(field.name)?.value;
        }
    });

    return specs;
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

  getSelectionPath(): CategoryNode[] {
    const path: CategoryNode[] = [];
    if (this.selectedParentCategory()) {
      path.push({
        $id: this.selectedParentCategory()!.$id,
        name: this.selectedParentCategory()!.name,
        level: this.selectedParentCategory()!.level
      });
    }

    const findPath = (categories: CategoryNode[]): boolean => {
      for (const cat of categories) {
        if (cat.$id === this.selectedCategory()) {
          path.push(cat);
          return true;
        }
        if (cat.children?.length && findPath(cat.children)) {
          path.unshift(cat); // Changed from push to unshift
          return true;
        }
      }
      return false;
    };

    findPath(this.subCategories());
    return path;
  }

  getSafeDescription(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.productForm.get('description')?.value);
  }


  isFieldOptionType(option: string | FormFieldOption): option is FormFieldOption {
    return (option as FormFieldOption).value !== undefined;
  }


}
