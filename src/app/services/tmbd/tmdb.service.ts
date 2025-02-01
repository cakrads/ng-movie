import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  IDiscoverMovieResponse,
  IDiscoverParams,
  IGenreListParams,
  IGenreListResponse,
  IMovieDetailResponse,
  IMovieImagesData,
  IMovieRecommandationResponse,
  IMovieVideoResponse,
  INowPlayingMovieResponse,
  IPopularMovieResponse,
  IPopularParams,
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
        ([key, value]) => {
          if (!!value) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          } else {
            return '';
          }
        })
      .filter((param) => !!param)
      .join('&');
  }

  getTrending(trendingParams: ITrendingParams): Observable<ITrendingResponse> {
    const moviePath = `trending/movie/${trendingParams.period}`;
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
      page: trendingParams.page || 1,
    } as ITrendingParams);

    const url = `${this.baseUrl}${moviePath}?${urlParams}`;
    console.info('TMDB getTrending', url);
    return this.http.get<ITrendingResponse>(url);
  }

  getPopularMovie(popularParams: IPopularParams): Observable<IPopularMovieResponse> {
    const moviePath = `movie/popular`;
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
      page: popularParams.page ?? 1,
    });

    const url = `${this.baseUrl}${moviePath}?${urlParams}`;
    console.info('TMDB getPopularMovie', url);
    return this.http.get<IPopularMovieResponse>(url);
  }

  getNowPlaying(nowPlayingParams: IPopularParams): Observable<INowPlayingMovieResponse> {
    const moviePath = 'movie/now_playing';
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
      ...nowPlayingParams,
    } as IPopularParams);

    const url = `${this.baseUrl}${moviePath}?${urlParams}`;
    console.info('TMDB getNowPlaying', url);
    return this.http.get<INowPlayingMovieResponse>(url);
  }

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

  getGenreList(params?: IGenreListParams): Observable<IGenreListResponse> {
    const path = `genre/movie/list`;
    const defaultLanguage = 'en';
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
      language: params?.language ?? defaultLanguage,
    } as IGenreListParams);

    const url = `${this.baseUrl}${path}?${urlParams}`;
    console.info('TMDB getGenreList:', url);
    return this.http.get<IGenreListResponse>(url)
  }

  // Fetch movies by genre
  getDiscoverMovies(params: IDiscoverParams): Observable<IDiscoverMovieResponse> {
    const path = `discover/movie`;
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
      with_genres: params.with_genres,
    } as IDiscoverParams);

    const url = `${this.baseUrl}${path}?${urlParams}`;
    console.info('TMDB getDiscoverMovies:', url);
    return this.http.get<IDiscoverMovieResponse>(url);
  }

}
