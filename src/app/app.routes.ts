import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'sales',
        children: [
          {
            path: '',
            redirectTo: 'pos',
            pathMatch: 'full'
          },
          {
            path: 'pos',
            loadComponent: () => import('./features/sales/pos/pos.component')
              .then(m => m.PosComponent)
          },
          {
            path: 'history',
            loadComponent: () => import('./features/sales/history/sales-history.component')
              .then(m => m.SalesHistoryComponent)
          },
          {
            path: 'analytics',
            loadComponent: () => import('./features/sales/dashboard/sales-dashboard.component')
              .then(m => m.SalesDashboardComponent)
          }
        ]
      },
      {
        path: 'admin',
        canActivate: [adminGuard],
        children: [
          {
            path: 'customers',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/admin/customers/customer-list/customer-list.component')
                  .then(m => m.CustomerListComponent)
              },
              {
                path: 'new',
                loadComponent: () => import('./features/admin/customers/customer-form/customer-form.component')
                  .then(m => m.CustomerFormComponent)
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/admin/customers/customer-form/customer-form.component')
                  .then(m => m.CustomerFormComponent)
              }
            ]
          },
          {
            path: 'products',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/admin/products/product-list/product-list.component')
                  .then(m => m.ProductListComponent)
              },
              {
                path: 'new',
                loadComponent: () => import('./features/admin/products/product-form/product-form.component')
                  .then(m => m.ProductFormComponent)
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/admin/products/product-form/product-form.component')
                  .then(m => m.ProductFormComponent)
              }
            ]
          },
          {
            path: 'settings',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/admin/settings/settings.component')
                  .then(m => m.SettingsComponent)
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component')
          .then(m => m.LoginComponent)
      }
    ]
  }
];