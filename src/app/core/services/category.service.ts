// category.service.ts
import {Injectable, inject, signal} from '@angular/core';
import { AppwriteService } from './appwrite.service';
import {Category, CategoryCreateDTO} from '../models/interfaces';
import { environment } from '../../../environments/environment';
import {ID, Query} from 'appwrite';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private appwrite = inject(AppwriteService);
  private categories = signal<Category[]>([]);

  // Convert category name to a slug that can be used as ID
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async createCategory(data: CategoryCreateDTO): Promise<Category> {
    try {
      // Generate ID/slug from name
      const categoryId = this.generateSlug(data.name);

      // Check if category exists
      try {
        await this.appwrite.database.getDocument(
          environment.appwrite.databaseId,
          environment.appwrite.collections.categories,
          categoryId
        );
        throw new Error('Category with this name already exists');
      } catch (error: any) {
        // If document doesn't exist, proceed with creation
        if (error.code === 404) {
          const response = await this.appwrite.database.createDocument(
            environment.appwrite.databaseId,
            environment.appwrite.collections.categories,
            categoryId,
            {
              ...data,
              slug: categoryId,
              order: data.order || 0 // Provide default order if not specified
            }
          );
          await this.getCategories(); // Refresh categories list
          return response as unknown as Category;
        }
        throw error;
      }
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }




  async getCategories(): Promise<Category[]> {
    try {
      let allCategories: Category[] = [];
      let offset = 0;
      const limit = 100;

      while (true) {
        console.log(`Fetching categories: offset ${offset}, limit ${limit}`);

        const response = await this.appwrite.database.listDocuments(
          environment.appwrite.databaseId,
          environment.appwrite.collections.categories,
          [
            Query.limit(limit),
            Query.offset(offset)
          ]
        );

        const categories = response.documents as unknown as Category[];
        console.log(`Fetched ${categories.length} categories`);

        allCategories = [...allCategories, ...categories];

        if (categories.length < limit) {
          break;
        }

        offset += limit;
      }

      console.log(`Total categories fetched: ${allCategories.length}`);
      this.categories.set(allCategories);
      return allCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    try {
      const response = await this.appwrite.database.getDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.categories,
        id
      );
      return response as unknown as Category;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }


  async updateCategory(id: string, data: Partial<CategoryCreateDTO>): Promise<Category> {
    try {
      // If name is being updated, check if new name would conflict
      if (data.name) {
        const newSlug = this.generateSlug(data.name);
        if (newSlug !== id) {
          try {
            await this.appwrite.database.getDocument(
              environment.appwrite.databaseId,
              environment.appwrite.collections.categories,
              newSlug
            );
            throw new Error('Category with this name already exists');
          } catch (error: any) {
            if (error.code !== 404) throw error;
          }
        }
      }

      const response = await this.appwrite.database.updateDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.categories,
        id,
        data
      );
      await this.getCategories(); // Refresh categories list
      return response as unknown as Category;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<void> {
    try {
      await this.appwrite.database.deleteDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.categories,
        id
      );
      await this.getCategories(); // Refresh categories list
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
}
