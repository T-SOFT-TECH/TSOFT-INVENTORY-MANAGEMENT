import { Injectable, computed, signal } from '@angular/core';


import { Customer, Product } from '../models/interfaces';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class PosService {
  // State
  private cartItems = signal<CartItem[]>([]);
  private _selectedCustomer = signal<Customer | null>(null);

  // Computed values
  cart = computed(() => this.cartItems());
  selectedCustomer = computed(() => this._selectedCustomer());

  itemCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  subtotal = computed(() =>
    this.cartItems().reduce((total, item) =>
      total + (item.product.price * item.quantity), 0
    )
  );

  tax = computed(() => this.subtotal() * 0.10); // 10% tax

  total = computed(() => this.subtotal() + this.tax());

  addToCart(product: Product) {
    const currentCart = this.cartItems();
    const existingItem = currentCart.find(item => item.product.$id === product.$id);

    if (existingItem) {
      this.updateQuantity(product.$id, existingItem.quantity + 1);
    } else {
      this.cartItems.set([...currentCart, { product, quantity: 1 }]);
    }
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentCart = this.cartItems();
    const item = currentCart.find(item => item.product.$id === productId);

    if (item && quantity <= item.product.stockQuantity) {
      const updatedCart = currentCart.map(item =>
        item.product.$id === productId
          ? { ...item, quantity }
          : item
      );
      this.cartItems.set(updatedCart);
    }
  }

  removeFromCart(productId: string) {
    const currentCart = this.cartItems();
    this.cartItems.set(
      currentCart.filter(item => item.product.$id !== productId)
    );
  }

  selectCustomer(customer: Customer) {
    this._selectedCustomer.set(customer);
  }

  async processPayment() {
    if (!this.selectedCustomer()) {
      throw new Error('No customer selected');
    }

    if (this.cartItems().length === 0) {
      throw new Error('Cart is empty');
    }

    try {
      // Here you would typically:
      // 1. Create a sale record
      // 2. Update product inventory
      // 3. Generate invoice
      // 4. Process payment
      // 5. Clear cart

      // For now, just clear the cart
      this.clearCart();
      this._selectedCustomer.set(null);

      return true;
    } catch (error) {
      console.error('Payment processing failed:', error);
      throw error;
    }
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
