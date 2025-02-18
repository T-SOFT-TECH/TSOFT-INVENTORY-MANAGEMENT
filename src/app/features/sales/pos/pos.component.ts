import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { PosService } from '../../../core/services/pos.service';
import { ProductService } from '../../../core/services/product.service';
import { CustomerService } from '../../../core/services/customer.service';
import {BaseProduct, Product} from '../../../core/interfaces/product/product.interfaces';
import {Customer} from '../../../core/interfaces/customer/customer.interfaces';
import {ProductStatus} from '../../../core/interfaces/base/base.interfaces';
import {Category} from '../../../core/interfaces/category/category.interfaces';
import {CategoryService} from '../../../core/services/category.service';
import {AutoAnimationDirective} from '../../../core/Directives/auto-Animate.directive';
import {HotToastService} from '@ngxpert/hot-toast';
import {AppwriteService} from '../../../core/services/appwrite.service';

@Component({
  selector: 'app-pos',
  imports: [CommonModule, FormsModule, AutoAnimationDirective, ReactiveFormsModule],
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {
  private posService = inject(PosService);
  private productService = inject(ProductService);
  private customerService = inject(CustomerService);
  private categoryService = inject(CategoryService);
  private toast = inject(HotToastService);
  private appwriteService = inject(AppwriteService);

  // UI state
  isLoading = signal(false);
  searchQuery = signal('');
  selectedCategory = signal('all');
  showCustomerModal = signal(false);

  showNewCustomerForm = signal(false);
  isCreatingCustomer = signal(false);
  phoneSearchQuery = signal('');
  phoneSearchInput: string = '';
  filteredCustomers = signal<Customer[]>([]);
  newCustomerForm: FormGroup;


  // Data
  products = signal<Product[]>([]);
  customers = signal<Customer[]>([]);
  categories = signal<Category[]>([]);

  // POS service connections
  cart = this.posService.cart;
  selectedCustomer = this.posService.selectedCustomer;
  itemCount = this.posService.itemCount;
  subtotal = this.posService.subtotal;
  tax = this.posService.tax;
  total = this.posService.total;


  constructor(private fb: FormBuilder) {
    // Initialize form
    this.newCustomerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [''],
      phone: ['', [Validators.required]],
      address: ['']
    });
  }


  ngOnInit() {
    this.loadInitialData();
  }

  private async loadInitialData() {
    try {
      this.isLoading.set(true);
      const [products, customers, categories] = await Promise.all([
        this.productService.getProducts(),
        this.customerService.getCustomers(),
        this.categoryService.getCategories()
      ]);

      // No conversion needed as types are now aligned
      this.products.set(products);
      this.customers.set(customers);
      this.categories.set(categories);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  getFilteredProducts() {
    return this.products().filter(product =>
      product.name.toLowerCase().includes(this.searchQuery().toLowerCase()) &&
      (this.selectedCategory() === 'all' || product.category?.$id === this.selectedCategory())
    );
  }

  getImageUrl(imageUrl?: string): string {
    if (!imageUrl) return 'assets/images/placeholder.png';
    return this.productService.getProductImageUrl(imageUrl);
  }

  addToCart(product: Product) {
    this.posService.addToCart(product);
  }

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
      const success = await this.posService.processPayment();
      if (success) {
        // Maybe navigate to receipt page or show success screen
      }
    } catch (error) {
      console.error('Payment processing failed:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  removeCustomer() {
    // Show confirmation dialog
    if (confirm('Are you sure you want to remove this customer from the sale?')) {
      // Clear the selected customer
      this.posService.clearCustomer();

      // Optionally show a toast notification
      this.toast.info('Customer removed from sale');
    }
  }



  searchCustomerByPhone() {
    this.phoneSearchQuery.set(this.phoneSearchInput);

    const query = this.phoneSearchInput.trim();
    if (!query) {
      this.filteredCustomers.set([]);
      return;
    }

    const results = this.customers().filter(customer =>
      customer.phone.includes(query)
    );
    this.filteredCustomers.set(results);
  }

  createNewFromPhone() {
    // Transfer the phone number to the new customer form
    this.newCustomerForm.patchValue({
      phone: this.phoneSearchInput
    });
    this.showNewCustomerForm.set(true);
  }

  cancelNewCustomerForm() {
    // Keep the phone search query when returning to search
    const phoneNumber = this.newCustomerForm.get('phone')?.value;
    this.showNewCustomerForm.set(false);

    // Only reset the form after hiding it to prevent UI flicker
    setTimeout(() => {
      this.newCustomerForm.reset();
      // If we came from search, restore the phone search
      if (phoneNumber) {
        this.phoneSearchQuery.set(phoneNumber);
        this.searchCustomerByPhone();
      }
    }, 100);
  }

  async createCustomer() {
    if (this.newCustomerForm.invalid) return;

    try {
      this.isCreatingCustomer.set(true);

      // Get raw form values
      const formValues = this.newCustomerForm.value;

      // Create clean object with only non-empty values
      const customerData: Record<string, any> = {};

      // Process each field to remove empty values
      Object.keys(formValues).forEach(key => {
        const value = formValues[key];
        if (value !== null && value !== undefined && value !== '') {
          customerData[key] = value;
        }
      });

      // Always include required fields and status
      // Always include required fields and status
      customerData['status'] = 'active';

      // Only add address if it exists
      if (customerData['address']) {
        customerData['addresses'] = [
          {
            street: customerData['address'],
            isDefault: true
          }
        ];

        // Remove the flat address field since we've structured it
        delete customerData['address'];
      }

      // Call Appwrite function to create customer
      const execution = await this.appwriteService.functions.createExecution(
        'customer-creation', // Your function ID
        JSON.stringify(customerData)
      );

      const result = JSON.parse(execution.responseBody);

      if (result.error) {
        throw new Error(result.error);
      }

      // Get the created customer
      const newCustomer = result.customer;

      // Add to local customers list and select
      this.customers().push(newCustomer);
      this.selectCustomer(newCustomer);

      // Reset form and close it
      this.newCustomerForm.reset();
      this.showNewCustomerForm.set(false);
      this.phoneSearchInput = '';

      // Display success message
      this.toast.success('Customer created successfully');

    } catch (error) {
      console.error('Error creating customer:', error);
      this.toast.error('Failed to create customer');
    } finally {
      this.isCreatingCustomer.set(false);
    }
  }


}
