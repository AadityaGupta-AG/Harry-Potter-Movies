import { Component, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../helpers/duration.pipe';
import { MillionsPipe } from '../helpers/millions.pipe';
import { MovieDetail, MovieService } from '../helpers/movie.service';

@Component({
  standalone: true,
  imports: [CommonModule, DurationPipe, MillionsPipe],
  providers: [MovieService],
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  movieDetails: WritableSignal<MovieDetail | null> = signal(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {
    this.init();
  }

  init() {
    const movieId: string | null = this.route.snapshot.paramMap.get('movieId');

    if(!movieId) return;

    this.movieService.getMovieDetails(movieId)
      .subscribe((res: MovieDetail) => {
        this.movieDetails?.set(res);
      })
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
