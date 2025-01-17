import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { BaseProduct, Category, Product } from '../../../../core/models/interfaces';
import { from } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products = this.productService.products;
  categories = signal<Category[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  selectedCategory = signal<string>('all');
  searchQuery = signal<string>('');

  constructor() {
    this.loadData();
  }

  async loadData() {
    try {
      this.isLoading.set(true);
      await this.productService.refreshProducts();
    } catch (error) {
      this.error.set('Failed to load products');
    } finally {
      this.isLoading.set(false);
    }
  }

  async filterByCategory(categoryId: string) {
    try {
      this.isLoading.set(true);
      this.selectedCategory.set(categoryId);
      await this.productService.getProducts();
    } catch (err) {
      this.error.set('Failed to filter products');
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteProduct(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await this.productService.deleteProduct(id);
    } catch (err) {
      this.error.set('Failed to delete product');
    }
  }

  getImageUrl(fileId: string | undefined): string {
    if (!fileId) return 'assets/placeholder.png';
    return this.productService.getProductImageUrl(fileId);
  }
} 