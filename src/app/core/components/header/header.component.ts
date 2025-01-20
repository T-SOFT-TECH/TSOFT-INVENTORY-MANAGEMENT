// header.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { ClickOutsideDirective } from '../../Directives/clickOutside.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink,  ClickOutsideDirective],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);

  isDarkMode = this.themeService.isDarkMode;
  currentUser = this.authService.currentUser;

  showProfileMenu = signal(false);
  showNotifications = signal(false);

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
