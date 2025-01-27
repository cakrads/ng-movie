import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { hlmH3 } from '@components/ui/ui-typography-helm/src';
import { IMovieListData, TmdbService } from '@app/services/tmbd/tmdb.service';

import { MovieCarouselComponent } from '@components/fragment/movie-carousel/movie-carousel.component';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css'],
  imports: [CommonModule, MovieCarouselComponent, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecommendationComponent implements OnInit {
  hlmH3 = hlmH3;

  route: ActivatedRoute = inject(ActivatedRoute);

  movieRecommendationListLoading = true;
  movieRecommendationList: IMovieListData[] = [];

  constructor(readonly tmdbService: TmdbService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieRecommendationListLoading = true;
      this.getMovieRecommandation(params['movieId']);
    });
  }

  getMovieRecommandation(movieId: number) {
    this.tmdbService.getRecommendation(movieId).subscribe({
      next: (response) => {
        this.movieRecommendationListLoading = false;
        this.movieRecommendationList = response.results;
      },
      error: () => { },
    });
  }
}
