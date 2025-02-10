
import { BaseDocument } from '../base/base.interfaces';

export interface Category extends BaseDocument {
  name: string;
  slug: string;
  parentId?: string;
  description?: string;
  children?: Category[];
  level: number;
  order: number;
}

export interface CategoryCreateDTO {
  name: string;
  description?: string;
  parentId?: string;
  level: number;
  order?: number;
  slug?: string;
}

export type CategoryUpdateDTO = Partial<CategoryCreateDTO>;