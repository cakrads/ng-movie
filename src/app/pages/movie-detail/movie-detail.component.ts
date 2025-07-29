import { CommonModule, NgClass, NgStyle } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  afterNextRender,
  signal,
} from '@angular/core';
import { ImageComponent } from '@components/ui/image/image.component';
import { hlmH1, hlmH4 } from '@components/ui/ui-typography-helm/src';
import { IMovieDetailData } from '@app/services/tmbd/tmbd.type';
import { environment } from '@environments/environment';
import { RuntimePipe } from '@app/shared/pipes/runtime/runtime.pipe';
import { HlmButtonDirective } from '@app/shared/components/ui/ui-button-helm/src';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIconDirective } from '@app/shared/components/ui/ui-icon-helm/src';
import { lucidePlay, lucideStar, lucideHeart } from '@ng-icons/lucide';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '@app/services/tmbd/tmdb.service';
import { HlmSkeletonComponent } from '@app/shared/components/ui/ui-skeleton-helm/src';
import { DetailMediaComponent } from './detail-media/detail-media.component';
import { FavoriteMovieService } from '@app/services/favorite-movie/favorite-movie.service';
import { HlmDialogComponent, HlmDialogContentComponent } from '@app/shared/components/ui/ui-dialog-helm/src';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/brain/dialog';
import { YoutubeIframeComponent } from '@app/shared/components/ui/ui-youtube-iframe/ui-youtube-iframe.component';

@Component({
  selector: 'app-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  imports: [
    NgIcon,
    HlmIconDirective,
    NgClass,
    ImageComponent,
    CommonModule,
    NgStyle,
    RuntimePipe,
    HlmButtonDirective,
    HlmSkeletonComponent,
    RecommendationComponent,
    DetailMediaComponent,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,

    YoutubeIframeComponent
  ],
  providers: [provideIcons({ lucideStar, lucidePlay, lucideHeart })],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieDetailPage implements OnInit {
  hlmH1 = hlmH1;
  hlmH4 = hlmH4;

  route: ActivatedRoute = inject(ActivatedRoute);

  movieUrl = environment.movieImage;
  videoUrl = environment.movieVideoUrl;

  movieDetailLoading = true;
  movieDetail: IMovieDetailData = {} as IMovieDetailData;
  backdropUrl = '';
  
  // Track favorite state - starts as false to match SSR
  isFavoriteState = signal(false);

  constructor(
    readonly tmdbService: TmdbService,
    readonly favoriteMovieService: FavoriteMovieService
  ) {
    // Update favorite state after client-side hydration is complete
    afterNextRender(() => {
      // Update favorite state for current movie after hydration
      this.updateFavoriteState();
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieDetailLoading = true;
      this.backdropUrl = '';

      const movieId = +params['movieId'];
      this.getMovieDetail(movieId);
    });
  }

  getMovieDetail(movieId: number) {
    this.tmdbService.getDetail(movieId).subscribe({
      next: (response) => {
        this.movieDetailLoading = false;
        this.movieDetail = response;
        this.backdropUrl =
          this.movieUrl +
          'w1920_and_h800_multi_faces' +
          this.movieDetail.backdrop_path;
        
        // Update favorite state when movie details are loaded
        this.updateFavoriteState();
      },
      error: () => { },
    });
  }

  toggleFavorite(movieId: number): void {
    if (this.favoriteMovieService.isFavorite(movieId)) {
      this.favoriteMovieService.removeFavorite(movieId);
    } else {
      this.favoriteMovieService.addFavorite(movieId);
    }
    // Update the state immediately after toggling
    this.updateFavoriteState();
  }

  updateFavoriteState(): void {
    if (this.movieDetail.id) {
      this.isFavoriteState.set(this.favoriteMovieService.isFavorite(this.movieDetail.id));
    }
  }
}
