// category-form.component.ts
import {Component, ElementRef, OnDestroy, ViewChild, inject, signal, computed} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { HotToastService } from '@ngxpert/hot-toast';
import {Category, CategoryCreateDTO} from '../../../../core/models/interfaces';

interface TreeSelectOption {
  $id: string;
  name: string;
  level: number;
  disabled?: boolean;
  isExpanded?: boolean;
  children?: TreeSelectOption[];
}

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toast = inject(HotToastService);

  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;

  @ViewChild('searchInput') searchInput!: ElementRef;


  isLoading = signal(false);
  isEditMode = signal(false);
  isDropdownOpen = false;
  categoriesTree = signal<TreeSelectOption[]>([]);
  maxLevel = 3;

  categoryForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    slug: ['', [Validators.required]],
    description: [''],
    parentId: [''],
    level: [0]
  });

  searchQuery = signal('');
  filteredCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.categoriesTree();
    return this.filterCategories(this.categoriesTree(), query);
  });

  constructor() {
    document.addEventListener('click', this.onClickOutside.bind(this));
    this.initializeForm();
  }

  private filterCategories(categories: TreeSelectOption[], query: string): TreeSelectOption[] {
    return categories.reduce<TreeSelectOption[]>((filtered, category) => {
      // Check if current category matches
      const nameMatches = category.name.toLowerCase().includes(query);

      let matchingChildren: TreeSelectOption[] = [];
      if (category.children?.length) {
        matchingChildren = this.filterCategories(category.children, query);
      }

      // Include category if name matches or has matching children
      if (nameMatches || matchingChildren.length > 0) {
        filtered.push({
          ...category,
          children: matchingChildren.length > 0 ? matchingChildren : undefined,
          isExpanded: matchingChildren.length > 0 // Auto-expand if has matching children
        });
      }

      return filtered;
    }, []);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onClickOutside.bind(this));
  }

  private async initializeForm() {
    await this.loadParentCategories();
    const categoryId = this.route.snapshot.params['id'];
    if (categoryId) {
      this.isEditMode.set(true);
      this.loadCategory(categoryId);
    }

    this.categoryForm.get('parentId')?.valueChanges.subscribe(parentId => {
      if (parentId) {
        const parentCategory = this.findCategoryById(this.categoriesTree(), parentId);
        if (parentCategory) {
          this.categoryForm.patchValue({
            level: parentCategory.level + 1
          });
        }
      } else {
        this.categoryForm.patchValue({ level: 0 });
      }
    });
  }

  private onClickOutside(event: MouseEvent) {
    if (
      this.isDropdownOpen &&
      !this.dropdownContainer.nativeElement.contains(event.target)
    ) {
      this.isDropdownOpen = false;
    }
  }

  private async loadParentCategories() {
    try {
      this.isLoading.set(true);
      const categories = await this.categoryService.getCategories();
      const treeOptions = this.buildCategoryTree(categories);
      this.categoriesTree.set(treeOptions);
    } catch (error) {
      this.toast.error('Failed to load parent categories');
    } finally {
      this.isLoading.set(false);
    }
  }

  private async loadCategory(id: string) {
    try {
      this.isLoading.set(true);
      const category = await this.categoryService.getCategoryById(id);
      if (category) {
        this.categoryForm.patchValue({
          name: category.name,
          slug: category.slug,
          description: category.description || '',
          parentId: category.parentId || '',
          level: category.level
        });
      }
    } catch (error) {
      this.toast.error('Failed to load category');
    } finally {
      this.isLoading.set(false);
    }
  }

  private buildCategoryTree(categories: Category[]): TreeSelectOption[] {
    const buildTree = (cats: Category[], level: number = 0): TreeSelectOption[] => {
      return cats
        .filter(cat => !cat.parentId) // Get top-level categories first
        .map(cat => {
          const children = cats
            .filter(c => c.parentId === cat.$id)
            .map(child => ({
              ...child,
              level: level + 1,
              disabled: child.$id === this.route.snapshot.params['id'],
              isExpanded: false,
              children: buildTree(cats.filter(c => c.parentId === child.$id), level + 1)
            }));

          return {
            $id: cat.$id,
            name: cat.name,
            level,
            disabled: cat.$id === this.route.snapshot.params['id'],
            isExpanded: false,
            children: children.length > 0 ? children : undefined
          };
        });
    };

    return buildTree(categories);
  }

  private findCategoryById(categories: TreeSelectOption[], id: string): TreeSelectOption | null {
    for (const category of categories) {
      if (category.$id === id) return category;
      if (category.children) {
        const found = this.findCategoryById(category.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  generateSlug() {
    const name = this.categoryForm.get('name')?.value;
    if (name) {
      const slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      this.categoryForm.patchValue({ slug });
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      setTimeout(() => {
        this.searchInput?.nativeElement?.focus();
      });
    }
  }


  selectCategory(category: TreeSelectOption | null) {
    this.categoryForm.patchValue({
      parentId: category?.$id || '',
      level: category ? category.level + 1 : 0
    });
    this.isDropdownOpen = false;
  }

  getSelectedCategoryName(): string {
    const findCategory = (categories: TreeSelectOption[], id: string): string | null => {
      for (const cat of categories) {
        if (cat.$id === id) return cat.name;
        if (cat.children) {
          const found = findCategory(cat.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const parentId = this.categoryForm.get('parentId')?.value;
    if (!parentId) return '';

    return findCategory(this.categoriesTree(), parentId) || '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.categoryForm.get(fieldName);
    return !!control && control.invalid && control.touched;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.categoryForm.get(fieldName);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('minlength')) {
      return 'Must be at least 2 characters';
    }
    return '';
  }


  async onSubmit() {
    if (this.categoryForm.invalid) {
      this.toast.error('Please check the form for errors');
      return;
    }

    try {
      this.isLoading.set(true);
      const formValues = this.categoryForm.getRawValue();

      const categoryData: CategoryCreateDTO = {
        name: formValues.name,
        description: formValues.description,
        parentId: formValues.parentId || undefined,
        level: formValues.level || 0,
        order: 0  // You can implement custom ordering logic here
      };

      if (this.isEditMode()) {
        await this.categoryService.updateCategory(
          this.route.snapshot.params['id'],
          categoryData
        );
        this.toast.success('Category updated successfully');
      } else {
        await this.categoryService.createCategory(categoryData);
        this.toast.success('Category created successfully');
      }

      this.router.navigate(['/admin/categories']);
    } catch (error) {
      this.toast.error(
        this.isEditMode()
          ? 'Failed to update category'
          : 'Failed to create category'
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  toggleExpand(category: TreeSelectOption, event: MouseEvent) {
    // Stop the event from bubbling up and triggering the parent click
    event.preventDefault();
    event.stopPropagation();

    category.isExpanded = !category.isExpanded;
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        // Implement selection of next item
        break;
      case 'ArrowUp':
        event.preventDefault();
        // Implement selection of previous item
        break;
      case 'Enter':
        // Implement selection of current item
        break;
      case 'Escape':
        this.isDropdownOpen = false;
        break;
    }
  }

}
