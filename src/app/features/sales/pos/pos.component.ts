import {Component, OnInit, inject, signal, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
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
import {LoadingService} from '../../../core/services/loading.service';
import {Sale} from '../../../core/interfaces/sales/sales.interfaces';
import {ReceiptComponent} from '../../../core/components/receipt/receipt.component';
import {SettingsService} from '../../../core/services/settings.service';
import {AuthService} from '../../../core/services/auth.service';
import {BrandService} from '../../../core/services/brand.service';
import {Brand} from '../../../core/interfaces/brand/brand.interfaces';

@Component({
  selector: 'app-pos',
  imports: [CommonModule, FormsModule, AutoAnimationDirective, ReactiveFormsModule, ReceiptComponent],
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit, AfterViewChecked {

  protected posService = inject(PosService);
  private productService = inject(ProductService);
  private customerService = inject(CustomerService);
  private categoryService = inject(CategoryService);
  private toast = inject(HotToastService);
  private appwriteService = inject(AppwriteService);
  private loadingService = inject(LoadingService);
  protected settings = inject(SettingsService);
  private authService = inject(AuthService);
  private brandService = inject(BrandService);



  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  private shouldFocusSearch = false;


  // UI state
  completedSale = signal<Sale | null>(null);
  showReceiptModal = signal(false);
  isLoading = signal(false);
  searchQuery = signal('');
  selectedCategory = signal('all');
  showCustomerModal = signal(false);
  isCartOpen = signal(false);


  selectedBrand = signal('all');
  showOnlyInStock = signal(false);
  priceRange = signal<{min: number, max: number | null}>({ min: 0, max: null });
  showFiltersPanel = signal(false); // To toggle advanced filters on mobile


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
  brands = signal<Brand[]>([]);

  // POS service connections
  cart = this.posService.cart;
  selectedCustomer = this.posService.selectedCustomer;
  itemCount = this.posService.itemCount;
  subtotal = this.posService.subtotal;
  tax = this.posService.tax;
  total = this.posService.total;

  hasPaid = signal(false); // Default to true for backward compatibility





  constructor(private fb: FormBuilder) {
    // Initialize form
    this.newCustomerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [''],
      phone: ['', [Validators.required]],
      address: ['']
    });
  }

  toggleCartPanel() {
    this.isCartOpen.update(current => !current);
  }

  toggleStockOnly(){
    this.showOnlyInStock.update(current => !current);
  }

  closeCartPanel() {
    this.isCartOpen.set(false);
  }

  closeFilters(){
    this.showFiltersPanel.set(false);
  }

  // Add this method to toggle payment status
  togglePaymentStatus() {
    this.hasPaid.update(current => !current);
    // If payment status is changed to unpaid, set payment method to a default
    if (!this.hasPaid()) {
      this.posService.setPaymentMethod('cash');
    }
  }


  ngOnInit() {
    this.loadInitialData();
  }

  private async loadInitialData() {
    try {
      this.isLoading.set(true);

      // Add BrandService to your injected services at the top


      const [products, customers, categories, brands] = await Promise.all([
        this.productService.getProducts(),
        this.customerService.getCustomers(),
        this.categoryService.getCategories(),
        this.brandService.getBrands() // Add this
      ]);

      this.products.set(products);
      this.customers.set(customers);
      this.categories.set(categories);
      this.brands.set(brands); // Add this

    } catch (error) {
      console.error('Failed to load initial data:', error);
      this.toast.error('Failed to load initial data');
    } finally {
      this.isLoading.set(false);
    }
  }



// Then update the getFilteredProducts method with proper null checks
  getFilteredProducts() {
    return this.products().filter(product => {
      // Text search filter
      const matchesSearch = product.name.toLowerCase().includes(this.searchQuery().toLowerCase());

      // Category filter
      const matchesCategory = this.selectedCategory() === 'all' ||
        product.category?.$id === this.selectedCategory();

      // Brand filter
      const matchesBrand = this.selectedBrand() === 'all' ||
        product.brand?.$id === this.selectedBrand();

      // Stock filter
      const matchesStock = !this.showOnlyInStock() ||
        (product.stockQuantity > 0);

      // Price filter with proper null checks
      const minPrice = this.priceRange().min;
      const maxPrice = this.priceRange().max;
      const price = product.price || 0;

      const matchesMinPrice = minPrice === 0 || price >= minPrice;
      const matchesMaxPrice = maxPrice === null || price <= maxPrice;
      const matchesPrice = matchesMinPrice && matchesMaxPrice;

      return matchesSearch && matchesCategory && matchesBrand && matchesStock && matchesPrice;
    });
  }


  setMinPrice(value: number) {
    this.priceRange.update(current => ({
      min: value,
      max: current.max
    }));
  }

  setMaxPrice(value: number | null) {
    this.priceRange.update(current => ({
      min: current.min,
      max: value
    }));
  }

// Helper method for quick price ranges
  setPriceRange(min: number, max: number | null) {
    this.priceRange.set({ min, max });
  }


  resetFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('all');
    this.selectedBrand.set('all');
    this.showOnlyInStock.set(false);
    this.priceRange.set({ min: 0, max: null });
  }

  toggleFiltersPanel() {
    this.showFiltersPanel.update(current => !current);
  }

// Helper to check if any filters are active
  hasActiveFilters() {
    return this.searchQuery() !== '' ||
      this.selectedCategory() !== 'all' ||
      this.selectedBrand() !== 'all' ||
      this.showOnlyInStock() ||
      (this.priceRange().min > 0 || this.priceRange().max !== null);
  }


  getImageUrl(imageUrl?: string): string {
    if (!imageUrl) return 'assets/images/placeholder.png';
    return this.productService.getOptimizedImage(imageUrl, 200, 80);
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
      this.loadingService.start('Processing sale...');

      // Get current user (sales rep) information
      const currentUser = this.authService.currentUser();
      const salesRep = currentUser!.name

      // Set payment status based on hasPaid toggle
      const paymentStatus = this.hasPaid() ? 'paid' : 'pending';

      const result = await this.posService.processPayment(paymentStatus, salesRep);

      // Check if result exists and has sale data
      if (result && 'sale' in result) {
        // Store the completed sale and show receipt
        this.completedSale.set(result.sale);
        this.showReceiptModal.set(true);
        this.toast.success(this.hasPaid()
          ? 'Payment completed successfully'
          : 'Sale recorded with pending payment');
      }
    } catch (error) {
      console.error('Sale processing failed:', error);
      this.toast.error('Sale processing failed');
    } finally {
      this.isLoading.set(false);
      this.loadingService.clear();
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
      this.loadingService.start('Creating new customer...'); // Add this


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
      this.loadingService.clear();

    }
  }

  formatCurrency(amount: number | undefined): string {
    if (amount === undefined || amount === null) {
      return '₦0.00'; // Return a default value when amount is undefined
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      currencyDisplay: 'narrowSymbol' // For compact currency symbol
    }).format(amount);
  }


  selectPaymentMethod(method: 'cash' | 'card' | 'transfer') {
    this.posService.setPaymentMethod(method)
  }

  closeReceiptModal() {
    this.showReceiptModal.set(false);
  }

  toggleCustomerModal(show: boolean) {
    this.showCustomerModal.set(show);
    if (show && !this.showNewCustomerForm()) {
      // Set flag to focus search on next view check
      this.shouldFocusSearch = true;
    }
  }

  ngAfterViewChecked() {
    // Check if we should focus the search input
    if (this.shouldFocusSearch && this.searchInput?.nativeElement) {
      this.searchInput.nativeElement.focus();
      this.shouldFocusSearch = false; // Reset flag after focusing
    }
  }

  // Helper methods to get display names for IDs
  getCategoryName(categoryId: string): string {
    const category = this.categories().find(c => c.$id === categoryId);
    return category ? category.name : 'Unknown';
  }

  getBrandName(brandId: string): string {
    const brand = this.brands().find(b => b.$id === brandId);
    return brand ? brand.name : 'Unknown';
  }

}
