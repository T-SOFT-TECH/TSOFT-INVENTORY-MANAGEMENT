

// For sending data to create a stock transaction
import {BaseDocument} from '../base/base.interfaces';
import {Product} from '../product/product.interfaces';

export interface StockItemInput {
  productId: string;
  quantity: number;
  unitCost: number;
}

export interface CreateStockTransactionDTO {
  items: StockItemInput[];
  reference?: string;
  notes?: string;
  supplierName?: string;
  supplierInvoice?: string;
}

// The actual stock transaction as stored in database
export interface StockTransaction extends BaseDocument {
  transactionDate: string;
  products: Product[];  // Will be populated by Appwrite relationship
  quantities: number[];
  unitCosts: number[];
  totalQuantity: number;
  totalCost: number;
  reference?: string;
  supplierName?: string;
  supplierInvoice?: string;
  notes?: string;
  status: 'completed' | 'pending' | 'cancelled';
  receiptImageIds?: string[]; //
}

// A helper interface combining related data for display/processing
export interface StockTransactionWithDetails extends StockTransaction {
  items: Array<{
    product: Product;
    quantity: number;
    unitCost: number;
    subtotal: number;
  }>;
}


export interface StockHistoryFilters {
  startDate?: Date;
  endDate?: Date;
  supplier?: string;
  status?: string;
}

export interface BatchStockItem {
  sku: string;
  quantity: number;
  unitCost: number;
  supplierReference?: string;
}

export interface CreateStockTransactionDTO {
  items: StockItemInput[];
  reference?: string;
  notes?: string;
  supplierName?: string;
  supplierInvoice?: string;
  receiptImageIds?: string[]; // Add this line
}


