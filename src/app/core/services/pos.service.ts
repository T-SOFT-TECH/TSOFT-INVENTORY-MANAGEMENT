import {Injectable, computed, signal, inject} from '@angular/core';
import {Customer} from '../interfaces/customer/customer.interfaces';
import {Product} from '../interfaces/product/product.interfaces';
import {CartItem, POSTransaction} from '../interfaces/cart/cart.interfaces';
import {AppwriteService} from './appwrite.service';
import {InvoiceService} from './invoice.service';
import {HotToastService} from '@ngxpert/hot-toast';
import {environment} from '../../../environments/environment';
import {ID} from 'appwrite';
import {ProcessSaleInput} from '../interfaces/pos/pos.interface';
import {Sale} from '../interfaces/sales/sales.interfaces';


interface PaymentResult {
  success: boolean;
  sale?: Sale | null;
}


@Injectable({
  providedIn: 'root'
})
export class PosService {

  private appwrite = inject(AppwriteService);
  private invoiceService = inject(InvoiceService);
  private toast = inject(HotToastService);

  // Core state signals
  private cartItems = signal<CartItem[]>([]);
  selectedCustomer = signal<Customer | null>(null);
  public paymentMethod = signal<'cash' | 'card' | 'transfer'>('cash');


  // Computed values
  readonly cart = computed(() => this.cartItems());
  readonly customer = computed(() => this.selectedCustomer());

  readonly itemCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.cartItems().reduce((sum, item) =>
      sum + (item.quantity * item.priceAtSale), 0)
  );

  readonly tax = computed(() => this.subtotal() * 0.10);
  readonly total = computed(() => this.subtotal() + this.tax());

  // Cart Management
  addToCart(product: Product, quantity: number = 1) {
    // Basic client-side validation
    if (quantity <= 0) {
      this.toast.error('Invalid quantity');
      return;
    }

    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.$id === product.$id);

      if (existingItem) {
        return items.map(item =>
          item.product.$id === product.$id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...items, {
        product,
        quantity,
        priceAtSale: product.price
      }];
    });
  }



  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update(items =>
      items.map(item => {
        if (item.product.$id === productId) {
          if (quantity > item.product.stockQuantity) {
            this.toast.error(`Only ${item.product.stockQuantity} items available`);
            return item;
          }
          return {
            ...item,
            quantity,
            subtotal: quantity * item.priceAtSale
          };
        }
        return item;
      })
    );
  }

  removeFromCart(productId: string) {
    this.cartItems.update(items =>
      items.filter(item => item.product.$id !== productId)
    );
  }

  clearCart() {
    this.cartItems.set([]);
    this.selectedCustomer.set(null);
  }

  // Customer Management
  selectCustomer(customer: Customer) {
    this.selectedCustomer.set(customer);
  }

  // Payment Processing
  setPaymentMethod(method: 'cash' | 'card' | 'transfer') {
    this.paymentMethod.set(method);
  }

  async processPayment(): Promise<any> {
    try {
      if (!this.selectedCustomer()) {
        this.toast.error('No customer selected');
        return false;
      }

      if (this.cartItems().length === 0) {
        this.toast.error('Cart is empty');
        return false;
      }

      const saleData = {
        customerId: this.selectedCustomer()!.$id,
        items: this.cartItems().map(item => ({
          productId: item.product.$id,
          quantity: item.quantity,
          priceAtSale: item.product.price
        })),
        paymentMethod: this.paymentMethod()
      };

      // Call cloud function to process sale
      const execution = await this.appwrite.functions.createExecution(
        'process-sale',
        JSON.stringify(saleData)
      );

      const result = JSON.parse(execution.responseBody);

      if (!result.success) {
        this.toast.error(result.message || 'Failed to process sale');
        return false;
      }

      // Clear cart after successful sale
      this.clearCart();
      this.toast.success('Sale completed successfully');
      return {
        success: true,
        sale: result.sale
      };

    } catch (err) {
      const error = err as Error;
      console.error('Sale processing error:', error);
      this.toast.error(error.message || 'Failed to process sale');
      return false;
    }
  }


  clearCustomer() {
    this.selectedCustomer.set(null);
  }


  // Helper Methods
  private async updateStockLevels() {
    const updatePromises = this.cartItems().map(item =>
      this.appwrite.database.updateDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.products,
        item.product.$id,
        {
          stockQuantity: item.product.stockQuantity - item.quantity,
          totalQuantitySold: (item.product.totalQuantitySold || 0) + item.quantity,
          totalRevenue: (item.product.totalRevenue || 0) + (item.quantity * item.priceAtSale)
        }
      )
    );

    await Promise.all(updatePromises);
  }

  private generateInvoiceNumber(): string {
    const prefix = 'INV';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  }




  async validateStock(): Promise<boolean> {
    try {
      const stockData = {
        items: this.cartItems().map(item => ({
          productId: item.product.$id,
          quantity: item.quantity
        }))
      };

      const execution = await this.appwrite.functions.createExecution(
        'validate-stock',
        JSON.stringify(stockData)
      );

      const result = JSON.parse(execution.responseBody);
      return result.valid;

    } catch (error) {
      console.error('Stock validation error:', error);
      return false;
    }
  }


}
