import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmH1, hlmH3, hlmP } from '@components//ui/ui-typography-helm/src';
import { TmdbService, IMovieListData } from '@app/services/tmbd/tmdb.service';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { MovieCarouselComponent } from '@components/fragment/movie-carousel/movie-carousel.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HlmScrollAreaDirective } from '@app/shared/components/ui/ui-scrollarea-helm/src';
import { ImageComponent } from '@components/ui/image/image.component';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    CommonModule,
    HlmTabsComponent,
    HlmButtonDirective,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmScrollAreaDirective,
    NgScrollbarModule,
    ImageComponent,

    MovieCarouselComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  hlmH1 = hlmH1;
  hlmH3 = hlmH3;
  hlmP = hlmP;
  maxData = 10;
  ImagePath = '/assets/images/cover.jpg';

  tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  trackByFn(index: number): number {
    return index;
  }

  trendingMoviesDay = {
    loading: true,
    data: [] as IMovieListData[],
  };
  trendingMoviesWeek = {
    loading: true,
    data: [] as IMovieListData[],
  };
  popularMovies = {
    loading: true,
    data: [] as IMovieListData[],
  };
  popularTv = {
    loading: true,
    data: [] as IMovieListData[],
  };

  constructor(readonly tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.getTrendingMovieDay().subscribe({
      next: (response) => {
        this.trendingMoviesDay = {
          loading: false,
          data: response.results.slice(0, this.maxData),
        };
        // get popular after trending day
        this.getTPopularMovie();
      },
      error: () => {},
    });
  }

  _handleTrendingWeek() {
    if (!this.trendingMoviesWeek.data.length) {
      this.getTrendingMovieWeek();
    }
  }

  _handlePopularTv() {
    if (!this.popularTv.data.length) {
      this.getTPopularTv();
    }
  }

  getTrendingMovieDay() {
    return this.tmdbService.getTrending({
      page: 1,
      period: 'day',
      type: 'movie',
    });
  }

  getTrendingMovieWeek(): void {
    this.tmdbService
      .getTrending({
        page: 1,
        period: 'week',
        type: 'movie',
      })
      .subscribe({
        next: (response) => {
          this.trendingMoviesWeek = {
            loading: false,
            data: response.results.slice(0, this.maxData),
          };
        },
        error: () => {},
      });
  }

  getTPopularMovie(): void {
    this.tmdbService
      .getPopularMovie({
        page: 1,
      })
      .subscribe({
        next: (response) => {
          this.popularMovies = {
            loading: false,
            data: response.results.slice(0, this.maxData),
          };
        },
        error: () => {},
      });
  }

  getTPopularTv(): void {
    this.tmdbService
      .getPopularTv({
        page: 1,
      })
      .subscribe({
        next: (response) => {
          this.popularTv = {
            loading: false,
            data: response.results.slice(0, this.maxData),
          };
        },
        error: () => {},
      });
  }
}
