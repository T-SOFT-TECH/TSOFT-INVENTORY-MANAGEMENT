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
        path: 'sales-dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'pos',
        loadComponent: () => import('./features/sales/pos/pos.component')
          .then(m => m.PosComponent)
      },

      {
        path: 'sales-history',
        loadComponent: () => import('./features/sales/history/sales-history.component')
          .then(m => m.SalesHistoryComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/analytics/sales-analytics/sales-analytics.component')
          .then(m => m.SalesAnalyticsComponent)
      },
      {
        path: 'inventory-status',
        loadComponent: () => import('./features/analytics/inventory-status/inventory-status.component')
          .then(m => m.InventoryStatusComponent)
      },
      {
        path: 'customer-insights',
        loadComponent: () => import('./features/analytics/customer-insights/customer-insights.component')
          .then(m => m.CustomerInsightsComponent)
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
            path: 'stock',
            children: [
              {
                path: '',
                redirectTo: 'history',
                pathMatch: 'full'
              },
              {
                path: 'new',
                loadComponent: () => import('./features/admin/stock/stock-entry/stock-entry.component')
                  .then(m => m.StockEntryComponent)
              },
              {
                path: 'history',
                loadComponent: () => import('./features/admin/stock/stock-history/stock-history.component')
                  .then(m => m.StockHistoryComponent)
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
