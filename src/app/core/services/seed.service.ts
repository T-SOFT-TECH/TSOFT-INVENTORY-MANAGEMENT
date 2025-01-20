// services/seed.service.ts
import { Injectable, inject } from '@angular/core';
import { CategoryService } from './category.service';
import { HotToastService } from '@ngxpert/hot-toast';
import {initialCategories} from '../data/initial-categories';


@Injectable({
  providedIn: 'root'
})
export class SeedService {
  private categoryService = inject(CategoryService);
  private toast = inject(HotToastService);

  async seedCategories() {
    try {
      const existingCategories = await this.categoryService.getCategories();
      await this.createCategoriesRecursively(initialCategories, existingCategories);
      this.toast.success('Categories seeded successfully');
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
      const exists = existingCategories.some(
        c => c.name.toLowerCase() === category.name.toLowerCase()
      );

      if (!exists) {
        const newCategory = await this.categoryService.createCategory({
          name: category.name,
          description: category.description,
          level: category.level,
          order: category.order || 0, // Provide default order if not specified
          parentId
        });

        if (category.children?.length > 0) {
          await this.createCategoriesRecursively(
            category.children,
            existingCategories,
            newCategory.$id
          );
        }
      }
    }
  }
}
