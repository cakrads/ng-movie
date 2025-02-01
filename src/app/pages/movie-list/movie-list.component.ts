import { CommonModule, NgClass } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IMovieListData, TmdbService } from '@app/services/tmbd/tmdb.service';
import { hlmH3 } from '@app/shared/components/ui/ui-typography-helm/src';
import { MovieCardComponent } from "../../shared/components/fragment/movie-card/movie-card.component";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  imports: [CommonModule, NgClass, MovieCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieListPage implements OnInit {
  hlmH3 = hlmH3;
  loadingSkeleton = Array.from({ length: 10 }, (_, i) => i + 1);

  loading = true;
  movieList: IMovieListData[] = [];

  constructor(readonly tmdbService: TmdbService) { }

  ngOnInit() {
    this.getMovieList();
  }

  private getMovieList(): void {
    this.tmdbService.getDiscoverMovies({}).subscribe({
      next: (response) => {
        this.movieList = response.results;
        this.loading = false;
      },
      error: (err) => console.error('Error fetching movies by genre:', err),
    });
  }
}
