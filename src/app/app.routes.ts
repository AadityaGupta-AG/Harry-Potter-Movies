import { Routes } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'movies/:movieId', component: MovieDetailComponent },
  { path: '**', redirectTo: '' }
];
