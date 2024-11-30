import { Component, WritableSignal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DurationPipe } from '../helpers/duration.pipe';
import { MillionsPipe } from '../helpers/millions.pipe';
import { Movie, MovieService } from '../helpers/movie.service';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, DurationPipe, MillionsPipe],
  providers: [MovieService],
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent {
  public movieList: WritableSignal<Movie[]> = signal([]);
  public searchTitle: WritableSignal<string> = signal('');
  public searchYear: WritableSignal<string> = signal('');

  constructor(
    private router: Router,
    private movieService: MovieService
  ) {
    this.init();
  }

  filteredMovies = computed(() => {
    const titleFilter = this.searchTitle().toLowerCase();
    const yearFilter = +this.searchYear();
    return this.movieList().filter((movie: Movie) => {
      const matchesTitle = movie.title.toLowerCase().includes(titleFilter);
      const releaseYear = movie.release_date.split('-')[0];
      const matchesYear = yearFilter < 1000 || +releaseYear === yearFilter;
      return matchesTitle && matchesYear;
    });
  });

  init() {
    this.movieService.getAllMovies()
      .subscribe((res: Movie[]) => {
        this.movieList.set(res);
      })
  }

  onDetails(id: string) {
    this.router.navigate(['movies', id]);
  }
}
