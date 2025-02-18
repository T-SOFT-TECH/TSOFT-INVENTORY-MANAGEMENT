import {inject} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './loading.service';


export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.start();

  return next(req).pipe(
    finalize(() => {
      loadingService.end();
    })
  );
};
