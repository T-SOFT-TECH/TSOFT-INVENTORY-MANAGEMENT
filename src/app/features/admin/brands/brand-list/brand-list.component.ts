
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BrandService } from '../../../../core/services/brand.service';
import { HotToastService } from '@ngxpert/hot-toast';
import {FormsModule, NgModel} from '@angular/forms';
import {AutoAnimationDirective} from '../../../../core/Directives/auto-Animate.directive';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, AutoAnimationDirective,],
  templateUrl: './brand-list.component.html'
})
export class BrandListComponent implements OnInit {
  readonly Math = Math;


  private brandService = inject(BrandService);
  private toast = inject(HotToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = signal(false);
  brands = this.brandService.brands$;
  searchQuery = signal('');
  statusFilter = signal<'all' | 'active' | 'inactive'>('all');
  currentPage = signal(0);
  pageSize = 9;

  // Computed signals
  filteredBrands = computed(() => {
    let filtered = this.brands();
    const search = this.searchQuery().toLowerCase();
    const status = this.statusFilter();

    if (search) {
      filtered = filtered.filter(brand =>
        brand.name.toLowerCase().includes(search) ||
        brand.description?.toLowerCase().includes(search)
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(brand => brand.status === status);
    }

    return filtered;
  });


  paginatedBrands = computed(() => {
    const filtered = this.filteredBrands();
    const start = this.currentPage() * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  });

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.filteredBrands().length / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  setPage(page: number) {
    if (page >= 0 && page < Math.ceil(this.filteredBrands().length / this.pageSize)) {
      this.currentPage.set(page);
      // Update URL without reloading the page
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page },
        queryParamsHandling: 'merge', // Keep other query params
      });
    }
  }

  totalPages = computed(() =>
    Math.ceil(this.filteredBrands().length / this.pageSize)
  );

  totalBrands = computed(() => this.brands().length);





  ngOnInit() {
     // Read initial page from URL query params
     this.route.queryParams.subscribe(params => {
      const page = Number(params['page']) || 0;
      this.currentPage.set(page);
    });
    this.loadBrands();
  }

  async loadBrands() {
    try {
      this.isLoading.set(true);
      await this.brandService.getBrands();
    } catch (error) {
      this.toast.error('Failed to load brands');
    } finally {
      this.isLoading.set(false);
    }
  }


  async deleteBrand(id: string) {
    if (!confirm('Are you sure you want to delete this brand?')) return;

    try {
      await this.brandService.deleteBrand(id);
      this.toast.success('Brand deleted successfully');
    } catch (error) {
      this.toast.error('Failed to delete brand');
    }
  }

  getLogoUrl(fileId: string | undefined): string {
    if (!fileId) return 'assets/images/placeholder.png';
    return this.brandService.getLogoUrl(fileId);
}


getActiveBrandsCount(): number {
  return this.brands().filter(brand => brand.status === 'active').length;
}

getTotalProducts(): number {
  return this.brands().reduce((sum, brand) => sum + (brand.products?.length || 0), 0);
}

getBadgeClass(status: string): string {
  return status === 'active'
    ? 'px-2 py-1 text-xs rounded-full bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400'
    : 'px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
}



getPageButtonClass(page: number): string {
  return page === this.currentPage()
    ? 'bg-primary-500 text-white'
    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';
}

onSearch(query: string) {
  this.searchQuery.set(query);
  this.setPage(0);
}

onFilterChange() {
  this.setPage(0);
}



}
