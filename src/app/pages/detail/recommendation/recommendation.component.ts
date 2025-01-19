import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { hlmH3 } from '@components//ui/ui-typography-helm/src';
import { IMovieListData } from '@app/services/tmbd/tmdb.service';

import { MovieCarouselComponent } from '@components/fragment/movie-carousel/movie-carousel.component';

import { data } from './data';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css'],
  imports: [CommonModule, MovieCarouselComponent, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecommendationComponent implements OnInit {
  hlmH3 = hlmH3;

  movieRecommendationListLnoading = false;
  movieRecommendationList: IMovieListData[] = [];

  constructor() {}

  ngOnInit() {
    this.movieRecommendationList = data;
  }
}
