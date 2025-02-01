import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ImageComponent } from '@app/shared/components/ui/image/image.component';
import { IMovieListData } from '@app/services/tmbd/tmdb.service';
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
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-carousel',
  imports: [
    CommonModule,

    MovieCardComponent,
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
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieCarouselComponent {
  movieUrl = environment.movieImage;
  loadingSkeleton = Array.from({ length: 10 }, (_, i) => i + 1);

  @Input() loading: boolean = true;
  @Input() movieData!: IMovieListData[];

  constructor() { }
}
