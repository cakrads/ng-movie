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
  movieImage = 'https://image.tmdb.org/t/p/';

  constructor(readonly tmdbService: TmdbService) {}

  ngOnInit() {
    this.getTrendingMovie({
      page: 1,
      period: 'day',
      type: 'movie',
    });
    this.getTrendingMovie({
      page: 1,
      period: 'week',
      type: 'movie',
    });
  }

  getTrendingMovie(params: ITrendingParams): void {
    this.tmdbService.getTrending(params).subscribe({
      next: (response) => {
        if (params.type === 'movie') {
          this.trendingMoviesDay = {
            loading: false,
            data: response.results.slice(0, this.maxData),
          };
        } else {
          this.trendingMoviesWeek = {
            loading: false,
            data: response.results.slice(0, this.maxData),
          };
        }
      },
      error: () => {},
    });
  }
}
