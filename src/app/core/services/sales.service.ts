import { Injectable, inject } from '@angular/core';
import { AppwriteService } from './appwrite.service';
import { environment } from '../../../environments/environment';
import { Query } from 'appwrite';
import { InvoiceService } from './invoice.service';
import { CustomerService } from './customer.service';
import {Sale, SalesQueryOptions, SaleWithDetails} from '../interfaces/sales/sales.interfaces';
import {PaymentStatus} from '../interfaces/base/base.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private appwrite = inject(AppwriteService);
  private invoiceService = inject(InvoiceService);
  private customerService = inject(CustomerService);

  async fetchSales(options: SalesQueryOptions = {}): Promise<Sale[]> {
    try {
      const queries: string[] = [];

      if (options.startDate) {
        queries.push(Query.greaterThanEqual('date', options.startDate.toISOString()));
      }

      if (options.endDate) {
        queries.push(Query.lessThanEqual('date', options.endDate.toISOString()));
      }

      if (options.customerId) {
        queries.push(Query.equal('customerId', options.customerId));
      }

      if (options.status) {
        queries.push(Query.equal('paymentStatus', options.status));
      }

      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.sales,
        queries
      );

      return response.documents as unknown as Sale[];
    } catch (error) {
      console.error('Error fetching sales:', error);
      throw error;
    }
  }

  // In sales.service.ts
  async updatePaymentStatus(saleId: string, newStatus: PaymentStatus, newPaymentMethod: string | undefined): Promise<Sale> {
    try {
      const execution = await this.appwrite.functions.createExecution(
        'payment-update',
        JSON.stringify({ saleId, newPaymentStatus: newStatus, newPaymentMethod })
      );

      const result = JSON.parse(execution.responseBody);
      if (!result.success) {
        throw new Error(result.message || 'Failed to update payment status');
      }

      return await this.getSaleDetails(saleId);
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }




async getSaleDetails(saleId: string): Promise<SaleWithDetails> {
  try {
    const response = await this.appwrite.database.getDocument(
      environment.appwrite.databaseId,
      environment.appwrite.collections.sales,
      saleId
    );

    // Fetch related product details
    const saleWithDetails = { ...response } as unknown as SaleWithDetails;
    // Add any additional product or customer details fetching logic here

    return saleWithDetails;
  } catch (error) {
    console.error('Error fetching sale details:', error);
    throw error;
  }
}



}
