import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import {Category} from '../../../../core/interfaces/category/category.interfaces';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {BaseProduct, Product} from '../../../../core/interfaces/product/product.interfaces';
import {AutoAnimationDirective} from '../../../../core/Directives/auto-Animate.directive';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, AutoAnimationDirective],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private sanitizer = inject(DomSanitizer);

  products = this.productService.products;
  categories = signal<Category[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);


  sortField = signal<string>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');


  // Filters and View States
  searchQuery = signal('');
  selectedCategory = signal('all');
  sortBy = signal<'name' | 'price' | 'stock' | 'category'>('name');
  isGridView = signal(true);

  filteredProducts = computed(() => {
    let filtered = this.products();

    // Apply search
    if (this.searchQuery()) {
      const search = this.searchQuery().toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    // Apply category filter
    if (this.selectedCategory() !== 'all') {
      filtered = filtered.filter(p =>
        p.category.$id === this.selectedCategory()
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      const dir = this.sortDirection() === 'asc' ? 1 : -1;
      switch(this.sortField()) {
        case 'price': return (a.price - b.price) * dir;
        case 'cost': return (a.cost - b.cost) * dir;
        case 'stock': return (a.stockQuantity - b.stockQuantity) * dir;
        case 'profit':
          const profitA = ((a.price - a.cost) / a.price) * 100;
          const profitB = ((b.price - b.cost) / b.price) * 100;
          return (profitA - profitB) * dir;
        // ... other sort cases
        default: return a.name.localeCompare(b.name) * dir;
      }
    });
  });



  constructor() {
    this.loadData();
  }


  sort(field: string) {
    if (this.sortField() === field) {
      this.sortDirection.update(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }

  getSortIcon(field: string): string {
    if (this.sortField() !== field) return 'unfold_more';
    return this.sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  getTotalValue(): number {
    return this.filteredProducts().reduce((sum, p) => sum + p.price * p.stockQuantity, 0);
  }


  toggleView() {
    this.isGridView.update(v => !v);
  }

  stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  getStockClass(quantity: number): string {
    return quantity > 10
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
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

  getSafeDescription(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }






}
