// src/app/core/services/product.service.ts
import { Injectable, Signal, inject, signal } from '@angular/core';
import { AppwriteService } from './appwrite.service';
import {BaseProduct, Product, ProductInput} from '../models/interfaces';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Storage, ID, Query } from 'appwrite';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private appwrite = inject(AppwriteService);
  private storage = new Storage(this.appwrite.client);

  private productsSignal = signal<BaseProduct[]>([]);

  // Expose the products signal as readonly
  readonly products: Signal<BaseProduct[]> = this.productsSignal.asReadonly();

  private transformToProduct(baseProduct: BaseProduct): Product {
    return {
      ...baseProduct,
      totalQuantitySold: 0, // You might want to fetch these from sales data
      totalRevenue: 0
    };
  }

  async getProducts(): Promise<BaseProduct[]> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products
      );
      const products = response.documents as unknown as BaseProduct[];
      this.productsSignal.set(products);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async refreshProducts(): Promise<void> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products
      );
      this.productsSignal.set(response.documents as unknown as BaseProduct[]);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async _fetchProducts(): Promise<BaseProduct[]> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products
      );
      return response.documents as unknown as BaseProduct[];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  getProductImageUrl(fileId: string): string {
    return this.storage.getFilePreview(
      environment.appwrite.buckets.productImages,
      fileId
    )
  }

  async uploadImage(file: File): Promise<string> {
    try {
      const response = await this.storage.createFile(
        environment.appwrite.buckets.productImages,
        ID.unique(),
        file
      );
      return response.$id;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  async createProduct(productData: ProductInput): Promise<Product> {
    try {
      const response = await this.appwrite.database.createDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        ID.unique(),
        productData
      );
      return response as unknown as Product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id: string, data: Partial<ProductInput>): Promise<Product> {
    try {
      const response = await this.appwrite.database.updateDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        id,
        data
      );
      return response as unknown as Product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }


  async deleteProduct(id: string): Promise<void> {
    try {
      await this.appwrite.database.deleteDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        id
      );
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async getLowStockProducts(threshold: number = 10): Promise<BaseProduct[]> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        [Query.lessThanEqual('stockQuantity', threshold)]
      );
      return response.documents as unknown as BaseProduct[];
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      throw error;
    }
  }

  async getTopProducts(limit: number = 5): Promise<Product[]> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        [Query.orderDesc('totalQuantitySold'), Query.limit(limit)]
      );
      const baseProducts = response.documents as unknown as BaseProduct[];
      return baseProducts.map(this.transformToProduct);
    } catch (error) {
      console.error('Error fetching top products:', error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<BaseProduct> {
    try {
      const response = await this.appwrite.database.getDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        id
      );
      return response as unknown as BaseProduct;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }


}
