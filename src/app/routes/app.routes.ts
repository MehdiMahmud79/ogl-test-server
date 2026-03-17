import { Routes } from '@angular/router';
import { Products } from '../componenets/products/products';
export const routes: Routes = [
  {
    path: 'products',
    component: Products
  },
  // {
  //   path: 'customers',
  //   loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  // },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];
