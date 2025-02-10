
import { inject, Injectable } from '@angular/core';
import {
  CategoryFormConfig,
  FormFieldConfig,
  productFormConfigs,
  getFormConfigById,
  getAllConfigs,
  updateBrandOptionsForAllConfigs
} from '../configs/product-forms';
import { Category } from '../interfaces/category/category.interfaces';
import { CategoryService } from './category.service';

// Re-export types for consumers
export type { CategoryFormConfig, FormFieldConfig } from '../configs/product-forms';

@Injectable({
  providedIn: 'root'
})
export class ProductFormConfigService {
  private formConfigs = productFormConfigs;

  private categoryService = inject(CategoryService);
  private categories: Category[] = [];

  getFormConfig(categoryId: string): CategoryFormConfig | undefined {
    let config = productFormConfigs.get(categoryId);

    if (!config) {
      const parentCategory = this.getCategoryParent(categoryId);
      if (parentCategory) {
        config = productFormConfigs.get(parentCategory.$id);
      }
    }

    return config;
  }


  private async loadCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  private getCategoryParent(categoryId: string): Category | null {
    const category = this.categories.find((c: Category) => c.$id === categoryId);
    if (category?.parentId) {
      return this.categories.find((c: Category) => c.$id === category.parentId) || null;
    }
    return null;
  }


  getAllConfigs(): Map<string, CategoryFormConfig> {
    return this.formConfigs;
  }

  getConfigsAsArray(): CategoryFormConfig[] {
    return getAllConfigs();
  }

  updateBrandOptions(brands: string[]) {
    updateBrandOptionsForAllConfigs(brands);
  }

  getCategoryFormFields(categoryId: string): FormFieldConfig[] | undefined {
    const config = this.getFormConfig(categoryId);
    return config?.fields;
  }

  getFieldGroups(categoryId: string): { [key: string]: FormFieldConfig[] } {
    const fields = this.getCategoryFormFields(categoryId);
    if (!fields) return {};

    return fields.reduce<{ [key: string]: FormFieldConfig[] }>((groups, field) => {
      const group = field.group || 'other';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(field);
      return groups;
    }, {});
  }
}
