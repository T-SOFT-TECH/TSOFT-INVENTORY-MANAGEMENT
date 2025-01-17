import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../core/services/customer.service';
import { Customer } from '../../../../core/models/interfaces';


@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = signal(false);
  error = signal<string | null>(null);
  isEditMode = signal(false);

  customerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    notes: [''],
    status: ['active']
  });

  constructor() {
    const customerId = this.route.snapshot.params['id'];
    if (customerId) {
      this.isEditMode.set(true);
      this.loadCustomer(customerId);
    }
  }

  private async loadCustomer(id: string) {
    try {
      this.isLoading.set(true);
      const customer = await this.customerService.getCustomer(id);
      this.customerForm.patchValue(customer);
    } catch (err) {
      this.error.set('Failed to load customer');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onSubmit() {
    if (this.customerForm.invalid) return;

    try {
      this.isLoading.set(true);
      this.error.set(null);

      if (this.isEditMode()) {
        await this.customerService.updateCustomer(
          this.route.snapshot.params['id'],
          this.customerForm.value as Partial<Customer>
        );
      } else {
        await this.customerService.createCustomer(
          this.customerForm.value as Omit<Customer, 'id'>
        );
      }

      this.router.navigate(['/admin/customers']);
    } catch (err) {
      this.error.set('Failed to save customer');
    } finally {
      this.isLoading.set(false);
    }
  }
} 