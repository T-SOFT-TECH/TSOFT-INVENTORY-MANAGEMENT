// src/app/core/services/product-form-config.service.ts
import { Injectable } from '@angular/core';
import {
  CategoryFormConfig,
  FormFieldConfig,
  productFormConfigs,
  getFormConfigById,
  getAllConfigs,
  updateBrandOptionsForAllConfigs
} from '../configs/product-forms';

// Re-export types for consumers
export type { CategoryFormConfig, FormFieldConfig } from '../configs/product-forms';

@Injectable({
  providedIn: 'root'
})
export class ProductFormConfigService {
  private formConfigs = productFormConfigs;

  getFormConfig(categoryId: string): CategoryFormConfig | undefined {
    return getFormConfigById(categoryId);
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
