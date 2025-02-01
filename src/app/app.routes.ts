import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.component';
import { MovieDetailPage } from './pages/movie-detail/movie-detail.component';
import { MovieListPage } from './pages/movie-list/movie-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    // loadComponent: () =>
    //   import('./pages/home/home.component').then((m) => m.HomePage),
  },
  {
    path: 'movie',
    component: MovieListPage,
  },
  {
    path: 'movie/:movieId',
    component: MovieDetailPage,
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
