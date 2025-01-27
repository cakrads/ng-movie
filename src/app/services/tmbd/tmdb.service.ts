import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  IMovieDetailResponse,
  IMovieImagesData,
  IMovieListData,
  IMovieRecommandationResponse,
  IMovieVideoResponse,
  IPopularList,
  IPopularMovieResponse,
  IPopularParams,
  IPopularTvResponse,
  ITrendingParams,
  ITrendingResponse,
} from './tmbd.type';
import { environment } from '@environments/environment';

export * from './tmbd.type';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  baseUrl: string;
  defaultParams: Record<string, any> = {};

  constructor(private readonly http: HttpClient) {
    this.baseUrl = environment.tmdbUrl;
    this.defaultParams = {
      api_key: environment.apiKey,
      include_adult: false,
    };
  }

  private generateUrlParams(params: Record<string, any>): string {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');
  }

  getTrending(trendingParams: ITrendingParams): Observable<ITrendingResponse> {
    const moviePath = `trending/${trendingParams.type}/${trendingParams.period}`;
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
      page: trendingParams.page || 1,
    });
    const url = `${this.baseUrl}${moviePath}?${urlParams}`;
    console.info('TMDB getTrending', url);
    return this.http.get<ITrendingResponse>(url);
  }

  getPopularMovie(popularParams: IPopularParams): Observable<IPopularList> {
    const moviePath = `movie/popular`;
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
      page: popularParams.page || 1,
    });
    const url = `${this.baseUrl}${moviePath}?${urlParams}`;
    console.info('TMDB getPopularMovie', url);
    return this.http.get<IPopularMovieResponse>(url);
  }

  // getPopularTv(popularParams: IPopularParams): Observable<IPopularList> {
  //   const moviePath = `tv/popular`;
  //   console.log({ moviePath });
  //   const urlParams = this.generateUrlParams({
  //     ...this.defaultParams,
  //     page: popularParams.page || 1,
  //   });
  //   const url = `${this.baseUrl}${moviePath}?${urlParams}`;
  //   console.info('TMDB getVideos', url);
  //   return this.http.get<IPopularTvResponse>(url).pipe(
  //     map((response: IPopularTvResponse) => ({
  //       ...response,
  //       results: response.results.map(
  //         (tv): IMovieListData => ({
  //           backdrop_path: tv.backdrop_path,
  //           id: tv.id,
  //           title: tv.name, // TV name becomes the movie title
  //           original_title: tv.original_name, // TV original name becomes the movie original title
  //           overview: tv.overview,
  //           poster_path: tv.poster_path,
  //           media_type: 'tv', // Specify that this is TV content
  //           adult: tv.adult,
  //           original_language: tv.original_language,
  //           genre_ids: tv.genre_ids,
  //           popularity: tv.popularity,
  //           release_date: tv.first_air_date, // TV first air date becomes movie release date
  //           video: false, // Default to false as video doesn't apply here
  //           vote_average: tv.vote_average,
  //           vote_count: tv.vote_count,
  //         })
  //       ),
  //     }))
  //   );
  // }

  // getNowPlaying(page: number): Observable<any> {
  //   const MOVIE_PATH = '/movie/now_playing';
  //   const urlParams = this.generateUrlParams({
  //     ...this.defaultParams,
  //     page,
  //   });

  //   return this.http.get(`${this.baseUrl}${MOVIE_PATH}${urlParams}`);
  // }

  getDetail(movieId: number): Observable<IMovieDetailResponse> {
    const MOVIE_PATH = `movie/${movieId}`;
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
      append_to_response: 'videos,images',
    });
    const url = `${this.baseUrl}${MOVIE_PATH}?${urlParams}`;
    console.info('TMDB getDetail', url);
    return this.http.get<IMovieDetailResponse>(url);
  }

  getRecommendation(
    movieId: number
  ): Observable<IMovieRecommandationResponse> {
    const MOVIE_PATH = `movie/${movieId}/recommendations`;
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
    });
    const url = `${this.baseUrl}${MOVIE_PATH}?${urlParams}`;
    console.info('TMDB getRecommendation:', url);
    return this.http.get<IMovieRecommandationResponse>(url);
  }

  getVideos(movieId: number): Observable<IMovieVideoResponse> {
    const MOVIE_PATH = `movie/${movieId}/videos`;
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
    });
    const url = `${this.baseUrl}${MOVIE_PATH}?${urlParams}`;
    console.info('TMDB getVideos:', url);
    return this.http.get<IMovieVideoResponse>(url);
  }

  getImages(movieId: number): Observable<IMovieImagesData> {
    const MOVIE_PATH = `movie/${movieId}/images`;
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
    });
    const url = `${this.baseUrl}${MOVIE_PATH}?${urlParams}`;
    console.info('TMDB getImages:', url);
    return this.http.get<IMovieImagesData>(url);
  }
}
