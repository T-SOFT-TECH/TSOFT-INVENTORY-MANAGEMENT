// src/app/features/admin/brands/brand-list/brand-list.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BrandService } from '../../../../core/services/brand.service';
import { Brand } from '../../../../core/models/interfaces';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brand-list.component.html'
})
export class BrandListComponent implements OnInit {
  private brandService = inject(BrandService);
  private toast = inject(HotToastService);

  isLoading = signal(false);
  brands = this.brandService.brands$;

  ngOnInit() {
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
}