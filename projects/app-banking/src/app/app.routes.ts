import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'transactions',
    loadComponent: () => import('@banking/feature-transactions').then(
      module => module.TransactionsPageComponent
    )
  },
  {
    path: '',
    redirectTo: 'transactions',
    pathMatch: 'full'
  },
];
