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
import {FormFieldOption} from '../../../../core/interfaces/base/base.interfaces';
import {LoadingService} from '../../../../core/services/loading.service';




interface CategoryOption {
  $id: string;
  name: string;
  level: number;
  children?: CategoryOption[];
  isExpanded?: boolean;
  isSelected?: boolean;
}

interface CategoryNode {
  $id: string;
  name: string;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  children?: CategoryNode[];
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
  private loadingService = inject(LoadingService);


  categorySearchQuery = '';
  private allCategories = signal<Category[]>([]);
  searchResults = signal<Category[]>([]);

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
    lowStockThreshold: [0, Validators.required],
    status: ['active'],
    imageId: [''], // Add imageId control
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

      this.allCategories.set(categories); // Store all categories
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

  searchCategories() {
    if (!this.categorySearchQuery.trim()) {
      this.searchResults.set([]);
      return;
    }

    const query = this.categorySearchQuery.toLowerCase();
    const results = this.allCategories().filter(category =>
      category.name.toLowerCase().includes(query)
    );

    this.searchResults.set(results);
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
            isExpanded: false,
            isSelected: false
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
      isSelected: false,
      children: child.children ? this.buildNestedCategories(child) : undefined
    }));
  }



  private findParentInSubCategories(child: CategoryNode, categories: CategoryNode[]): CategoryNode | null {
    for (const cat of categories) {
      if (cat.children?.some(c => c.$id === child.$id)) {
        return cat;
      }
      if (cat.children?.length) {
        const parent = this.findParentInSubCategories(child, cat.children);
        if (parent) return parent;
      }
    }
    return null;
  }

// Update collapseAll method
  private collapseAll(categories: CategoryNode[]) {
    categories.forEach(cat => {
      cat.isExpanded = false;
      cat.isSelected = false;
      if (cat.children?.length) {
        this.collapseAll(cat.children);
      }
    });
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
    const staticControls = ['name', 'sku', 'description', 'brand', 'price', 'cost',
      'stockQuantity', 'lowStockThreshold', 'status', 'imageId'];

    // Remove non-static controls
    Object.keys(this.productForm.controls)
      .filter(key => !staticControls.includes(key))
      .forEach(key => this.productForm.removeControl(key));

    // Add dynamic controls from config
    config.fields.forEach((field: FormFieldConfig) => {
      if (!staticControls.includes(field.name)) {
        const currentValue = this.isEditMode()
          ? this.productForm.value.specifications?.[field.name]
          : this.getInitialValue(field);

        this.productForm.addControl(
          field.name,
          this.fb.control(currentValue, field.required ? [Validators.required] : [])
        );
      }
    });

    this.groupFieldsByCategory(config.fields);
  }

