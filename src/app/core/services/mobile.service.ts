import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  // Signal to track the mobile menu state
  isMobileMenuOpen = signal<boolean>(false);

  constructor() {}

  // Toggle mobile menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(value => !value);
  }

  // Close mobile menu
  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  // Open mobile menu
  openMobileMenu(): void {
    this.isMobileMenuOpen.set(true);
  }
}
