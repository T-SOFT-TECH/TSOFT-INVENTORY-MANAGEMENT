import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '@core/services/category.service';
import { Category } from '@core/models/interfaces';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = signal(false);
  error = signal<string | null>(null);
  isEditMode = signal(false);
  
  parentCategories = toSignal(this.categoryService.getCategories(), {
    initialValue: [] as Category[]
  });

  categoryForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    parentId: [''],
    slug: ['', Validators.required],
    level: [0]
  });

  constructor() {
    const categoryId = this.route.snapshot.params['id'];
    if (categoryId) {
      this.isEditMode.set(true);
      this.loadCategory(categoryId);
    }
  }

  private async loadCategory(id: string) {
    try {
      this.isLoading.set(true);
      const category = await this.categoryService.getCategoryById(id);
      if (category) {
        this.categoryForm.patchValue(category);
      }
    } catch (err) {
      this.error.set('Failed to load category');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onSubmit() {
    if (this.categoryForm.invalid) return;

    try {
      this.isLoading.set(true);
      this.error.set(null);

      if (this.isEditMode()) {
        await this.categoryService.updateCategory(
          this.route.snapshot.params['id'],
          this.categoryForm.value
        );
      } else {
        await this.categoryService.createCategory(this.categoryForm.value);
      }

      this.router.navigate(['/admin/categories']);
    } catch (err) {
      this.error.set('Failed to save category');
    } finally {
      this.isLoading.set(false);
    }
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
} 