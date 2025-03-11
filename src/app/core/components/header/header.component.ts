// header.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { ClickOutsideDirective } from '../../Directives/clickOutside.directive';
import {MobileService} from '../../services/mobile.service';
import {AutoAnimationDirective} from '../../Directives/auto-Animate.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ClickOutsideDirective, AutoAnimationDirective],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  protected themeService = inject(ThemeService);
  private authService = inject(AuthService);
  protected mobileService = inject(MobileService);


  currentUser = this.authService.currentUser;

  showProfileMenu = signal(false);
  showNotifications = signal(false);

  isMobileMenuOpen = this.mobileService.isMobileMenuOpen;


  toggleMobileMenu() {
    this.mobileService.isMobileMenuOpen.update(value => !value);
  }

  // Close mobile menu when navigating
  closeMobileMenu() {
    this.mobileService.isMobileMenuOpen.set(false);
  }



  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleProfileMenu() {
    this.showProfileMenu.update(v => !v);
    if (this.showProfileMenu()) {
      this.showNotifications.set(false);
    }
  }

  toggleNotifications() {
    this.showNotifications.update(v => !v);
    if (this.showNotifications()) {
      this.showProfileMenu.set(false);
    }
  }

  async logout() {
    await this.authService.logout();
  }
}
