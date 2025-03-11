import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AppwriteService } from '../services/appwrite.service';

export const RoleGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const appwrite = inject(AppwriteService);
  const requiredRoles = route.data?.['roles'] as string[];

  try {
    const user = await appwrite.getCurrentUser();
    // Assuming user roles are stored in user.labels or similar
    const userRoles = user?.labels || [];

    if (requiredRoles.some(role => userRoles.includes(role))) {
      return true;
    }

    router.navigate(['/sales/pos']); // Redirect to sales sales-dashboard if not admin
    return false;
  } catch (error) {
    router.navigate(['/auth/login']);
    return false;
  }
};
