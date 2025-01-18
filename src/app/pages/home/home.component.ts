import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ImageComponent } from '@components//image/image.component';
import { hlmH1, hlmH3, hlmP } from '@components//ui/ui-typography-helm/src';
import {
  TmdbService,
  ITrendingData,
  ITrendingParams,
} from '@app/services/tmbd/tmdb.service';
import {
  HlmCarouselComponent,
  HlmCarouselContentComponent,
  HlmCarouselItemComponent,
  HlmCarouselNextComponent,
  HlmCarouselPreviousComponent,
  HlmCarouselShadowABeforeComponent,
  HlmCarouselShadowAfterComponent,
} from '@app/shared/components/ui/ui-carousel-helm/src';
import { HlmSkeletonComponent } from '@app/shared/components/ui/ui-skeleton-helm/src';
import { BrnHoverCardModule } from '@spartan-ng/brain/hover-card';
import { HlmHoverCardModule } from '@spartan-ng/ui-hovercard-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';

@Component({
  selector: 'home-page',
  imports: [
    CommonModule,
    HlmButtonDirective,
    ImageComponent,

    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    HlmCarouselNextComponent,
    HlmCarouselPreviousComponent,
    HlmCarouselShadowABeforeComponent,
    HlmCarouselShadowAfterComponent,

    HlmSkeletonComponent,

    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,

    BrnHoverCardModule,
    HlmHoverCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  title = 'my-movie';
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

  trendingMovies = {
    loading: true,
    movie: [] as ITrendingData[],
    tv: [] as ITrendingData[],
  };
  movieImage = 'https://image.tmdb.org/t/p/';

  constructor() {}

  ngOnInit() {
    // this.getTrendingMovie({
    //   page: 1,
    //   type: 'movie',
    // });
    // this.getTrendingMovie({
    //   page: 1,
    //   type: 'tv',
    // });
    setTimeout(() => {
      this.trendingMovies.loading = false;
    }, 3000);
  }

  // getTrendingMovie(params: ITrendingParams): void {
  //   this.tmdbService.getTrending(params).subscribe({
  //     next: (response) => {
  //       this.trendingMovies.loading = false;
  //       this.trendingMovies[params.type] = response.results.slice(0, this.maxData);
  //     },
  //     error: () => {},
  //   });
  // }
  // this.moviesService.getMovies(type, page).pipe(take(1)).subscribe(res => {
  //   this.moviesList = res.results;
  // });
}
