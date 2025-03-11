import {ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ThemeService} from './core/services/theme.service';
import {provideQuillConfig} from 'ngx-quill';
import {LoadingInterceptor} from './core/services/http-loading.interceptor';

import '@preline/select';


export const appConfig: ApplicationConfig = {
  providers: [

    provideRouter(routes, withViewTransitions()),
    provideHotToastConfig(),
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    provideHttpClient(withInterceptors([LoadingInterceptor])),
    ThemeService,
    provideQuillConfig({
      modules: {
        syntax: true,
        toolbar: true,
      }
    }),



  ]
};
