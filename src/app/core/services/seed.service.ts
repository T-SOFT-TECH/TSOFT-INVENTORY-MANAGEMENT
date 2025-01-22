// services/seed.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { CategoryService } from './category.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { initialCategories } from '../data/initial-categories';

interface SeedProgress {
  total: number;
  processed: number;
  added: number;
  skipped: number;
  current: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  private categoryService = inject(CategoryService);
  private toast = inject(HotToastService);

  // Progress tracking
  seedProgress = signal<SeedProgress>({
    total: 0,
    processed: 0,
    added: 0,
    skipped: 0,
    current: ''
  });

  private countTotalCategories(categories: any[]): number {
    return categories.reduce((count, category) => {
      return count + 1 + (category.children ? this.countTotalCategories(category.children) : 0);
    }, 0);
  }

  async seedCategories() {
    try {
      const existingCategories = await this.categoryService.getCategories();

      // Initialize progress
      const totalCategories = this.countTotalCategories(initialCategories);
      this.seedProgress.set({
        total: totalCategories,
        processed: 0,
        added: 0,
        skipped: 0,
        current: 'Starting...'
      });

      await this.createCategoriesRecursively(initialCategories, existingCategories);

      const progress = this.seedProgress();
      this.toast.success(
        `Categories seeded successfully: ${progress.added} added, ${progress.skipped} skipped`
      );
    } catch (error) {
      console.error('Error seeding categories:', error);
      this.toast.error('Failed to seed categories');
    }
  }

  private async createCategoriesRecursively(
    categories: any[],
    existingCategories: any[],
    parentId?: string
  ) {
    for (const category of categories) {
      try {
        // Update current category in progress
        this.seedProgress.update(p => ({
          ...p,
          current: category.name
        }));

        const exists = existingCategories.some(
          c => c.name.toLowerCase() === category.name.toLowerCase()
        );

        if (!exists) {
          const newCategory = await this.categoryService.createCategory({
            name: category.name,
            description: category.description,
            level: category.level,
            order: category.order || 0,
            parentId
          });

          // Update progress for added category
          this.seedProgress.update(p => ({
            ...p,
            processed: p.processed + 1,
            added: p.added + 1
          }));

          if (category.children?.length > 0) {
            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
            await this.createCategoriesRecursively(
              category.children,
              existingCategories,
              newCategory.$id
            );
          }
        } else {
          // Update progress for skipped category
          this.seedProgress.update(p => ({
            ...p,
            processed: p.processed + 1,
            skipped: p.skipped + 1
          }));

          // Find the existing category to get its ID for children
          const existingCategory = existingCategories.find(
            c => c.name.toLowerCase() === category.name.toLowerCase()
          );

          if (category.children?.length > 0 && existingCategory) {
            await this.createCategoriesRecursively(
              category.children,
              existingCategories,
              existingCategory.$id
            );
          }
        }
      } catch (error) {
        console.error(`Error processing category ${category.name}:`, error);
        // Continue with next category instead of stopping
        this.toast.error(`Failed to process category: ${category.name}`);
      }
    }
  }

  // Helper method to get progress percentage
  getProgressPercentage(): number {
    const progress = this.seedProgress();
    return progress.total ? Math.round((progress.processed / progress.total) * 100) : 0;
  }
}
