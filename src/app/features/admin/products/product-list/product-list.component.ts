import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { BrandService } from '../../../../core/services/brand.service';
import { Category } from '../../../../core/interfaces/category/category.interfaces';
import { Brand } from '../../../../core/interfaces/brand/brand.interfaces';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BaseProduct, Product } from '../../../../core/interfaces/product/product.interfaces';
import { AutoAnimationDirective } from '../../../../core/Directives/auto-Animate.directive';
import { HotToastService } from '@ngxpert/hot-toast';
import { LoadingService } from '../../../../core/services/loading.service';

interface PageItem {
  value: number | string;
  isPage: boolean;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, AutoAnimationDirective],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private loadingService = inject(LoadingService);
  private toast = inject(HotToastService);
  private categoryService = inject(CategoryService);
  private brandService = inject(BrandService);

  products = this.productService.products;
  categories = signal<Category[]>([]);
  brands = signal<Brand[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  isDeleting = signal(false);

  // Sorting
  sortField = signal<string>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Filters and View States
  searchQuery = signal('');
  selectedCategory = signal('all');
  selectedBrand = signal('all');
  isGridView = signal(true);

  // Pagination
  currentPage = signal(1);
  pageSize = 25; // Default items per page

  constructor() {
    this.loadData();

    // Add effect to reset to page 1 when filters change
    effect(() => {
      // This will trigger when any filter changes
      const _ = this.searchQuery();
      const __ = this.selectedCategory();
      const ___ = this.selectedBrand();
      // Reset to page 1
      this.currentPage.set(1);
    });
  }

  // ---------- COMPUTED PROPERTIES ----------

  // Total number of products (without filters)
  totalProducts = computed(() => this.products().length);

  // Filtered products (before pagination)
  filteredProducts = computed(() => {
    let filtered = this.products();

    // Apply search
    if (this.searchQuery()) {
      const search = this.searchQuery().toLowerCase();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search) ||
        p.sku?.toLowerCase().includes(search)
      );
    }

    // Apply category filter
    if (this.selectedCategory() !== 'all') {
      filtered = filtered.filter(p =>
        p.category?.$id === this.selectedCategory()
      );
    }

    // Apply brand filter
    if (this.selectedBrand() !== 'all') {
      filtered = filtered.filter(p =>
        p.brand?.$id === this.selectedBrand()
      );
    }

    // Apply sorting
    return this.applySorting(filtered);
  });

  // Apply sorting with improved handling
  private applySorting(products: BaseProduct[]): BaseProduct[] {
    const field = this.sortField();
    const direction = this.sortDirection() === 'asc' ? 1 : -1;

    return [...products].sort((a, b) => {
      switch(field) {
        case 'price':
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return (priceA - priceB) * direction;

        case 'stock':
          const stockA = a.stockQuantity || 0;
          const stockB = b.stockQuantity || 0;
          return (stockA - stockB) * direction;

        case 'sku':
          const skuA = a.sku || '';
          const skuB = b.sku || '';
          return skuA.localeCompare(skuB) * direction;

        case 'category':
          const catA = a.category?.name || '';
          const catB = b.category?.name || '';
          return catA.localeCompare(catB) * direction;

        case 'brand':
          const brandA = a.brand?.name || '';
          const brandB = b.brand?.name || '';
          return brandA.localeCompare(brandB) * direction;

        case 'name':
        default:
          const nameA = a.name || '';
          const nameB = b.name || '';
          return nameA.localeCompare(nameB) * direction;
      }
    });
  }

  // Paginated products (what's actually displayed)
  paginatedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return filtered.slice(start, end);
  });

  // Total number of pages
  totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.filteredProducts().length / this.pageSize));
  });

  // Array of page numbers to display in pagination
  pagesArray = computed(() => {
    const total = this.totalPages();
    const result: PageItem[] = [];

    // If 7 or fewer pages, show all
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        result.push({ value: i, isPage: true });
      }
      return result;
    }

    // Otherwise show a window around current page
    const current = this.currentPage();

    // Always add first page
    result.push({ value: 1, isPage: true });

    if (current <= 3) {
      // Near start: show first 5, ellipsis, last
      for (let i = 2; i <= 5; i++) {
        if (i <= total) {
          result.push({ value: i, isPage: true });
        }
      }
      if (total > 6) {
        result.push({ value: '...', isPage: false });
        result.push({ value: total, isPage: true });
      }
    }
    else if (current >= total - 2) {
      // Near end: show first, ellipsis, last 5
      result.push({ value: '...', isPage: false });
      for (let i = total - 4; i < total; i++) {
        if (i > 1) {
          result.push({ value: i, isPage: true });
        }
      }
    }
    else {
      // Middle: show first, ellipsis, window around current, ellipsis, last
      result.push({ value: '...', isPage: false });
      for (let i = current - 1; i <= current + 1; i++) {
        if (i > 1 && i < total) {
          result.push({ value: i, isPage: true });
        }
      }
      result.push({ value: '...', isPage: false });
      result.push({ value: total, isPage: true });
    }

    return result;
  });

  // First item number being displayed
  startItem = computed(() => {
    return Math.min(
      (this.currentPage() - 1) * this.pageSize + 1,
      this.filteredProducts().length
    );
  });

  // Last item number being displayed
  endItem = computed(() => {
    return Math.min(
      this.currentPage() * this.pageSize,
      this.filteredProducts().length
    );
  });

  // Various UI states
  hasActiveFilters = computed(() => {
    return this.searchQuery() !== '' ||
      this.selectedCategory() !== 'all' ||
      this.selectedBrand() !== 'all';
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
      this.products()
        .filter(product => product.category)
        .map(product => product.category.$id)
    );

    // Filter categories to only those that have products
    return this.categories().filter(category =>
      productCategories.has(category.$id)
    );
  });

  activeBrands = computed(() => {
    // Get all brands that have products
    const productBrands = new Set(
      this.products()
        .filter(product => product.brand)
        .map(product => product.brand?.$id)
    );

    // Filter brands to only those that have products
    return this.brands().filter(brand =>
      productBrands.has(brand.$id)
    );
  });

  // ---------- METHODS ----------

  // Toggle between grid and list view
  toggleView() {
    this.isGridView.update(v => !v);
  }

  // Pagination methods
  goToPage(page: string | number) {
    const pageNum = typeof page === 'string' ? parseInt(page, 10) : page;
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= this.totalPages()) {
      this.currentPage.set(pageNum);
      // Scroll to top of the product container
      const container = document.querySelector('.min-h-screen');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  // Filter methods
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

  resetBrand() {
    this.loadingService.start('Resetting brand filter...');
    this.selectedBrand.set('all');
    setTimeout(() => this.loadingService.clear(), 300);
  }

  resetAllFilters() {
    this.loadingService.start('Resetting all filters...');
    this.searchQuery.set('');
    this.selectedCategory.set('all');
    this.selectedBrand.set('all');
    setTimeout(() => this.loadingService.clear(), 300);
  }

  // Sorting
  sort(field: string) {
    if (this.sortField() === field) {
      this.sortDirection.update(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }

    // Log what's happening with sorting for debugging
    console.log(`Sorting by ${field} in ${this.sortDirection()} order`);
  }

  getSortIcon(field: string): string {
    if (this.sortField() !== field) return 'unfold_more';
    return this.sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  // Helper methods
  stripHtml(html: string): string {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  getStockClass(quantity: number, threshold: number): string {
    if (quantity === undefined || threshold === undefined) {
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
    return quantity > threshold
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  }

  // Data loading
  async loadData() {
    try {

      this.isLoading.set(true);

      const [products, categories, brands] = await Promise.all([
        this.productService.refreshProducts(),
        this.categoryService.getCategories(),
        this.brandService.getBrands()
      ]);

      this.categories.set(categories);
      this.brands.set(brands);

      console.log(`Loaded ${this.products().length} products`);
      console.log(`Loaded ${this.categories().length} categories`);
      console.log(`Loaded ${this.brands().length} brands`);
    } catch (error) {
      this.error.set('Failed to load products');
      this.toast.error('Failed to load products');
    } finally {
      this.isLoading.set(false);

    }
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

      // Reset to page 1 if we've deleted the last item on the current page
      if (this.paginatedProducts().length === 0 && this.currentPage() > 1) {
        this.currentPage.set(this.currentPage() - 1);
      }

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



  getProductThumbnail(fileId: string | undefined) {
    return this.productService.getOptimizedImage(fileId, 200, 60);
  }


  getCategoryName(categoryId: string): string {
    const category = this.categories().find(c => c.$id === categoryId);
    return category ? category.name : 'Unknown';
  }

// Get brand name from ID
  getBrandName(brandId: string): string {
    const brand = this.brands().find(b => b.$id === brandId);
    return brand ? brand.name : 'Unknown';
  }


  ngOnInit() {

  }

}
