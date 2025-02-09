import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmH1, hlmH3, hlmP } from '@components/ui/ui-typography-helm/src';
import { TmdbService, IMovieListData } from '@app/services/tmbd/tmdb.service';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { MovieCarouselComponent } from '@components/fragment/movie-carousel/movie-carousel.component';
import { ImageComponent } from '@components/ui/image/image.component';

type IHomeCategories = 'trendingDay' | 'trendingWeek' | 'popularAnimation' | 'popularAnime' | 'nowPlayingAnimation' | 'nowPlayingAnime' | 'upcomingAnimation' | 'upcomingAnime';

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

  trackByFn(index: number): number {
    return index;
  }

  /** Movie Categories State */
  movieCategories: Record<IHomeCategories, { loading: boolean; data: IMovieListData[] }> = {
    trendingDay: { loading: true, data: [] },
    trendingWeek: { loading: true, data: [] },
    popularAnimation: { loading: true, data: [] },
    popularAnime: { loading: true, data: [] },
    nowPlayingAnimation: { loading: true, data: [] },
    nowPlayingAnime: { loading: true, data: [] },
    upcomingAnimation: { loading: true, data: [] },
    upcomingAnime: { loading: true, data: [] },
  };

  constructor(readonly tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.fetchMovieCategory('trendingDay', () =>
      this.tmdbService.getTrending({ page: 1, period: 'day' })
    ).then(() => {
      // Fetch these after trending data
      this.fetchMovieCategory('popularAnimation', () => this.tmdbService.getPopularMovie({ page: 1 }));
      this.fetchMovieCategory('nowPlayingAnimation', () => this.tmdbService.getNowPlaying());
      this.fetchMovieCategory('upcomingAnimation', () => this.tmdbService.getUpcoming());
    });
  }


  /** Fetch movie data by category dynamically */
  async fetchMovieCategory(category: IHomeCategories, apiCall: () => any): Promise<void> {
    if (this.movieCategories[category].data.length) return;

    try {
      const response = await apiCall().toPromise();
      this.movieCategories[category] = {
        loading: false,
        data: response.results.slice(0, this.maxData),
      };
    } catch (error) {
      console.error(`Failed to fetch ${category}:`, error);
      this.movieCategories[category].loading = false;
    }
  }

  /** Lazy load methods for tabs */
  handleTrendingWeek() {
    this.fetchMovieCategory('trendingWeek', () =>
      this.tmdbService.getTrending({ page: 1, period: 'week' })
    );
  }
}
