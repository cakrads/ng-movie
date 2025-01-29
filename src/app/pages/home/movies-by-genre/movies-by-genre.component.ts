import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hlmH3, } from '@components/ui/ui-typography-helm/src';
import { TmdbService, IGenreData, IMovieListData } from '@app/services/tmbd/tmdb.service';
import { MovieCarouselComponent } from '@components/fragment/movie-carousel/movie-carousel.component';

@Component({
  selector: 'app-movies-by-genre',
  templateUrl: './movies-by-genre.component.html',
  styleUrls: ['./movies-by-genre.component.css'],
  imports: [
    CommonModule,

    MovieCarouselComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesByGenreComponent implements OnInit {
  hlmH3 = hlmH3;
  loadingSkeleton = Array.from({ length: 10 }, (_, i) => i + 1);

  genres: IGenreData[] = [];
  moviesByGenresData: { [genreId: number]: { loading: boolean; movies: IMovieListData[] } } = {};
  movieIttrator = []

  constructor(readonly tmdbService: TmdbService) { }

  ngOnInit() {
    this.getMovieCategorizeByGenre();
  }

  getMovieCategorizeByGenre(): void {
    this.tmdbService.getGenreList().subscribe({
      next: (response) => {
        // first create the template and skeleton for each genre
        response.genres.forEach((genre) => {
          this.moviesByGenresData[genre.id] = { loading: true, movies: [] };
        });
        // apply the genre data to the component, so the component will start loop 
        // this will minimize the error when this.moviesByGenresData[genre.id] is not defined
        this.genres = response.genres;

        // then, fetch the movies for each genre
        response.genres.forEach((genre) => {
          this.getMovieByGenre(genre.id);
        });
      },
      error: (err) => console.error('Error fetching genres:', err),
    });
  }

  private getMovieByGenre(genreId: number): void {
    this.tmdbService.getDiscoverMovies({ with_genres: genreId }).subscribe({
      next: (response) => {
        this.moviesByGenresData[genreId] = { loading: false, movies: response.results.slice(0, 10) };
      },
      error: (err) => console.error('Error fetching movies by genre:', err),
    });
  }
}
