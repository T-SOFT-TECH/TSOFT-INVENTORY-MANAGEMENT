import {inject, Injectable} from '@angular/core';
import {AppwriteService} from './appwrite.service';
import {environment} from '../../../environments/environment';
import {
  CreateStockTransactionDTO,
  StockHistoryFilters,
  StockTransaction
} from '../interfaces/stock-transaction/stock-transaction.interfaces';
import {ImageGravity, Query} from 'appwrite';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private appwrite = inject(AppwriteService);
  private storage = this.appwrite.storage


  async createStockTransaction(data: CreateStockTransactionDTO): Promise<StockTransaction> {
    try {
      const execution = await this.appwrite.functions.createExecution(
        'process-stock-transaction',
        JSON.stringify(data)
      );

      const result = JSON.parse(execution.responseBody);
      if (!result.success) {
        throw new Error(result.error || 'Failed to create stock transaction');
      }

      return result.transaction;
    } catch (error) {
      console.error('Stock transaction error:', error);
      throw error;
    }
  }

  async getStockHistory(filters?: StockHistoryFilters): Promise<StockTransaction[]> {
    try {
      const queries: string[] = [];

      if (filters?.startDate) {
        queries.push(Query.greaterThanEqual('transactionDate', filters.startDate.toISOString()));
      }

      if (filters?.endDate) {
        queries.push(Query.lessThanEqual('transactionDate', filters.endDate.toISOString()));
      }

      if (filters?.supplier) {
        queries.push(Query.equal('supplierName', filters.supplier));
      }

      if (filters?.status) {
        queries.push(Query.equal('status', filters.status));
      }

      const response = await this.appwrite.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collections.stockTransactions,
        queries
      );

      return response.documents as unknown as StockTransaction[];
    } catch (error) {
      console.error('Error fetching stock history:', error);
      throw error;
    }
  }

  async uploadReceiptImage(file: File, supplierName: string): Promise<string> {
    try {
      // Format supplier name for filename
      const formattedSupplierName = supplierName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');

      // Create a unique filename with supplier name
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = `${formattedSupplierName}_${timestamp}.${fileExtension}`;

      // Create a new File object with the unique name
      const renamedFile = new File([file], uniqueFileName, { type: file.type });

      // Upload file to storage with the unique filename
      const response = await this.storage.createFile(
        environment.appwrite.buckets.receiptImages,
        uniqueFileName, // Use uniqueFileName as the ID
        renamedFile
      );

      return response.$id;
    } catch (error) {
      console.error('Error uploading receipt image:', error);
      throw error;
    }
  }

  getReceiptImageUrl(fileId: string): string {
    return this.storage.getFileView(
      environment.appwrite.buckets.receiptImages,
      fileId
    );
  }


  async getReceiptPreview(fileId: string): Promise<string> {
    // Get a lower resolution preview for thumbnails
    return this.storage.getFilePreview(
      environment.appwrite.buckets.receiptImages,
      fileId,
      200, // width
      200, // height
      ImageGravity.Center,
      100  // quality
    );
  }

}
