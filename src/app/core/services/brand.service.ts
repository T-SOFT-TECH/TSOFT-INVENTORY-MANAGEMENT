// src/app/core/services/brand.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { AppwriteService } from './appwrite.service';
import { environment } from '../../../environments/environment';
import { ID, Query, Storage } from 'appwrite';
import {Brand, BrandInput} from '../interfaces/brand/brand.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private appwrite = inject(AppwriteService);
  private storage = new Storage(this.appwrite.client);
  private brands = signal<Brand[]>([]);

  // Expose brands as readonly
  readonly brands$ = this.brands.asReadonly();

  async getBrands(): Promise<Brand[]> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.brands,
        [
          Query.limit(100) // Increase limit to get more records
        ]
      );
      const brands = response.documents as unknown as Brand[];
      this.brands.set(brands);
      return brands;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  }

  async getBrand(id: string): Promise<Brand> {
    try {
      const response = await this.appwrite.database.getDocument(
        environment.appwrite.databaseId,
        'brands',
        id
      );
      return response as unknown as Brand;
    } catch (error) {
      console.error('Error fetching brand:', error);
      throw error;
    }
  }

  async createBrand(data: BrandInput): Promise<Brand> {
    try {
      const response = await this.appwrite.database.createDocument(
        environment.appwrite.databaseId,
        'brands',
        ID.unique(),
        data
      );
      await this.getBrands(); // Refresh brands list
      return response as unknown as Brand;
    } catch (error) {
      console.error('Error creating brand:', error);
      throw error;
    }
  }

  async updateBrand(id: string, data: Partial<BrandInput>): Promise<Brand> {
    try {
      const response = await this.appwrite.database.updateDocument(
        environment.appwrite.databaseId,
        'brands',
        id,
        data
      );
      await this.getBrands(); // Refresh brands list
      return response as unknown as Brand;
    } catch (error) {
      console.error('Error updating brand:', error);
      throw error;
    }
  }

  async deleteBrand(id: string): Promise<void> {
    try {
      await this.appwrite.database.deleteDocument(
        environment.appwrite.databaseId,
        'brands',
        id
      );
      await this.getBrands(); // Refresh brands list
    } catch (error) {
      console.error('Error deleting brand:', error);
      throw error;
    }
  }

  async uploadLogo(file: File): Promise<string> {
    try {
      const response = await this.storage.createFile(
        environment.appwrite.buckets.brandLogos, // Add this to environment.ts buckets
        ID.unique(),
        file
      );
      return response.$id;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  }

  getLogoUrl(fileId: string): string {
    const result = this.storage.getFileView(
      environment.appwrite.buckets.brandLogos,
      fileId,
    );
    return result;
  }

  // Add this method to update the brand document with the product ID
  async addProductToBrand(brandId: string, productId: string): Promise<void> {
    try {
      // Fetch the existing brand document
      const brand = await this.getBrand(brandId);

      // Update the products array (assuming it's a relationship field)
      const updatedProducts = brand.products ? [...brand.products, productId] : [productId];

      // Update the brand document
      await this.updateBrand(brandId, {
        products: updatedProducts,
      });

      console.log('Product added to brand:', brandId);
    } catch (error) {
      console.error('Error adding product to brand:', error);
      throw error;
    }
  }
}
