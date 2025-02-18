// sidebar.component.ts
import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';

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

  isMobileMenuOpen = signal(false);
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  staffMenu: MenuSection[] = [
    {
      title: 'SALES',
      items: [
        { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
        { label: 'POS', icon: 'point_of_sale', route: '/sales' },
        { label: 'Sales History', icon: 'receipt_long', route: '/sales/history' },

      ]
    },
    {
      title: 'REPORTS',
      items: [
        { label: 'Analytics', icon: 'analytics', route: '/sales/analytics' },
        { label: 'Sales Report', icon: 'assessment', route: '/reports/sales' },
        { label: 'Inventory Report', icon: 'inventory', route: '/reports/inventory' }
      ]
    }
  ];

  // Admin Menu Items (Only shown to users with admin role)
  adminMenu: MenuSection[] = [
    {
      title: 'ADMINISTRATION',
      items: [
        { label: 'Stock', icon: 'dashboard', route: '/admin/stock' },
        { label: 'Products', icon: 'inventory_2', route: '/admin/products' },
        { label: 'Categories', icon: 'category', route: '/admin/categories' },
        { label: 'Brands', icon: 'business', route: '/admin/brands' },
        { label: 'Customers', icon: 'people', route: '/admin/customers' },
        { label: 'Settings', icon: 'settings', route: '/admin/settings' }
      ]
    }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  // Close mobile menu when navigating
  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  isAdmin() {
    return this.currentUser()?.labels?.includes('admin');
  }
}
