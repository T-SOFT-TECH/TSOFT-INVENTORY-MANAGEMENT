import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../../core/services/customer.service';
import { Customer } from '../../../../core/interfaces/customer/customer.interfaces';
import { HotToastService } from '@ngxpert/hot-toast';
import { LoadingService } from '../../../../core/services/loading.service';
import {AutoAnimationDirective} from '../../../../core/Directives/auto-Animate.directive';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, AutoAnimationDirective],
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent {
  private customerService = inject(CustomerService);
  private toast = inject(HotToastService);
  private loadingService = inject(LoadingService);

  // Data state
  customers = signal<Customer[]>([]);
  selectedCustomer = signal<Customer | null>(null);

  // UI state
  isLoading = signal(false);
  error = signal<string | null>(null);
  searchQuery = signal('');
  selectedStatus = signal<string>('all');
  sortField = signal<'name' | 'spent' | 'date'>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');

  constructor() {
    this.loadCustomers();
  }

  async loadCustomers() {
    try {
      this.isLoading.set(true);
      this.loadingService.start('Loading customers...');
      const customers = await this.customerService.getCustomers();
      this.customers.set(customers);
    } catch (err) {
      this.error.set('Failed to load customers');
      this.toast.error('Could not load customers');
    } finally {
      this.isLoading.set(false);
      this.loadingService.clear();
    }
  }

  getFilteredCustomers() {
    let result = this.customers() || [];

    // Apply search filter
    if (this.searchQuery()) {
      const searchTerm = this.searchQuery().toLowerCase();
      result = result.filter(customer =>
        customer.name?.toLowerCase().includes(searchTerm) ||
        customer.email?.toLowerCase().includes(searchTerm) ||
        customer.phone?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (this.selectedStatus() !== 'all') {
      result = result.filter(customer => customer.status === this.selectedStatus());
    }

    // Apply sorting
    result = this.sortCustomerList(result);

    return result;
  }

  async deleteCustomer(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      this.loadingService.start(`Deleting ${name}...`);
      await this.customerService.deleteCustomer(id);
      this.toast.success(`${name} has been deleted`);
      await this.loadCustomers(); // Refresh list
    } catch (err) {
      this.error.set('Failed to delete customer');
      this.toast.error('Could not delete customer');
    } finally {
      this.loadingService.clear();
    }
  }

  getTotalSpent(customer: Customer): number {
    return customer.orders?.reduce((sum, order) => sum + order.total, 0) || 0;
  }

  getLastPurchaseDate(customer: Customer): string {
    if (!customer.orders?.length) return 'Never';
    const lastOrder = customer.orders.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
    return new Date(lastOrder.date).toLocaleDateString();
  }

  // New methods for the enhanced UI
  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }



  getActiveCustomersCount(): number {
    return this.customers().filter(customer => customer.status === 'active').length;
  }

  getTotalRevenue(): number {
    return this.customers().reduce((total, customer) => total + this.getTotalSpent(customer), 0);
  }

  sortCustomers() {
    // Toggle sort direction if clicking the same field
    if (this.sortField() === 'name') {
      this.sortDirection.update(current => current === 'asc' ? 'desc' : 'asc');
    } else {
      // Change sort field and set to descending by default for metrics
      this.sortField.set('name');
      this.sortDirection.set('asc');
    }
  }

  sortCustomerList(customers: Customer[]): Customer[] {
    const direction = this.sortDirection() === 'asc' ? 1 : -1;

    return [...customers].sort((a, b) => {
      switch(this.sortField()) {
        case 'spent':
          return (this.getTotalSpent(a) - this.getTotalSpent(b)) * direction;
        case 'date':
          const dateA = a.orders?.length ? new Date(a.orders[0].date).getTime() : 0;
          const dateB = b.orders?.length ? new Date(b.orders[0].date).getTime() : 0;
          return (dateA - dateB) * direction;
        case 'name':
        default:
          return a.name.localeCompare(b.name) * direction;
      }
    });
  }

  getSortLabel(): string {
    const field = this.sortField() === 'name' ? 'Name' :
      this.sortField() === 'spent' ? 'Amount Spent' : 'Purchase Date';
    const direction = this.sortDirection() === 'asc' ? '↑' : '↓';
    return `${field} ${direction}`;
  }

  quickView(customer: Customer) {
    this.selectedCustomer.set(customer);
  }

  closeQuickView() {
    this.selectedCustomer.set(null);
  }

  getCustomerAddress(customer: Customer): string {
    // Handle addresses that are stored as JSON strings
    if (customer.addresses && customer.addresses.length > 0) {
      try {
        const address = typeof customer.addresses[0] === 'string'
          ? JSON.parse(customer.addresses[0])
          : customer.addresses[0];

        return address.street || 'No address';
      } catch (e) {
        return String(customer.addresses[0]) || 'No address';
      }
    }
    return 'No address';
  }

  formatCurrency(amount: number): string {
   if (amount === undefined || amount === null) {
     return '0.00';
   }
   return new Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'NGN',
     currencyDisplay: 'narrowSymbol'
  }).format(amount);
  }

}
