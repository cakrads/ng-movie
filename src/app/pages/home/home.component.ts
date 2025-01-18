import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ImageComponent } from '@app/shared/components/ui/image/image.component';
import { hlmH1, hlmH3, hlmP } from '@components//ui/ui-typography-helm/src';
import {
  TmdbService,
  IMovieData,
  ITrendingParams,
} from '@app/services/tmbd/tmdb.service';
import { BrnHoverCardModule } from '@spartan-ng/brain/hover-card';
import { HlmHoverCardModule } from '@spartan-ng/ui-hovercard-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { MovieCarouselComponent } from '@components/fragment/movie-carousel/movie-carousel.component';

@Component({
  selector: 'home-page',
  imports: [
    CommonModule,
    HlmButtonDirective,

    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    BrnHoverCardModule,
    HlmHoverCardModule,

    MovieCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  hlmH1 = hlmH1;
  hlmH3 = hlmH3;
  hlmP = hlmP;
  maxData = 10;

  loadingSkeleton = Array.from({ length: this.maxData }, (_, i) => i + 1);
  carouselItems = [
    { url: 'https://picsum.photos/500/400', alt: 'Mountain views' },
    { url: 'https://picsum.photos/500/400', alt: 'Forest' },
    { url: 'https://picsum.photos/500/400', alt: 'Beach' },
    { url: 'https://picsum.photos/500/400', alt: 'Cityscape' },
    { url: 'https://picsum.photos/500/400', alt: 'Desert' },
    { url: 'https://picsum.photos/500/400', alt: 'Snowy Mountain' },
  ];

  trackByFn(index: number): number {
    return index;
  }

  trendingMoviesDay = {
    loading: true,
    data: [] as IMovieData[],
  };
  trendingMoviesWeek = {
    loading: true,
    data: [] as IMovieData[],
  };
  popularMovies = {
    loading: true,
    data: [] as IMovieData[],
  };
  popularTv = {
    loading: true,
    data: [] as IMovieData[],
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
      this.getTPopularMovie();
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
      .getPopular({
        page: 1,
        type: 'movie',
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
      .getPopular({
        page: 1,
        type: 'tv',
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
