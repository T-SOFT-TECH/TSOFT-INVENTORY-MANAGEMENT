// src/app/core/services/customer.service.ts
import { Injectable, Signal, inject, signal } from '@angular/core';
import { AppwriteService } from './appwrite.service';
import { environment } from '../../../environments/environment';
import { ID, Query } from 'appwrite';
import {Customer} from '../interfaces/customer/customer.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private appwrite = inject(AppwriteService);
  private customersSignal = signal<Customer[]>([]);

  async getCustomers(): Promise<Customer[]> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.customers
      );
      const customers = response.documents as unknown as Customer[];
      this.customersSignal.set(customers);
      return customers;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  customers(): Signal<Customer[]> {
    return this.customersSignal.asReadonly();
  }

  async getActiveCustomers(): Promise<Customer[]> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.customers,
        [Query.equal('status', 'active')]
      );
      return response.documents as unknown as Customer[];
    } catch (error) {
      console.error('Error fetching active customers:', error);
      throw error;
    }
  }

  private async _fetchCustomers(): Promise<Customer[]> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.customers
      );
      return response.documents as unknown as Customer[];
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  async getCustomer(id: string): Promise<Customer> {
    try {
      const response = await this.appwrite.database.getDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.customers,
        id
      );
      return response as unknown as Customer;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  }

  async createCustomer(data: Omit<Customer, 'id'>): Promise<Customer> {
    try {
      const response = await this.appwrite.database.createDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.customers,
        ID.unique(),
        data
      );
      return response as unknown as Customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer> {
    try {
      const response = await this.appwrite.database.updateDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.customers,
        id,
        data
      );
      return response as unknown as Customer;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      await this.appwrite.database.deleteDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.customers,
        id
      );
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }



}
