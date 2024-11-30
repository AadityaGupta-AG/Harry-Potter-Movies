import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: string;
  title: string;
  budget: string;
  duration: string;
  release_date: string;
  summary: string;
}

export interface MovieDetail {
  id: string;
  title: string;
  duration: string;
  budget: string;
  release_date: string;
  box_office: string;
  cinematographers: string[];
  poster: string;
  producers: string[];
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl: string = '';

  constructor(private http: HttpClient) { }

  getMovieDetails(movieId: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.apiUrl}/movies/${movieId}`);
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }
}
