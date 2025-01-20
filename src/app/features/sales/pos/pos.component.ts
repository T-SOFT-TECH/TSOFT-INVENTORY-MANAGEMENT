import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { PosService } from '../../../core/services/pos.service';
import { BaseProduct, Customer, Product } from '../../../core/models/interfaces';
import { ProductService } from '../../../core/services/product.service';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pos.component.html'
})
export class PosComponent implements OnInit {
  private productService = inject(ProductService);
  private customerService = inject(CustomerService);
  private posService = inject(PosService);

  // Signals
  products = signal<BaseProduct[]>([]);

  customers = signal<Customer[]>([]);

  isLoading = signal(false);
  error = signal<string | null>(null);
  searchQuery = signal('');
  selectedCategory = signal('all');
  showCustomerModal = signal(false);

  // Cart related signals from PosService
  cart = this.posService.cart;
  selectedCustomer = this.posService.selectedCustomer;
  itemCount = this.posService.itemCount;
  subtotal = this.posService.subtotal;
  tax = this.posService.tax;
  total = this.posService.total;

  ngOnInit() {
    this.loadInitialData();
  }

  private async loadInitialData() {
    try {
      this.isLoading.set(true);
      const customers = await this.customerService.getCustomers();
      this.customers.set(customers);
    } catch (err) {
      this.error.set('Failed to load initial data');
    } finally {
      this.isLoading.set(false);
    }
  }

  addToCart(product: BaseProduct) {
    if (product.stockQuantity <= 0) {
      this.error.set('Product out of stock');
      return;
    }

    const cartProduct: Product = {
      ...product, // This spreads all BaseProduct properties including $id, $createdAt, $updatedAt
      totalQuantitySold: 0,
      totalRevenue: 0
    };

    this.posService.addToCart(cartProduct);
  }

  getFilteredProducts() {
    return this.products().filter(product =>
      product.name.toLowerCase().includes(this.searchQuery().toLowerCase()) &&
      (this.selectedCategory() === 'all' || product.category === this.selectedCategory())
    );
  }

  // Cart management methods
  updateQuantity(productId: string, quantity: number) {
    this.posService.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: string) {
    this.posService.removeFromCart(productId);
  }

  selectCustomer(customer: Customer) {
    this.posService.selectCustomer(customer);
    this.showCustomerModal.set(false);
  }

  async processPayment() {
    try {
      this.isLoading.set(true);
      await this.posService.processPayment();
      // Handle successful payment
    } catch (error) {
      this.error.set('Failed to process payment');
    } finally {
      this.isLoading.set(false);
    }
  }
}
