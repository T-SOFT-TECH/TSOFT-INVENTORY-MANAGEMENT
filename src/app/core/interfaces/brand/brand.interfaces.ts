
import { BaseDocument } from '../base/base.interfaces';
import { Product } from '../product/product.interfaces';

export interface Brand extends BaseDocument {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  status: 'active' | 'inactive';
  websiteUrl?: string;
  productCount?: number;
  products?: string[];
}

export interface BrandInput  {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  status: 'active' | 'inactive';
  websiteUrl?: string;
  products?: string[]


}

