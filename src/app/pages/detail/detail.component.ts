import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImageComponent } from '@components/ui/image/image.component';
import { hlmH1, hlmH4 } from '@components//ui/ui-typography-helm/src';
import { IMovieDetailData } from '@app/services/tmbd/tmbd.type';
import { environment } from '@environments/environment';
import { RuntimePipe } from '@app/shared/pipes/runtime/runtime.pipe';
import { HlmButtonDirective } from '@app/shared/components/ui/ui-button-helm/src';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIconDirective } from '@app/shared/components/ui/ui-icon-helm/src';
import { lucidePlay, lucideStar } from '@ng-icons/lucide';
import { RecommendationComponent } from './recommendation/recommendation.component';

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

    RecommendationComponent,
  ],
  providers: [provideIcons({ lucideStar, lucidePlay })],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailPage {
  hlmH1 = hlmH1;
  hlmH4 = hlmH4;

  movieUrl = environment.movieImage;

  movieDetailDataLoading = false;
  movieDetail: IMovieDetailData = {
    adult: false,
    backdrop_path: '/jK65srQczOKTpW62wPxwwKztGgE.jpg',
    belongs_to_collection: null,
    budget: 30000000,
    genres: [
      {
        id: 35,
        name: 'Comedy',
      },
      {
        id: 18,
        name: 'Drama',
      },
    ],
    homepage: '',
    id: 120467,
    imdb_id: 'tt2278388',
    origin_country: ['US'],
    original_language: 'en',
    overview:
      'The Grand Budapest Hotel tells of a legendary concierge at a famous European hotel between the wars and his friendship with a young employee who becomes his trusted protégé. The story involves the theft and recovery of a priceless Renaissance painting, the battle for an enormous family fortune and the slow and then sudden upheavals that transformed Europe during the first half of the 20th century.',
    original_title: 'The Grand Budapest Hotel',
    popularity: 63.718,
    poster_path: '/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
    production_companies: [
      {
        id: 43,
        logo_path: '/4RgIPr55kBakgupWkzdDxqXJEqr.png',
        name: 'Fox Searchlight Pictures',
        origin_country: 'US',
      },
      {
        id: 258,
        logo_path: '/tMI4xPwgxfNaNId3h9dOcHGU1NI.png',
        name: 'Scott Rudin Productions',
        origin_country: 'US',
      },
      {
        id: 264,
        logo_path: '/fA90qwUKgPhMONqtwY60GaHRyrW.png',
        name: 'Studio Babelsberg',
        origin_country: 'DE',
      },
      {
        id: 9350,
        logo_path: '/xz60JVoUHpOeg1cJbxzMJiwbuL7.png',
        name: 'Indian Paintbrush',
        origin_country: 'US',
      },
      {
        id: 22213,
        logo_path: '/qx9K6bFWJupwde0xQDwOvXkOaL8.png',
        name: 'TSG Entertainment',
        origin_country: 'US',
      },
      {
        id: 23449,
        name: 'American Empirical Pictures',
        origin_country: 'US',
      },
    ],
    production_countries: [
      {
        iso_3166_1: 'DE',
        name: 'Germany',
      },
      {
        iso_3166_1: 'US',
        name: 'United States of America',
      },
    ],
    release_date: '2014-02-26',
    revenue: 174600318,
    runtime: 100,
    spoken_languages: [
      {
        english_name: 'English',
        iso_639_1: 'en',
        name: 'English',
      },
      {
        english_name: 'French',
        iso_639_1: 'fr',
        name: 'Français',
      },
    ],
    status: 'Released',
    tagline:
      'A murder case of Madam D. with enormous wealth and the most outrageous events surrounding her sudden death!',
    title: 'The Grand Budapest Hotel',
    video: false,
    vote_average: 8,
    vote_count: 14885,
  };
  backdropUrl =
    this.movieUrl +
    'w1920_and_h800_multi_faces' +
    this.movieDetail.backdrop_path;

  constructor() {}
}
