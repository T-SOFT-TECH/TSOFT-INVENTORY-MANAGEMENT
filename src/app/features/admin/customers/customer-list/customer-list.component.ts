import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../../core/services/customer.service';
import {Customer} from '../../../../core/interfaces/customer/customer.interfaces';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent {
  private customerService = inject(CustomerService);

  customers = signal<Customer[]>([]);

  isLoading = signal(false);
  error = signal<string | null>(null);
  searchQuery = signal('');
  selectedStatus = signal<string>('all');

  constructor() {
    this.loadCustomers();
  }

  async loadCustomers() {
    try {
      this.isLoading.set(true);
      await this.customerService.getCustomers();
    } catch (err) {
      this.error.set('Failed to load customers');
    } finally {
      this.isLoading.set(false);
    }
  }

  // In customer-list.component.ts
getFilteredCustomers() {
  return (this.customers() || []).filter((customer: Customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
                        customer.email.toLowerCase().includes(this.searchQuery().toLowerCase());
    const matchesStatus = this.selectedStatus() === 'all' || customer.status === this.selectedStatus();
    return matchesSearch && matchesStatus;
  });
}

  async deleteCustomer(id: string) {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    try {
      await this.customerService.deleteCustomer(id);
    } catch (err) {
      this.error.set('Failed to delete customer');
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
}
