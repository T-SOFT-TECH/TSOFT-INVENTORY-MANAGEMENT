import { Injectable, inject } from '@angular/core';
import { AppwriteService } from './appwrite.service';

import { Storage } from 'appwrite';
import { environment } from '../../../environments/environment';
import { ID } from 'appwrite';

export interface Settings {
  general: {
    storeName: string;
    currency: string;
    timezone: string;
    dateFormat: string;
    theme: 'light' | 'dark';
  };
  company: {
    companyName: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    taxId?: string;
  };
  invoice: {
    invoicePrefix: string;
    nextInvoiceNumber: number;
    termsAndConditions?: string;
    taxRate: number;
    showLogo: boolean;
    logoUrl?: string;
  };
  notifications: {
    emailNotifications: boolean;
    lowStockAlerts: boolean;
    lowStockThreshold: number;
    orderConfirmations: boolean;
    paymentReminders: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private appwrite = inject(AppwriteService);
  private storage = new Storage(this.appwrite.client);

  async getSettings(): Promise<Settings> {
    try {
      const response = await this.appwrite.database.getDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.settings,
        'default'
      );

      return response as unknown as Settings;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  }

  async updateSettings(section: keyof Settings, data: Partial<Settings[keyof Settings]>): Promise<Settings> {
    try {
      const response = await this.appwrite.database.updateDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.settings,
        'default',
        { [section]: data }
      );

      return response as unknown as Settings;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
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

  getDefaultSettings(): Settings {
    return {
      general: {
        storeName: '',
        currency: 'USD',
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
        theme: 'light'
      },
      company: {
        companyName: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        taxId: ''
      },
      invoice: {
        invoicePrefix: 'INV-',
        nextInvoiceNumber: 1000,
        termsAndConditions: '',
        taxRate: 10,
        showLogo: true,
        logoUrl: ''
      },
      notifications: {
        emailNotifications: true,
        lowStockAlerts: true,
        lowStockThreshold: 10,
        orderConfirmations: true,
        paymentReminders: true
      }
    };
  }
} 