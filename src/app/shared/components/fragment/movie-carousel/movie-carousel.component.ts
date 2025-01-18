import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ImageComponent } from '@app/shared/components/ui/image/image.component';
import { IMovieListData } from '@app/services/tmbd/tmdb.service';
import { lucideStar } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
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
import { environment } from '@environments/environment';

@Component({
  selector: 'app-movie-carousel',
  imports: [
    CommonModule,
    NgIcon,

    HlmIconDirective,
    HlmSkeletonComponent,
    HlmButtonDirective,
    ImageComponent,

    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    HlmCarouselNextComponent,
    HlmCarouselPreviousComponent,
    HlmCarouselShadowABeforeComponent,
    HlmCarouselShadowAfterComponent,

    BrnHoverCardModule,
    HlmHoverCardModule,
  ],
  providers: [provideIcons({ lucideStar })],
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieCarouselComponent {
  movieImage = environment.movieImage;
  loadingSkeleton = Array.from({ length: 10 }, (_, i) => i + 1);

  @Input() loading: boolean = true;
  @Input() movieData!: IMovieListData[];

  // carouselItems = [
  //   { url: 'https://picsum.photos/500/400', alt: 'Mountain views' },
  //   { url: 'https://picsum.photos/500/400', alt: 'Forest' },
  //   { url: 'https://picsum.photos/500/400', alt: 'Beach' },
  //   { url: 'https://picsum.photos/500/400', alt: 'Cityscape' },
  //   { url: 'https://picsum.photos/500/400', alt: 'Desert' },
  //   { url: 'https://picsum.photos/500/400', alt: 'Snowy Mountain' },
  // ];

  constructor() {
    console.log({ loading: this.loading, movieData: this.movieData });
  }
}
