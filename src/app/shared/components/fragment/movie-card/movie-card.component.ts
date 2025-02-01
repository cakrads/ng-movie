import { Component, Input } from '@angular/core';
import { IMovieListData } from '@app/services/tmbd/tmbd.type';
import { ImageComponent } from '../../ui/image/image.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { lucideStar } from '@ng-icons/lucide';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  imports: [
    CommonModule,

    NgIcon,
    ImageComponent,
  ],
  providers: [provideIcons({ lucideStar })],
})
export class MovieCardComponent {
  @Input() loading: boolean = true;
  @Input() movie!: IMovieListData;
  @Input() variant: 'vertical' | 'horizontal' = 'horizontal';

  movieUrl = environment.movieImage;

  constructor() { }

}
