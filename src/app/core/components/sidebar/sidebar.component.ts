// sidebar.component.ts
import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MobileService} from '../../services/mobile.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  private authService = inject(AuthService);
  protected mobileService = inject(MobileService);
  currentUser = this.authService.currentUser;

  staffMenu: MenuSection[] = [
    {
      title: 'SALES',
      items: [
        { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
        { label: 'POS', icon: 'point_of_sale', route: '/pos' },
        { label: 'Sales History', icon: 'receipt_long', route: '/sales-history' },

      ]
    },
    {
      title: 'ANALYTICS & REPORTS',
      items: [
        { label: 'Sales Analytics', icon: 'analytics', route: '/analytics' },
        { label: 'Inventory Status', icon: 'inventory', route: '/inventory-status' },
        { label: 'Customer Insights', icon: 'people_alt', route: '/customer-insights' }
      ]
    }
  ];

  // Admin Menu Items (Only shown to users with admin role)
  adminMenu: MenuSection[] = [
    {
      title: 'ADMINISTRATION',
      items: [
        { label: 'Stock', icon: 'inventory', route: '/admin/stock' },
        { label: 'Products', icon: 'inventory_2', route: '/admin/products' },
        { label: 'Categories', icon: 'category', route: '/admin/categories' },
        { label: 'Brands', icon: 'business', route: '/admin/brands' },
        { label: 'Customers', icon: 'people', route: '/admin/customers' },
        { label: 'Settings', icon: 'settings', route: '/admin/settings' }
      ]
    }
  ];


  isAdmin() {
    return this.currentUser()?.labels?.includes('admin');
  }
}
