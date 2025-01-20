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
            path: 'categories',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/admin/categories/category-list/category-list.component')
                  .then(m => m.CategoryListComponent)
              },
              {
                path: 'new',
                loadComponent: () => import('./features/admin/categories/category-form/category-form.component')
                  .then(m => m.CategoryFormComponent)
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/admin/categories/category-form/category-form.component')
                  .then(m => m.CategoryFormComponent)
              }
            ]
          },
          {
            path: 'brands',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/admin/brands/brand-list/brand-list.component')
                  .then(m => m.BrandListComponent)
              },
              {
                path: 'new',
                loadComponent: () => import('./features/admin/brands/brand-form/brand-form.component')
                  .then(m => m.BrandFormComponent)
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/admin/brands/brand-form/brand-form.component')
                  .then(m => m.BrandFormComponent)
              },
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