// Update getInitialValue method
  private getInitialValue(field: FormFieldConfig): any {
    // If editing existing product, use existing value from specifications
    if (this.isEditMode()) {
      const product = this.productForm.value;
      if (product.specifications && product.specifications[field.name] !== undefined) {
        return product.specifications[field.name];
      }
    }

    // Otherwise use default values based on field type
    switch(field.type) {
      case 'number':
        return field.defaultValue ?? null;
      case 'checkbox':
        return field.defaultValue ?? false;
      case 'multiselect':
      case 'checkbox-group':
        return field.defaultValue ?? [];
      default:
        return field.defaultValue ?? '';
    }
  }


  private async loadProduct(id: string) {

    try {
      this.isLoading.set(true);
      this.loadingService.start('Loading product details...');

      const product = await this.productService.getProductDetails(id);

      if (product) {
        // Loading categories requires several steps, so update the loading message
        this.loadingService.start('Setting up product categories...');

        const allCategories = await this.categoryService.getCategories();

        const productCategory = allCategories.find(c => c.$id === product.category.$id);
        if (!productCategory) {
          throw new Error('Product category not found');
        }

        // Building category hierarchy - this is a complex operation so let's inform the user
        this.loadingService.start('Building category structure...');

        const categoryPath = this.getCategoryPath(productCategory, allCategories);
        const pathIds = categoryPath.map(cat => cat.$id);
        const rootCategory = categoryPath[0];

        // Set up parent category with full hierarchy
        this.selectedParentCategory.set({
          $id: rootCategory.$id,
          name: rootCategory.name,
          level: rootCategory.level,
          children: this.buildCategoryTree(allCategories)
            .find(c => c.$id === rootCategory.$id)?.children,
          isExpanded: true,
          isSelected: false
        });

        // Build and expand subcategories
        const subCategories = this.buildNestedCategories(this.selectedParentCategory()!);
        this.expandCategoryPath(subCategories, pathIds);
        this.subCategories.set(subCategories);
        this.selectedCategory.set(product.category.$id);

        // Loading form configuration and rebuilding the form
        this.loadingService.start('Preparing product form...');

        const config = this.formConfigService.getFormConfig(product.category.$id);
        if (config) {
          this.formConfig.set(config);
          this.rebuildForm(config);
          this.groupFieldsByCategory(config.fields);
        }

        // Populating form with product data
        this.loadingService.start('Loading product information...');

        this.productForm.patchValue({
          name: product.name,
          sku: product.sku,
          description: product.description,
          brand: product.brand.$id,
          price: product.price,
          lowStockThreshold: product.lowStockThreshold,
          status: product.status,
          imageId: product.imageId
        });

        // Handle specifications data separately as it requires special processing
        if (product.specifications) {
          this.loadingService.start('Loading product specifications...');

          const { $id, $createdAt, $updatedAt, $permissions, $databaseId, $collectionId, product: _, ...cleanSpecs } = product.specifications;

          Object.entries(cleanSpecs).forEach(([key, value]) => {
            const control = this.productForm.get(key);
            if (control) {
              if (Array.isArray(value)) {
                control.patchValue(value.length === 0 ? [] : value);
              } else {
                control.patchValue(value);
              }
            }
          });
        }

        // Handle image preview loading last
        if (product.imageId) {
          this.loadingService.start('Loading product image...');
          this.imagePreview.set(
            this.productService.getProductImageUrl(product.imageId)
          );
        }

        this.loadingService.start('Finalizing product setup...');
      }
    } catch (error) {
      console.error('Error loading product:', error);
      this.toast.error('Failed to load product');
    } finally {
      // Clean up all loading states
      this.loadingService.clear();
      this.isLoading.set(false);
    }
  }

