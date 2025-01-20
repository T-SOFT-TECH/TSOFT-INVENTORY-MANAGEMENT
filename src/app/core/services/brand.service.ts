// src/app/core/services/brand.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { AppwriteService } from './appwrite.service';
import { Brand, BrandInput } from '../models/interfaces';
import { environment } from '../../../environments/environment';
import { ID, Query, Storage } from 'appwrite';

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
        'brands' // Add this to environment.ts collections
      );
      const brands = response.documents as unknown as Brand[];
      
      // Calculate product count for each brand
      const brandsWithCount = await Promise.all(
        brands.map(async (brand) => {
          const products = await this.appwrite.database.listDocuments(
            environment.appwrite.databaseId,
            environment.appwrite.collections.products,
            [Query.equal('brandId', brand.$id)]
          );
          return {
            ...brand,
            productCount: products.total
          };
        })
      );

      this.brands.set(brandsWithCount);
      return brandsWithCount;
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
    return this.storage.getFilePreview(
      environment.appwrite.buckets.brandLogos,
      fileId
    );
  }
}