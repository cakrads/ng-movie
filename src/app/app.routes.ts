import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    // loadComponent: () =>
    //   import('./pages/home/home.component').then((m) => m.HomePage),
  },
  // {
  //   path: '404',
  //   loadComponent: () =>
  //     import('./core/components/not-found/not-found.component').then(
  //       (m) => m.NotFoundComponent,
  //     ),
  // },
  { path: '**', redirectTo: '404' },
];
