import { Injectable, inject } from '@angular/core';
import { AppwriteService } from './appwrite.service';

import { Category } from '../models/interfaces';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private appwrite = inject(AppwriteService);

  getCategories(): Observable<Category[]> {
    return from(this._fetchCategories());
  }

  private async _fetchCategories(): Promise<Category[]> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.categories
      );

      return response.documents as unknown as Category[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
} 