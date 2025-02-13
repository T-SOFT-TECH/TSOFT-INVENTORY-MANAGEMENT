import {inject, Injectable, Signal, signal} from '@angular/core';
import {AppwriteService} from './appwrite.service';

import {environment} from '../../../environments/environment';
import {ID, Query, Storage} from 'appwrite';
import {BaseProduct, Product, ProductInput} from '../interfaces/product/product.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private appwrite = inject(AppwriteService);
  private storage = new Storage(this.appwrite.client);

  private productsSignal = signal<BaseProduct[]>([]);

  // Expose the products signal as readonly
  readonly products: Signal<BaseProduct[]> = this.productsSignal.asReadonly();


// Base Product Methods

  async createProduct(data: ProductInput): Promise<BaseProduct> {
    try {
      const execution = await this.appwrite.functions.createExecution(
        'create-product',
        JSON.stringify(data)
      );

      const result = JSON.parse(execution.responseBody);

      // Check if result has product and specs
      if (!result.product) {
        throw new Error(result.error || 'Failed to create product');
      }

      await this.refreshProducts();
      return result.product;
    } catch (error) {
      console.error('Create product error:', error);
      throw error;
    }
  }

  async updateProduct(id: string, data: Partial<ProductInput>): Promise<BaseProduct> {
    try {
      const response = await this.appwrite.database.updateDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        id,
        data
      );
      return response as unknown as BaseProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Specification Methods
  async createSpecs(collectionName: string, data: any): Promise<any> {
    try {
      return await this.appwrite.database.createDocument(
        environment.appwrite.databaseId,
        collectionName,
        ID.unique(),
        data
      );
    } catch (error) {
      console.error('Error creating specifications:', error);
      throw error;
    }
  }

  async updateSpecs(collectionName: string, specId: string, data: any): Promise<any> {
    try {
      return await this.appwrite.database.updateDocument(
        environment.appwrite.databaseId,
        collectionName,
        specId,
        data
      );
    } catch (error) {
      console.error('Error updating specifications:', error);
      throw error;
    }
  }

  async getSpecs(collectionName: string, specId: string): Promise<any> {
    try {
      return await this.appwrite.database.getDocument(
        environment.appwrite.databaseId,
        collectionName,
        specId
      );
    } catch (error) {
      console.error('Error fetching specifications:', error);
      throw error;
    }
  }

  // Image handling methods
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

  getProductImageUrl(fileId: string): string {
    return this.storage.getFileView(
      environment.appwrite.buckets.productImages,
      fileId
    );
  }

  // Method to get product with its specifications
  async getProductWithSpecs(productId: string): Promise<Product> {
    try {
      const product = await this.appwrite.database.getDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        productId
      ) as unknown as BaseProduct;

      if (product.category) {
        const specId = (product as any)[`${product.category}Specs`];
        if (specId) {
          const specs = await this.getSpecs(
            `product_${product.category}_specs`,
            specId
          );
          return {
            ...product,
            [`${product.category}Specs`]: specs
          } as Product;
        }
      }

      return product as Product;
    } catch (error) {
      console.error('Error fetching product with specs:', error);
      throw error;
    }
  }








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
      this.productsSignal.set(response.documents as unknown  as BaseProduct[]);
    } catch (error) {
      console.error('Error fetching products:', error);
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

// In product.service.ts

  async getProductById(id: string): Promise<BaseProduct> {
    try {
      const response = await this.appwrite.database.getDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        id
      );

      // Transform the response to include specifications
      const product = response as unknown as BaseProduct;
      if (product.specifications) {
        product.specifications = JSON.parse(product.specifications as unknown as string);
      }

      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }


}
