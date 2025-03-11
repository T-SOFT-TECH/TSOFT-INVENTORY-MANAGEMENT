import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerService } from '../../../../core/services/customer.service';
import {Customer, CustomerAddress} from '../../../../core/interfaces/customer/customer.interfaces';
import { LoadingService } from '../../../../core/services/loading.service';
import { AppwriteService } from '../../../../core/services/appwrite.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { AutoAnimationDirective } from '../../../../core/Directives/auto-Animate.directive';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AutoAnimationDirective
  ],
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private loadingService = inject(LoadingService);
  private appwriteService = inject(AppwriteService);
  private toast = inject(HotToastService);

  isLoading = signal(false);
  error = signal<string | null>(null);
  isEditMode = signal(false);
  activeSection = signal<string>('basic');

  customerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    notes: [''],
    status: ['active']
  });

  ngOnInit() {

    const formValues = this.customerForm.value as Customer;
    const customerData: Record<string, any> = {};

    const customerId = this.route.snapshot.params['id'];
    if (customerId) {
      this.isEditMode.set(true);
      this.loadCustomer(customerId);
    }
  }

  private async loadCustomer(id: string) {
    try {
      this.isLoading.set(true);
      this.loadingService.start('Loading customer details...');

      const customer = await this.customerService.getCustomer(id);
      this.customerForm.patchValue(customer);
    } catch (error) {
      this.error.set('Failed to load customer');
      this.toast.error('Unable to load customer details');
    } finally {
      this.isLoading.set(false);
      this.loadingService.clear();
    }
  }

  async onSubmit() {
    if (this.customerForm.invalid) {
      this.markFormGroupTouched(this.customerForm);
      this.toast.error('Please correct the errors in the form');
      return;
    }

    try {
      this.isLoading.set(true);
      this.error.set(null);

      const actionMsg = this.isEditMode() ? 'Updating' : 'Creating new';
      this.loadingService.start(`${actionMsg} customer...`);

      // Fix: Properly type the form values
      const formValues = this.customerForm.value as Record<string, any>;

      // Create clean object with only non-empty values
      const customerData: Record<string, any> = {};

      // Process each field to remove empty values
      Object.keys(formValues).forEach(key => {
        const value = formValues[key]; // Now this access is typed correctly
        if (value !== null && value !== undefined && value !== '') {
          customerData[key] = value;
        }
      });

      // Rest of your code remains the same
      if (!customerData['status']) {
        customerData['status'] = 'active';
      }

      if (customerData['address']) {
        customerData['addresses'] = [
          {
            street: customerData['address'],
            isDefault: true
          }
        ];
        delete customerData['address'];
      }

      if (this.isEditMode()) {
        customerData['customerId'] = this.route.snapshot.params['id'];
      }

      const functionId = this.isEditMode() ? 'customer-update' : 'customer-creation';
      const execution = await this.appwriteService.functions.createExecution(
        functionId,
        JSON.stringify(customerData)
      );

      const result = JSON.parse(execution.responseBody);
      if (result.error) {
        throw new Error(result.error);
      }

      this.toast.success(this.isEditMode() ? 'Customer updated successfully' : 'Customer created successfully');
      this.router.navigate(['/admin/customers']);
    } catch (error) {
      // Error handling remains the same
      console.error(`Error ${this.isEditMode() ? 'updating' : 'creating'} customer:`, error);
      this.toast.error(`Failed to ${this.isEditMode() ? 'update' : 'create'} customer`);

      if (error instanceof Error) {
        this.error.set(error.message);
      } else {
        this.error.set(`Failed to ${this.isEditMode() ? 'update' : 'create'} customer`);
      }
    } finally {
      this.isLoading.set(false);
      this.loadingService.clear();
    }
  }

  setActiveSection(section: string) {
    this.activeSection.set(section);
  }

  // Helper to mark all form controls as touched for validation display
  private markFormGroupTouched(formGroup: any) {
    Object.values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isInvalidField(fieldName: string): boolean {
    const control = this.customerForm.get(fieldName);
    return !!control && control.invalid && control.touched;
  }
}
