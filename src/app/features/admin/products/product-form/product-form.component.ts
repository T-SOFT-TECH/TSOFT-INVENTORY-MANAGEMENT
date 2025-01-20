// product-form.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { BrandService } from '../../../../core/services/brand.service';
import { ProductFormConfigService, CategoryFormConfig, FormFieldConfig } from '../../../../core/services/product-form-config.service';
import { HotToastService } from '@ngxpert/hot-toast';
import {
  Category,
  Brand,
  Product,
  ProductInput,
  ProductFormData,
  ProductFormRawValue
} from '../../../../core/models/interfaces';

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

  // Form
  productForm = this.fb.group({});

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

      this.categories.set(categories);
      this.brands.set(brands);

      // Update brand options in form config
      this.formConfigService.updateBrandOptions(
        brands.map(b => b.name)
      );
    } catch (error) {
      this.toast.error('Failed to load initial data');
    } finally {
      this.isLoading.set(false);
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
    const grouped = fields.reduce((acc, field) => {
      const group = field.group || 'other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(field);
      return acc;
    }, {} as { [key: string]: FormFieldConfig[] });

    this.groupedFields.set(grouped);
  }

  private rebuildForm(config: CategoryFormConfig) {
    const formGroup: any = {};

    config.fields.forEach(field => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'number') {
        if (field.min !== undefined) validators.push(Validators.min(field.min));
        if (field.max !== undefined) validators.push(Validators.max(field.max));
      }

      formGroup[field.name] = [field.defaultValue || '', validators];
    });

    this.productForm = this.fb.group(formGroup);
  }

  private async loadProduct(id: string) {
    try {
      this.isLoading.set(true);
      const product = await this.productService.getProductById(id);
      if (product) {
        // First set the category and rebuild form
        this.onCategoryChange(product.category); // Changed from categoryId to category
        // Then patch the values
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

      // Create base product data
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

      // Add category-specific fields to specifications
      const config = this.formConfig();
      if (config) {
        const specFields = config.fields.filter(f => f.group === 'specifications');
        const specifications = specFields.reduce((acc, field) => {
          if (formValues[field.name] !== undefined && formValues[field.name] !== null) {
            acc[field.name] = formValues[field.name];
          }
          return acc;
        }, {} as Record<string, any>);

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
      this.toast.error(
        this.isEditMode()
          ? 'Failed to update product'
          : 'Failed to create product'
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  readonly objectKeys = Object.keys;

// Add method to handle undefined min/max
  getNumericValue(value: number | undefined): number | null {
    return value ?? null;
  }

}
