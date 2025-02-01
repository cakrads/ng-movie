import { CommonModule, NgClass, } from '@angular/common';
import { Component, Input, } from '@angular/core';
import { IMovieImagesResponse, IMovieVideoResponse } from '@app/services/tmbd/tmbd.type';
import { ImageComponent } from '@app/shared/components/ui/image/image.component';
import { HlmIconDirective } from '@app/shared/components/ui/ui-icon-helm/src';
import { HlmScrollAreaComponent } from '@app/shared/components/ui/ui-scrollarea-helm/src';
import { HlmSkeletonComponent } from '@app/shared/components/ui/ui-skeleton-helm/src';
import { HlmTabsComponent, HlmTabsContentDirective, HlmTabsListComponent, HlmTabsTriggerDirective } from '@app/shared/components/ui/ui-tabs-helm/src';
import { hlmH4 } from '@app/shared/components/ui/ui-typography-helm/src';
import { environment } from '@environments/environment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlay } from '@ng-icons/lucide';

@Component({
  selector: 'app-detail-media',
  templateUrl: './detail-media.component.html',
  styleUrls: ['./detail-media.component.css'],
  imports: [
    NgClass,
    NgIcon,
    ImageComponent,
    CommonModule,

    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmScrollAreaComponent,
    HlmIconDirective,
    HlmSkeletonComponent,
  ],
  providers: [provideIcons({ lucidePlay })],
})
export class DetailMediaComponent {
  @Input() movieTitle: string = '';
  @Input() loading: boolean = true;
  @Input() images: IMovieImagesResponse | null = null;
  @Input() videos: IMovieVideoResponse | null = null;

  hlmH4 = hlmH4;

  mediaInfo = {
    thumbnail: (key: string) => environment.movieVideoThumbnail + key + '/hqdefault.jpg',
    imageBackdropUrl: (path: string) => environment.movieMedia + 'w533_and_h300_bestv2' + path,
    imagePosterUrl: (path: string) => environment.movieMedia + 'w220_and_h330_face' + path,
    videoUrl: (key: string) => environment.movieVideoUrl + key,
  }
  loadingSkeleton = Array.from({ length: 10 }, (_, i) => i + 1);
}
