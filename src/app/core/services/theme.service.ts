
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = signal<boolean>(this.isDarkModePreferred());

  isDarkMode() {
    return this.darkMode;
  }

  toggleTheme() {
    this.darkMode.update(current => !current);
    this.updateDocumentClass();
    localStorage.setItem('darkMode', this.darkMode().toString());
  }

  private isDarkModePreferred(): boolean {
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private updateDocumentClass() {
    if (this.darkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
