import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { AppwriteService } from '../services/appwrite.service';

export const noAuthGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const appwrite = inject(AppwriteService);

  return from(appwrite.account.get()).pipe(
    map(() => router.createUrlTree(['/sales-dashboard'])),
    catchError(() => of(true))
  );
};
