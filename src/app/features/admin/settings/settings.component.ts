import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService, Settings } from '../../../core/services/settings.service';

type ThemeType = 'light' | 'dark';

interface SettingsTab {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  private fb = inject(FormBuilder);
  private settingsService = inject(SettingsService);

  isLoading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  activeTab = signal<string>('general');

  tabs: SettingsTab[] = [
    { id: 'general', label: 'General Settings', icon: 'settings' },
    { id: 'company', label: 'Company Information', icon: 'business' },
    { id: 'invoice', label: 'Invoice Settings', icon: 'receipt' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'users', label: 'User Management', icon: 'people' }
  ];

  generalForm = this.fb.nonNullable.group({
    storeName: ['', Validators.required],
    currency: ['USD', Validators.required],
    timezone: ['UTC', Validators.required],
    dateFormat: ['MM/DD/YYYY', Validators.required],
    theme: ['light' as ThemeType, Validators.required]
  });

  companyForm = this.fb.nonNullable.group({
    companyName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    website: [''],
    taxId: ['']
  });

  invoiceForm = this.fb.nonNullable.group({
    invoicePrefix: ['INV-', Validators.required],
    nextInvoiceNumber: [1000, Validators.required],
    termsAndConditions: [''],
    taxRate: [10, [Validators.required, Validators.min(0), Validators.max(100)]],
    showLogo: [true],
    logoUrl: ['']
  });

  notificationForm = this.fb.nonNullable.group({
    emailNotifications: [true],
    lowStockAlerts: [true],
    lowStockThreshold: [10],
    orderConfirmations: [true],
    paymentReminders: [true]
  });

  constructor() {
    this.loadSettings();
  }

  private async loadSettings() {
    try {
      this.isLoading.set(true);
      const settings = await this.settingsService.getSettings();
      
      // Type-safe form updates
      this.generalForm.patchValue({
        storeName: settings.general.storeName,
        currency: settings.general.currency,
        timezone: settings.general.timezone,
        dateFormat: settings.general.dateFormat,
        theme: settings.general.theme
      });

      this.companyForm.patchValue(settings.company);
      this.invoiceForm.patchValue(settings.invoice);
      this.notificationForm.patchValue(settings.notifications);
    } catch (err) {
      this.error.set('Failed to load settings');
    } finally {
      this.isLoading.set(false);
    }
  }

  async saveSettings(formType: keyof Settings) {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      let formData: Partial<Settings[keyof Settings]>;
      switch (formType) {
        case 'general':
          formData = this.generalForm.getRawValue();
          break;
        case 'company':
          formData = this.companyForm.getRawValue();
          break;
        case 'invoice':
          formData = this.invoiceForm.getRawValue();
          break;
        case 'notifications':
          formData = this.notificationForm.getRawValue();
          break;
        default:
          throw new Error('Invalid form type');
      }

      await this.settingsService.updateSettings(formType, formData);
      this.success.set('Settings saved successfully');
      
      setTimeout(() => this.success.set(null), 3000);
    } catch (err) {
      this.error.set('Failed to save settings');
    } finally {
      this.isLoading.set(false);
    }
  }

  setActiveTab(tabId: string) {
    this.activeTab.set(tabId);
  }

  async uploadLogo(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      this.isLoading.set(true);
      const logoUrl = await this.settingsService.uploadLogo(file);
      this.invoiceForm.patchValue({ logoUrl });
    } catch (err) {
      this.error.set('Failed to upload logo');
    } finally {
      this.isLoading.set(false);
    }
  }
} 