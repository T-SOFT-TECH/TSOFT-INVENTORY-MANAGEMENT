import {Injectable, computed, signal, inject} from '@angular/core';
import {Customer} from '../interfaces/customer/customer.interfaces';
import {Product} from '../interfaces/product/product.interfaces';
import {CartItem,} from '../interfaces/cart/cart.interfaces';
import {AppwriteService} from './appwrite.service';
import {HotToastService} from '@ngxpert/hot-toast';
import {environment} from '../../../environments/environment';
import {Sale} from '../interfaces/sales/sales.interfaces';
import {SettingsService} from './settings.service';


interface PaymentResult {
  success: boolean;
  sale?: Sale | null;
}


@Injectable({
  providedIn: 'root'
})
export class PosService {

  private appwrite = inject(AppwriteService);
  private toast = inject(HotToastService);
  private settingService = inject(SettingsService);

  // Core state signals
  private cartItems = signal<CartItem[]>([]);
  selectedCustomer = signal<Customer | null>(null);
  public paymentMethod = signal<'cash' | 'card' | 'transfer'>('cash');

  private currentIdempotencyKey = signal<string | null>(null);



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

  readonly tax = computed(() => {
    const taxRate = this.settingService?.settings()?.invoice?.taxRate || 0;
    return this.subtotal() * (taxRate / 100);
  });
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
    this.resetIdempotencyKey(); // Reset idempotency key when cart is cleared
  }

  // Customer Management
  selectCustomer(customer: Customer) {
    this.selectedCustomer.set(customer);
  }


  setPaymentMethod(method: 'cash' | 'card' | 'transfer') {
    this.paymentMethod.set(method);
  }


  // Method to get the current key or generate a new one if needed
  private getIdempotencyKey(): string {
    if (!this.currentIdempotencyKey()) {
      this.currentIdempotencyKey.set(crypto.randomUUID());
    }
    return this.currentIdempotencyKey()!;
  }

  private resetIdempotencyKey(): void {
    this.currentIdempotencyKey.set(null);
  }



// Payment Processing
  async processPayment(paymentStatus: string = 'paid', salesRep: string): Promise<any> {
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
        paymentMethod: this.paymentMethod(),
        paymentStatus: paymentStatus, // Use the provided payment status
        salesRep: salesRep, // Include the sales rep info
        idempotencyKey: this.getIdempotencyKey() // Use the signal-based method
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
      this.resetIdempotencyKey(); // Reset the key after successful processing
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
