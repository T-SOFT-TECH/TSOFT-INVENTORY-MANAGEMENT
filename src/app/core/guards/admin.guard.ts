import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AppwriteService } from '../services/appwrite.service';

export const adminGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const appwrite = inject(AppwriteService);

  try {
    const user = await appwrite.getCurrentUser();
    // Assuming roles are stored in user labels/data
    const isAdmin = user?.labels?.includes('admin') || false;
    
    if (isAdmin) {
      return true;
    }
    
    router.navigate(['/sales/pos']);
    return false;
  } catch {
    router.navigate(['/auth/login']);
    return false;
  }
}; 