import { CommonModule, NgClass, NgStyle } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { ImageComponent } from '@components/ui/image/image.component';
import { hlmH1, hlmH4 } from '@components/ui/ui-typography-helm/src';
import { IMovieDetailData } from '@app/services/tmbd/tmbd.type';
import { environment } from '@environments/environment';
import { RuntimePipe } from '@app/shared/pipes/runtime/runtime.pipe';
import { HlmButtonDirective } from '@app/shared/components/ui/ui-button-helm/src';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIconDirective } from '@app/shared/components/ui/ui-icon-helm/src';
import { lucidePlay, lucideStar } from '@ng-icons/lucide';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '@app/services/tmbd/tmdb.service';
import { HlmSkeletonComponent } from '@app/shared/components/ui/ui-skeleton-helm/src';
import { DetailMediaComponent } from './detail-media/detail-media.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
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
    DetailMediaComponent
  ],
  providers: [provideIcons({ lucideStar, lucidePlay })],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailPage implements OnInit {
  hlmH1 = hlmH1;
  hlmH4 = hlmH4;

  route: ActivatedRoute = inject(ActivatedRoute);

  movieUrl = environment.movieImage;
  videoUrl = environment.movieVideoUrl;

  movieDetailLoading = true;
  movieDetail: IMovieDetailData = {} as IMovieDetailData;
  backdropUrl = '';

  constructor(readonly tmdbService: TmdbService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieDetailLoading = true;
      this.backdropUrl = '';

      const movieId = +params['movieId'];
      this.getMovieDetail(movieId);
    });
    console.log('videoUrl', this.videoUrl);

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
      },
      error: () => { },
    });
  }
}
