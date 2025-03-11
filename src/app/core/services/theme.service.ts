import { Injectable, signal, effect, OnDestroy } from '@angular/core';

type ThemeType = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  private darkMode = signal<boolean>(this.isDarkModePreferred());
  private themeMode = signal<ThemeType>(this.getSavedThemeMode());
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;

  constructor() {
    // Initialize theme on service creation
    this.updateDocumentClass();

    // Set up system theme change listener if using system preference
    if (this.themeMode() === 'system') {
      this.setupSystemThemeListener();
    }

    // Create an effect to handle theme changes
    effect(() => {
      const isDark = this.darkMode();
      const themeMode = this.themeMode();

      // Update localStorage with current settings
      localStorage.setItem('darkMode', isDark.toString());
      localStorage.setItem('themeMode', themeMode);

      // Update the document class
      this.updateDocumentClass();
    });
  }

  ngOnDestroy() {
    this.removeSystemThemeListener();
  }

  /**
   * Returns a readonly signal indicating if dark mode is active
   */
  isDarkMode() {
    return this.darkMode();
  }

  /**
   * Returns the current theme mode (light, dark, or system)
   */
  getThemeMode(): ThemeType {
    return this.themeMode();
  }

  /**
   * Toggle between light and dark theme
   */
  toggleTheme() {
    this.darkMode.update(current => !current);

    // If manually toggling, set to specific theme rather than system
    this.themeMode.set(this.darkMode() ? 'dark' : 'light');

    // Remove system theme listener when manually setting theme
    this.removeSystemThemeListener();
  }

  /**
   * Set a specific theme
   * @param theme The theme to set ('light' or 'dark')
   */
  setTheme(theme: 'light' | 'dark') {
    // Update both signals
    this.darkMode.set(theme === 'dark');
    this.themeMode.set(theme);

    // Remove system theme listener when manually setting theme
    this.removeSystemThemeListener();
  }

  /**
   * Set the theme to follow system preference
   */
  setSystemTheme() {
    this.themeMode.set('system');
    this.darkMode.set(this.mediaQuery.matches);
    this.setupSystemThemeListener();
  }

  /**
   * Initialize theme based on saved preference or system setting
   */
  initializeTheme() {
    const themeMode = this.getSavedThemeMode();

    if (themeMode === 'system') {
      this.setSystemTheme();
    } else {
      this.setTheme(themeMode);
    }
  }

  private getSavedThemeMode(): ThemeType {
    const savedThemeMode = localStorage.getItem('themeMode');
    if (savedThemeMode === 'light' || savedThemeMode === 'dark' || savedThemeMode === 'system') {
      return savedThemeMode;
    }
    return 'system'; // Default to system if no preference saved
  }

  private isDarkModePreferred(): boolean {
    const savedThemeMode = this.getSavedThemeMode();

    if (savedThemeMode === 'light') return false;
    if (savedThemeMode === 'dark') return true;

    // If system preference, check media query
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private updateDocumentClass() {
    if (this.darkMode()) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }

  private setupSystemThemeListener() {
    // Remove any existing listener first
    this.removeSystemThemeListener();

    // Create and add new listener
    this.mediaQueryListener = (e: MediaQueryListEvent) => {
      this.darkMode.set(e.matches);
    };

    this.mediaQuery.addEventListener('change', this.mediaQueryListener);
  }

  private removeSystemThemeListener() {
    if (this.mediaQueryListener) {
      this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
      this.mediaQueryListener = null;
    }
  }
}
