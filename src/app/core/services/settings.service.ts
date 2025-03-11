import {Injectable, inject, signal} from '@angular/core';
import { AppwriteService } from './appwrite.service';

import { Storage } from 'appwrite';
import { environment } from '../../../environments/environment';
import { ID } from 'appwrite';
import {Settings} from '../interfaces/settings/settings.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private appwrite = inject(AppwriteService);
  private storage = new Storage(this.appwrite.client);

  settings = signal<Settings | null>(null);

  constructor() {
    this.getSettings();
  }


  async getSettings(): Promise<Settings> {
    try {
      const response = await this.appwrite.database.getDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.settings,
        'default'
      );

      // Transform flat response to hierarchical Settings object
      const settings: Settings = {
        $id: response.$id,
        $createdAt: response.$createdAt,
        $updatedAt: response.$updatedAt,

        company: {
          companyName: response['companyName'] || '',
          address: response['address'] || '',
          phone: response['phone'] || '',
          email: response['email'] || '',
          website: response['website'] || '',
          taxId: response['taxId'] || '',
          logo: response['logoUrl'] || ''
        },

        invoice: {
          $id: response.$id,
          $createdAt: response.$createdAt,
          $updatedAt: response.$updatedAt,
          invoicePrefix: response['invoicePrefix'] || 'INV-',
          nextInvoiceNumber: response['nextInvoiceNumber'] || 1000,
          termsAndConditions: response['termsAndConditions'] || '',
          notes: response['notes'] || '',
          taxRate: response['taxRate'] || 10,
          currency: response['currency'] || 'USD',
          dateFormat: response['dateFormat'] || 'MM/DD/YYYY'
        },

        notifications: {
          lowStockThreshold: response['lowStockThreshold'] || 10,
          emailNotifications: response['emailNotifications'] || false,
          salesAlerts: response['orderConfirmations'] || false,
          inventoryAlerts: response['lowStockAlerts'] || false
        },

        system: {
          dateFormat: response['dateFormat'] || 'MM/DD/YYYY',
          timezone: response['timezone'] || 'UTC',
          language: response['language'] || 'en',
          theme: response['theme'] || 'light'
        }
      };

      this.settings.set(settings);
      return settings;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  }

  async updateSettings(section: string, data: Partial<Settings[keyof Settings]>): Promise<Settings> {
    try {
      // Create a flattened object with the appropriate field names
      const flattenedData: Record<string, any> = {};

      // For each property in the data object, create a top-level field
      // using the section name as a prefix if needed
      Object.entries(data).forEach(([key, value]) => {
        // For simple fields like theme, currency, we don't need to prefix
        if (this.isTopLevelField(key)) {
          flattenedData[key] = value;
        } else {
          // For nested fields, we use the field name directly
          flattenedData[key] = value;
        }
      });

      const response = await this.appwrite.database.updateDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.settings,
        'default',
        flattenedData
      );

      // After update, refetch the full settings to keep the local state in sync
      await this.getSettings();

      return response as unknown as Settings;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

// Helper method to check if a field is a top-level field
  private isTopLevelField(fieldName: string): boolean {
    const topLevelFields = [
      'theme', 'currency', 'dateFormat', 'timezone', 'storeName',
      'companyName', 'address', 'phone', 'email', 'website',
      'taxId', 'invoicePrefix', 'nextInvoiceNumber', 'taxRate',
      'showLogo', 'logoUrl', 'emailNotifications', 'lowStockAlerts',
      'lowStockThreshold', 'orderConfirmations', 'paymentReminders'
    ];

    return topLevelFields.includes(fieldName);
  }

  async uploadLogo(file: File): Promise<string> {
    try {
      // Upload file to storage
      const response = await this.storage.createFile(
        environment.appwrite.buckets.companyLogos,
        ID.unique(),
        file
      );

      // Get file view URL
      const fileUrl = this.storage.getFileView(
        environment.appwrite.buckets.companyLogos,
        response.$id
      );

      return fileUrl;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  }


}
