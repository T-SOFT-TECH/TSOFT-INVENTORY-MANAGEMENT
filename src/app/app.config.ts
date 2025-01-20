import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideHttpClient } from '@angular/common/http';
import {ThemeService} from './core/services/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideHotToastConfig(),
    provideAnimations(),
    provideHttpClient(),
    ThemeService


  ]
};
