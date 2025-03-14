import {inject, Injectable, Signal, signal} from '@angular/core';
import {AppwriteService} from './appwrite.service';

import {environment} from '../../../environments/environment';
import {ID, ImageFormat, ImageGravity, Query, Storage} from 'appwrite';
import {BaseProduct, Product} from '../interfaces/product/product.interfaces';


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

  async createProduct(data: {
    name: any;
    description: any;
    category: string;
    sku: any;
    price: number;
    lowStockThreshold: number;
    status: string;
    brand: any;
    specifications: Record<string, any>
  }): Promise<BaseProduct> {
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

  async updateProduct(id: string, data: {
    name: any;
    description: any;
    category: string;
    sku: any;
    price: number;
    lowStockThreshold: number;
    status: string;
    brand: any;
    specifications: Record<string, any>
  }): Promise<BaseProduct> {
    try {
      const execution = await this.appwrite.functions.createExecution(
        'create-product', // Same function handles both operations
        JSON.stringify({
          productId: id, // Include this for updates
          ...data
        })
      );

      const result = JSON.parse(execution.responseBody);
      if (!result.product) {
        throw new Error(result.error || 'Failed to update product');
      }

      await this.refreshProducts();
      return result.product;
    } catch (error) {
      console.error('Update product error:', error);
      throw error;
    }
  }


  async deleteProduct(id: string): Promise<void> {
    try {
      // Call the delete-product cloud function
      const execution = await this.appwrite.functions.createExecution(
        'delete-product',
        JSON.stringify({ productId: id })
      );

      const result = JSON.parse(execution.responseBody);
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete product');
      }

      // Refresh the products list after successful deletion
      await this.refreshProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }


  async getProductDetails(id: string): Promise<Product> {
    try {
      const execution = await this.appwrite.functions.createExecution(
        'get-product-details',
        JSON.stringify({ productId: id })
      );

      const result = JSON.parse(execution.responseBody);

      if (result.error) {
        throw new Error(result.error);
      }

      return result.product;
    } catch (error) {
      console.error('Error fetching product details:', error);
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



  // Method to get product with its specifications


  // In product.service.ts

// Update the getProducts and refreshProducts methods
  async getProducts(): Promise<BaseProduct[]> {
    try {
      // Fetch up to 100 products (Appwrite default limit is 25)
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        [Query.limit(100)] // Increase limit to 100
      );
      const products = response.documents as unknown as BaseProduct[];
      this.productsSignal.set(products);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async refreshProducts(): Promise<BaseProduct[]> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        [Query.limit(100)] // Increase limit to 100
      );
      const products = response.documents as unknown as BaseProduct[];
      this.productsSignal.set(products);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
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





// Basic image URL method (keep this as it's working)
  getProductImageUrl(fileId: string): string {
    if (!fileId) return 'assets/placeholder.png';
    return this.storage.getFileView(
      environment.appwrite.buckets.productImages,
      fileId
    );
  }

// Simple thumbnail that only resizes
  getOptimizedImage(fileId: string | undefined, size: number, compression: number): string {
    if (!fileId) return 'assets/placeholder.png';

    try {
      // Only use the essential parameters
      const url = this.storage.getFilePreview(
        environment.appwrite.buckets.productImages,
        fileId,
        size,    // width
        size,     // height
        ImageGravity.Center,  // Gravity, Centered
        compression, // Compression. Image Quality
        0, // Border Width, Images gets broken if border width is 1 and above
        '000000', // Border Color
        0, //border Radius
        1, //opacity
        0, //rotate
        'FFFFFF', // Background Color
        ImageFormat.Jpg


      );

      return url;
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      // Fallback to regular image
     return 'Error generating thumbnail:';
    }
  }


}
