import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.isDarkMode;
  
  toggleTheme() {
    this.themeService.toggleTheme();
  }
} 