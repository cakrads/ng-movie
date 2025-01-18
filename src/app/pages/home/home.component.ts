import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ImageComponent } from '@components//image/image.component';
import { hlmH1, hlmP } from '@components//ui/ui-typography-helm/src';
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
} from '@app/shared/components/ui/ui-carousel-helm/src';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  title = 'my-movie';
  hlmH1 = hlmH1;
  hlmP = hlmP;

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
  }

  // getTrendingMovie(params: ITrendingParams): void {
  //   this.tmdbService.getTrending(params).subscribe({
  //     next: (response) => {
  //       this.trendingMovies.loading = false;
  //       this.trendingMovies[params.type] = response.results.slice(0, 10);
  //     },
  //     error: () => {},
  //   });
  // }
  // this.moviesService.getMovies(type, page).pipe(take(1)).subscribe(res => {
  //   this.moviesList = res.results;
  // });
}
