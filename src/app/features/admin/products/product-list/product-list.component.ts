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
import {HotToastService} from '@ngxpert/hot-toast';
import {LoadingService} from '../../../../core/services/loading.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, AutoAnimationDirective],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private loadingService = inject(LoadingService);
  private sanitizer = inject(DomSanitizer);
  private toast = inject(HotToastService);
  private categoryService = inject(CategoryService);

  products = this.productService.products;
  categories = signal<Category[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  isDeleting = signal(false);



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
        case 'stock': return (a.stockQuantity - b.stockQuantity) * dir;
      default: return a.name.localeCompare(b.name) * dir;
      }
    });
  });



  constructor() {
    this.loadData();
  }

  // Add these helper computed values to your component
  hasActiveFilters = computed(() => {
    return this.searchQuery() !== '' || this.selectedCategory() !== 'all';
  });

  isEmpty = computed(() => {
    return this.products().length === 0;
  });

  hasNoResults = computed(() => {
    return this.filteredProducts().length === 0 && !this.isEmpty();
  });

  activeCategories = computed(() => {
    // Get all product categories
    const productCategories = new Set(
      this.products().map(product => product.category.$id)
    );

    // Filter categories to only those that have products
    return this.categories().filter(category =>
      productCategories.has(category.$id)
    );
  });

// Add these methods for filter clearing
  clearSearch() {
    this.loadingService.start('Clearing search...');
    this.searchQuery.set('');
    setTimeout(() => this.loadingService.clear(), 300);
  }

  resetCategory() {
    this.loadingService.start('Resetting category filter...');
    this.selectedCategory.set('all');
    setTimeout(() => this.loadingService.clear(), 300);
  }

  resetAllFilters() {
    this.loadingService.start('Resetting all filters...');
    this.searchQuery.set('');
    this.selectedCategory.set('all');
    setTimeout(() => this.loadingService.clear(), 300);
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




  stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  getStockClass(quantity: number, threshold: number): string {
    return quantity > threshold
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  }


  async loadData() {
    try {
      this.loadingService.start('Loading products and categories...');
      const [products, categories] = await Promise.all([
        this.productService.refreshProducts(),
        this.categoryService.getCategories()
      ]);
      this.categories.set(categories);
    } catch (error) {
      this.error.set('Failed to load products');
      this.toast.error('Failed to load products');
    } finally {
      this.loadingService.clear();
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

  // product-list.component.ts



  getImageUrl(fileId: string | undefined): string {
    if (!fileId) return 'assets/placeholder.png';
    return this.productService.getProductImageUrl(fileId);
  }

  getSafeDescription(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


  async deleteProduct(id: string, productName: string) {

    try {
      // Show a more informative confirmation dialog
      const confirmMessage = `Are you sure you want to delete "${productName}"?\n\n` +
        `This will also delete:\n` +
        `- Product specifications\n` +
        `- Product images\n\n` +
        `This action cannot be undone.`;

      if (!confirm(confirmMessage)) return;

      // Start the loading indicator with a specific message
      this.loadingService.start(`Deleting ${productName}...`);

      // Set local deletion state for UI feedback
      this.isDeleting.set(true);

      // Apply visual feedback to the specific product card
      const productElement = document.getElementById(`product-${id}`);
      if (productElement) {
        productElement.classList.add('opacity-50', 'pointer-events-none');
      }

      // Perform the deletion
      await this.productService.deleteProduct(id);

      // Show success message
      this.toast.success('Product deleted successfully');

      // Start a new loading state for refreshing the product list
      this.loadingService.start('Refreshing product list...');
      await this.loadData();

    } catch (error) {
      // Handle errors with specific messages
      const errorMessage = error instanceof Error ?
        error.message : 'Failed to delete product';
      this.toast.error(errorMessage);

      // Log the full error for debugging
      console.error('Product deletion error:', error);

    } finally {
      // Clean up all states
      this.isDeleting.set(false);
      this.loadingService.clear(); // Clear any remaining loading states

      // Reset the product element's visual state
      const productElement = document.getElementById(`product-${id}`);
      if (productElement) {
        productElement.classList.remove('opacity-50', 'pointer-events-none');
      }
    }
  }

formatCurrency(amount: number | undefined): string {
    if (amount === undefined || amount === null) {
      return '₦0.00';
    }
   return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
     currencyDisplay: 'narrowSymbol',
   }).format(amount);
}

}
