import { CommonModule, NgClass } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IListOptions, IMovieListData, IParamsList, TmdbService } from '@app/services/tmbd/tmdb.service';
import { hlmH2 } from '@app/shared/components/ui/ui-typography-helm/src';
import { MovieCardComponent } from "../../shared/components/fragment/movie-card/movie-card.component";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  imports: [CommonModule, NgClass, MovieCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieListPage implements OnInit {
  hlmH2 = hlmH2;
  loadingSkeleton = Array.from({ length: 10 }, (_, i) => i + 1);

  loading = true;
  movieList: IMovieListData[] = [];
  totalPages = 1;

  // Sorting & Genre Options
  listOptions: IListOptions = { sortBy: [], genres: [] };

  // State for API params
  params: IParamsList = {
    page: 1,
    query: '',
    sort_by: 'popularity.desc',
    with_genres: undefined,
  };

  constructor(readonly tmdbService: TmdbService) { }

  ngOnInit() {
    this.getMovieList();
    this.loadListOptions();
  }

  private loadListOptions(): void {
    this.tmdbService.getDiscoverSortByOptions().subscribe((options) => {
      this.listOptions = options;
    });
  }

  private getMovieList(): void {
    this.loading = this.params.page === 1;
    this.tmdbService.getDiscoverMovies(this.params).subscribe({
      next: (response) => {
        if (this.params.page === 1) {
          this.movieList = response.results;
        } else {
          this.movieList = this.movieList.concat(response.results);
        }
        this.totalPages = response.total_pages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        this.loading = false;
      },
    });
  }

  // Handle pagination
  handlePage(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.params.page = newPage;
    this.getMovieList();
  }

  // Handle search input
  handleSearch(query: string): void {
    if (!query.trim()) return; // Prevent empty search requests
    this.params.query = query;
    this.params.page = 1; // Reset to first page when searching
    this.getMovieList();
  }

  // Handle sorting change
  handleSortBy(e: Event): void {
    if (e.target instanceof HTMLSelectElement) {
      const sortBy = e.target.value as IParamsList['sort_by'];
      if (!sortBy) return; // Prevent unnecessary calls
      this.params.sort_by = sortBy;
      this.getMovieList();
    }
  }

  // Handle genre selection
  handleGenre(e: Event): void {
    if (e.target instanceof HTMLSelectElement) {
      const genreId = e.target.value;
      if (!genreId) return; // Prevent unnecessary calls
      this.params.with_genres = +genreId;
      this.getMovieList();
    }
  }
}
