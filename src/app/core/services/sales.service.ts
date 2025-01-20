import { Injectable, inject } from '@angular/core';
import { AppwriteService } from './appwrite.service';
import { environment } from '../../../environments/environment';
import { Sale, SaleWithDetails, SalesQueryOptions } from '../models/interfaces';
import { Query } from 'appwrite';
import { InvoiceService } from './invoice.service';
import { CustomerService } from './customer.service';

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

  async updateSale(id: string, data: Partial<Sale>): Promise<Sale> {
    try {
      const response = await this.appwrite.database.updateDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.sales,
        id,
        data
      );

      return response as unknown as Sale;
    } catch (error) {
      console.error('Error updating sale:', error);
      throw error;
    }
  }

  generateInvoice(sale: SaleWithDetails): void {
    this.invoiceService.generatePDF(sale);
  }

  async fetchSalesWithDetails(): Promise<Sale[]> {
    try {
      const sales = await this.fetchSales();
      return await Promise.all(
        sales.map(async (sale) => {
          const customer = await this.customerService.getCustomer(sale.customerId);
          return {
            ...sale,
            customer: {
              id: customer.$id,
              name: customer.name,
              email: customer.email
            }
          };
        })
      );
    } catch (error) {
      console.error('Error fetching sales with details:', error);
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


// Add fetchRecentSales method
  async fetchRecentSales(limit: number = 5): Promise<Sale[]> {
    try {
      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.sales,
        [
          Query.orderDesc('date'),
          Query.limit(limit)
        ]
      );

      // Map to include customer details
      const sales = response.documents as unknown as Sale[];
      return Promise.all(
        sales.map(async (sale) => {
          const customer = await this.customerService.getCustomer(sale.customerId);
          return {
            ...sale,
            customer: {
              id: customer.$id,
              name: customer.name,
              email: customer.email
            }
          };
        })
      );
    } catch (error) {
      console.error('Error fetching recent sales:', error);
      throw error;
    }
  }


}
