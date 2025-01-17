import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '@core/services/category.service';
import { Category } from '@core/models/interfaces';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent {
  private categoryService = inject(CategoryService);
  
  categories = toSignal(this.categoryService.getCategories(), {
    initialValue: [] as Category[]
  });
  
  isLoading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadCategories();
  }

  async loadCategories() {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      await this.categoryService.fetchCategories();
    } catch (err) {
      this.error.set('Failed to load categories');
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteCategory(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await this.categoryService.deleteCategory(id);
    } catch (err) {
      this.error.set('Failed to delete category');
    }
  }
} 