
import { Product } from '../product/product.interfaces';

export interface CartItem {
  product: Product;
  quantity: number;
}