// settings.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService } from '../../../core/services/settings.service';
import { SeedService } from '../../../core/services/seed.service';
import { ThemeService } from '../../../core/services/theme.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { LoadingService } from '../../../core/services/loading.service';
import { MatTabsModule } from '@angular/material/tabs';
import {Settings} from '../../../core/interfaces/settings/settings.interfaces';
import {AutoAnimationDirective} from '../../../core/Directives/auto-Animate.directive';

interface SettingsTab {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    AutoAnimationDirective
  ],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private settingsService = inject(SettingsService);
  private seedService = inject(SeedService);
  private themeService = inject(ThemeService);
  private toast = inject(HotToastService);
  private loadingService = inject(LoadingService);

  isLoading = signal(false);
  activeTab = signal<string>('system');
  seedProgress = this.seedService.seedProgress;


  tabs: SettingsTab[] = [
    { id: 'system', label: 'System', icon: 'settings' },
    { id: 'company', label: 'Company', icon: 'business' },
    { id: 'invoice', label: 'Invoice', icon: 'receipt' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'integration', label: 'Integrations', icon: 'sync_alt' },
    { id: 'backup', label: 'Backup & Data', icon: 'cloud_download' }
  ];

  // Creating form groups for each section
  systemForm = this.fb.group({
    dateFormat: ['MM/DD/YYYY', Validators.required],
    timezone: ['UTC', Validators.required],
    language: ['en', Validators.required],
    theme: ['system', Validators.required]
  });

  companyForm = this.fb.group({
    companyName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    website: [''],
    taxId: [''],
    logo: ['']
  });

  invoiceForm = this.fb.group({
    invoicePrefix: ['INV-', Validators.required],
    nextInvoiceNumber: [1000, [Validators.required, Validators.min(1)]],
    termsAndConditions: [''],
    notes: [''],
    taxRate: [0,[Validators.required, Validators.min(0), Validators.max(100)]],
    currency: ['USD', Validators.required],
    dateFormat: ['MM/DD/YYYY', Validators.required]
  });

  notificationForm = this.fb.group({
    lowStockThreshold: [10, [Validators.required, Validators.min(1)]],
    emailNotifications: [true],
    salesAlerts: [true],
    inventoryAlerts: [true]
  });

  currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' }
  ];

  timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
    { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
    { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
    { value: 'America/Anchorage', label: 'Alaska (US)' },
    { value: 'Pacific/Honolulu', label: 'Hawaii (US)' },
    { value: 'Europe/London', label: 'London, Edinburgh (GMT)' },
    { value: 'Europe/Paris', label: 'Paris, Berlin, Rome (Central European Time)' },
    { value: 'Asia/Tokyo', label: 'Tokyo, Osaka (Japan Standard Time)' },
    { value: 'Asia/Shanghai', label: 'Beijing, Shanghai (China Standard Time)' },
    { value: 'Asia/Kolkata', label: 'Mumbai, Delhi (India Standard Time)' },
    { value: 'Australia/Sydney', label: 'Sydney, Melbourne (Australian Eastern Time)' }
  ];

  dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (Europe/UK)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' }
  ];

  languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' }
  ];

  ngOnInit() {
    this.loadSettings();
  }

  private async loadSettings() {
    try {
      this.isLoading.set(true);
      this.loadingService.start('Loading settings...');

      const settings = await this.settingsService.getSettings();

      this.systemForm.patchValue(settings.system);
      this.companyForm.patchValue(settings.company);
      this.invoiceForm.patchValue(settings.invoice);
      this.notificationForm.patchValue(settings.notifications);

    } catch (error) {
      this.toast.error('Failed to load settings');
      console.error('Settings load error:', error);
    } finally {
      this.isLoading.set(false);
      this.loadingService.clear();
    }
  }

  setActiveTab(tabId: string) {
    this.activeTab.set(tabId);
  }

  async saveSystemSettings() {
    await this.saveSettings('system', this.systemForm);

    // Update theme if it was changed
    const themeValue = this.systemForm.get('theme')?.value;
    if (themeValue === 'light' || themeValue === 'dark') {
      this.themeService.setTheme(themeValue);
    } else if (themeValue === 'system') {
      this.themeService.setSystemTheme();
    }
  }

  async saveCompanySettings() {
    await this.saveSettings('company', this.companyForm);
  }

  async saveInvoiceSettings() {
    await this.saveSettings('invoice', this.invoiceForm);
  }

  async saveNotificationSettings() {
    await this.saveSettings('notifications', this.notificationForm);
  }

  private async saveSettings(section: string, form: any) {
    if (form.invalid) {
      this.toast.error('Please correct the errors in the form');
      return;
    }

    try {
      this.isLoading.set(true);
      this.loadingService.start(`Saving ${section} settings...`);

      await this.settingsService.updateSettings(section, form.value);
      this.toast.success('Settings updated successfully');

    } catch (error) {
      this.toast.error(`Failed to save ${section} settings`);
      console.error('Settings save error:', error);
    } finally {
      this.isLoading.set(false);
      this.loadingService.clear();
    }
  }

  async uploadLogo(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      this.isLoading.set(true);
      this.loadingService.start('Uploading logo...');

      const logoUrl = await this.settingsService.uploadLogo(file);
      this.companyForm.patchValue({ logo: logoUrl });
      this.toast.success('Logo uploaded successfully');

    } catch (error) {
      this.toast.error('Failed to upload logo');
      console.error('Logo upload error:', error);
    } finally {
      this.isLoading.set(false);
      this.loadingService.clear();
    }
  }

  async seedCategories() {
    if (confirm('This will initialize default product categories. Continue?')) {
      try {
        this.loadingService.start('Initializing categories...');
        await this.seedService.seedCategories();
      } finally {
        this.loadingService.clear();
      }
    }
  }

  getProgressPercentage(): number {
    return this.seedService.getProgressPercentage();
  }

  backupData() {
    this.toast.info('Backup functionality not implemented yet');
  }

  restoreData() {
    this.toast.info('Restore functionality not implemented yet');
  }

  resetSettings() {
    if (confirm('This will reset all settings to default values. This action cannot be undone. Continue?')) {
      this.toast.info('Reset functionality not implemented yet');
    }
  }
}
