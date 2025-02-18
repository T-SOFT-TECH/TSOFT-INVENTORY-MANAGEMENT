

export interface ProcessSaleInput {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
    priceAtSale: number;
  }[];
  paymentMethod: 'cash' | 'card' | 'transfer';
  notes?: string;
}

export interface ValidateStockInput {
  items: {
    productId: string;
    quantity: number;
  }[];
}