// Helper method to find the path from root to a category
  private getCategoryPath(category: Category, allCategories: Category[]): Category[] {
    const path: Category[] = [category];
    let current = category;

    while (current.parentId) {
      const parent = allCategories.find(c => c.$id === current.parentId);
      if (!parent) break;
      path.unshift(parent);
      current = parent;
    }

    return path;
  }

  private expandCategoryPath(categories: CategoryNode[], pathIds: string[]): void {
    categories.forEach(category => {
      if (pathIds.includes(category.$id)) {
        category.isExpanded = true;
        category.isSelected = category.$id === pathIds[pathIds.length - 1];

        if (category.children) {
          this.expandCategoryPath(category.children, pathIds);
        }
      }
    });
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
    // Inject the loading service if not already done at the component level


    // First validate the form and category selection
    if (this.productForm.invalid || !this.selectedCategory()) {
      this.toast.error('Please check form fields');
      return;
    }

    try {
      // Start initial loading state
      const operation = this.isEditMode() ? 'Updating' : 'Creating';
      const productName = this.productForm.get('name')?.value;
      this.loadingService.start(`${operation} ${productName}...`);
      this.isLoading.set(true);

      // Handle image processing with specific loading state
      let imageId = this.productForm.get('imageId')?.value;

      if (this.selectedImageFile()) {
        try {
          this.loadingService.start('Uploading product image...');
          const productName = this.productForm.get('name')?.value;
          const renamedFile = this.createRenamedImageFile(
            this.selectedImageFile()!,
            productName
          );
          imageId = await this.productService.uploadImage(renamedFile);
        } catch (error) {
          this.toast.error('Failed to upload image');
          console.error('Image upload error:', error);
          return;
        }
      }

      // Update loading state for data preparation
      this.loadingService.start('Preparing product data...');
      const formValues = this.productForm.getRawValue();
      const specifications = this.getSpecifications();

      // Prepare the complete product data object
      const productData = {
        name: formValues.name,
        description: formValues.description,
        category: this.selectedCategory()!,
        sku: formValues.sku,
        price: Number(formValues.price),
        lowStockThreshold: Number(formValues.lowStockThreshold),
        status: formValues.status || 'active',
        brand: formValues.brand,
        specifications,
        ...(imageId ? { imageId } : {})
      };

      // Handle create or update with specific loading messages
      if (this.isEditMode()) {
        const productId = this.route.snapshot.params['id'];
        this.loadingService.start(`Updating ${productName}...`);
        console.log('Updating product:', productId, productData);
        await this.productService.updateProduct(productId, productData);
        this.toast.success('Product updated successfully');
      } else {
        this.loadingService.start(`Creating ${productName}...`);
        console.log('Creating new product:', productData);
        await this.productService.createProduct(productData);
        this.toast.success('Product created successfully');
      }

      // Show loading state for navigation
      this.loadingService.start('Redirecting to products list...');
      await this.router.navigate(['/admin/products']);

    } catch (error) {
      // Error handling with specific messages
      const operation = this.isEditMode() ? 'update' : 'create';
      const errorMessage = error instanceof Error ?
        error.message : `Failed to ${operation} product`;
      this.toast.error(errorMessage);

      console.error(`Product ${operation} error:`, error);
    } finally {
      // Clean up all loading states
      this.loadingService.clear();
      this.isLoading.set(false);
    }
  }

  private createRenamedImageFile(originalFile: File, productName: string): File {
    const formattedName = productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);

    const fileExtension = originalFile.name.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = new Date().getTime();
    const newFilename = `${formattedName}-${timestamp}.${fileExtension}`;

    return new File([originalFile], newFilename, { type: originalFile.type });
  }

  private getSpecifications(): Record<string, any> {
    const config = this.formConfigService.getFormConfig(this.selectedCategory()!);
    const specs: Record<string, any> = {};

    const commonFieldNames = ['name', 'sku', 'description', 'brand', 'price',
      'cost', 'stockQuantity', 'lowStockThreshold',
      'status', 'imageId'];

    config?.fields.forEach(field => {
      if (!commonFieldNames.includes(field.name)) {
        const value = this.productForm.get(field.name)?.value;
        specs[field.name] = this.sanitizeValue(value, field.type, field.name);
      }
    });

    return specs;
  }

  private sanitizeValue(value: any, fieldType: string, fieldName: string): any {
    if (value === '' || value === null || value === undefined) {
      return this.getDefaultForType(fieldType);
    }

    // Convert numeric strings to numbers for number fields and specific select fields
    if (typeof value === 'string') {
      // These select fields should be converted to numbers
      const numericSelectFields = ['portCount', ];

      if (fieldType === 'number' || (fieldType === 'select' && numericSelectFields.includes(fieldName))) {
        return isNaN(Number(value)) ? null : Number(value);
      }
    }

    return value;
  }

  private getDefaultForType(fieldType: string): any {
    switch(fieldType) {
      case 'number':
      case 'checkbox-group':
      case 'multiselect':
        return null;
      case 'checkbox':
        return false;
      default:
        return null;
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

  getSelectionPath(): CategoryNode[] {
    const path: CategoryNode[] = [];
    if (this.selectedParentCategory()) {
      path.push({
        $id: this.selectedParentCategory()!.$id,
        name: this.selectedParentCategory()!.name,
        level: this.selectedParentCategory()!.level,
        isExpanded: false,
        isSelected: false
      });
    }

    const findPath = (categories: CategoryNode[]): boolean => {
      for (const cat of categories) {
        if (cat.$id === this.selectedCategory()) {
          path.push({
            ...cat,
            isExpanded: false,
            isSelected: true
          });
          return true;
        }
        if (cat.children?.length && findPath(cat.children)) {
          path.unshift({
            ...cat,
            isExpanded: true,
            isSelected: false
          });
          return true;
        }
      }
      return false;
    };

    findPath(this.subCategories());
    return path;
  }

  isFieldOptionType(option: string | FormFieldOption): option is FormFieldOption {
    return (option as FormFieldOption).value !== undefined;
  }

  getFullCategoryPath(category: Category): string {
    const path: string[] = [];
    let current = category;

    while (current) {
      const parent = this.allCategories().find(c => c.$id === current.parentId);
      if (parent) {
        path.unshift(parent.name);
        current = parent;
      } else {
        break;
      }
    }

    return path.join(' > ');
  }

  async selectSearchResult(category: Category) {
    // Find the root parent category
    let currentCategory = category;
    while (currentCategory.parentId) {
      const parent = this.allCategories().find(c => c.$id === currentCategory.parentId);
      if (parent) {
        currentCategory = parent;
      } else {
        break;
      }
    }

    // Select the parent category first
    const rootCategory = this.parentCategories().find(c => c.$id === currentCategory.$id);
    if (rootCategory) {
      this.onParentCategorySelect(rootCategory);

      // Wait for subcategories to be set
      await new Promise(resolve => setTimeout(resolve, 0));

      // Select the target category
      if (category.$id !== rootCategory.$id) {
        const categoryNode = this.findCategoryNodeById(this.subCategories(), category.$id);
        if (categoryNode) {
          this.onSubCategorySelect(categoryNode);
        }
      }
    }

    // Clear the search
    this.categorySearchQuery = '';
    this.searchResults.set([]);
  }

  private findCategoryNodeById(categories: CategoryNode[], id: string): CategoryNode | null {
    for (const category of categories) {
      if (category.$id === id) {
        return category;
      }
      if (category.children?.length) {
        const found = this.findCategoryNodeById(category.children, id);
        if (found) return found;
      }
    }
    return null;
  }



// Add this helper method to your component
  isCategorySelectable(category: CategoryNode): boolean {
    // A category is selectable if:
    // 1. It's a leaf node (no children) OR
    // 2. It has a form configuration assigned specifically to it
    return !category.children?.length ||
      !!this.formConfigService.getFormConfig(category.$id);
  }

  onSubCategorySelect(category: CategoryNode) {
    // Store the current selection
    const previouslySelected = this.selectedCategory();

    // Instead of collapsing all categories, we'll be selective about it
    // this.collapseAll(this.subCategories()); <- This is the line causing the issue

    // Update selection state
    this.selectedCategory.set(category.$id);

    // Create a set of category IDs that should remain expanded (the path to the selected category)
    const expandedPath = new Set<string>();

    // Helper function to find the path to the selected category
    const findPathToCategory = (cats: CategoryNode[], targetId: string, currentPath: string[] = []): string[] | null => {
      for (const cat of cats) {
        // Check if this is the target
        if (cat.$id === targetId) {
          return [...currentPath, cat.$id];
        }

        // Check children if any
        if (cat.children?.length) {
          const path = findPathToCategory(cat.children, targetId, [...currentPath, cat.$id]);
          if (path) return path;
        }
      }
      return null;
    };

    // Find the path to the selected category
    const path = findPathToCategory(this.subCategories(), category.$id);
    if (path) {
      // Add all categories in the path to our set of categories that should remain expanded
      path.forEach(id => expandedPath.add(id));
    }

    // Selective collapse that preserves the path to the selected category
    this.selectiveCollapse(this.subCategories(), expandedPath);

    // Make sure the selected category and its parents are expanded
    this.updateCategoryExpansion(this.subCategories(), category.$id, true);

    // Load the form configuration
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

// Add this new helper method to your component
  private selectiveCollapse(categories: CategoryNode[], expandedPath: Set<string>) {
    categories.forEach(cat => {
      // Only collapse if this category is not in the path to the selected category
      if (!expandedPath.has(cat.$id)) {
        cat.isExpanded = false;
      }

      // Process children recursively
      if (cat.children?.length) {
        this.selectiveCollapse(cat.children, expandedPath);
      }
    });
  }

// Add this helper method to expand a category and its parents
  private updateCategoryExpansion(categories: CategoryNode[], categoryId: string, expanded: boolean): boolean {
    for (const cat of categories) {
      if (cat.$id === categoryId) {
        cat.isExpanded = expanded;
        cat.isSelected = true;
        return true;
      }

      if (cat.children?.length) {
        const found = this.updateCategoryExpansion(cat.children, categoryId, expanded);
        if (found) {
          cat.isExpanded = expanded; // Expand parent if child is found
          return true;
        }
      }
    }
    return false;
  }


}
