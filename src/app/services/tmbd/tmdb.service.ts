import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError, } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  IDiscoverMovieResponse,
  IDiscoverParams,
  IGenreListParams,
  IGenreListResponse,
  IListOptions,
  IMovieDetailParams,
  IMovieDetailResponse,
  IMovieImagesData,
  IMovieRecommandationResponse,
  IMovieVideoResponse,
  INowPlayingMovieResponse,
  IParamsList,
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

  private createHttpParams(
    params: Partial<
      IParamsList |
      IGenreListParams |
      IMovieDetailParams
    >
  ): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return httpParams;
  }

  getTrending(params: ITrendingParams): Observable<ITrendingResponse> {
    const moviePath = `trending/movie/${params.period}`;
    const url = `${this.baseUrl}${moviePath}`;

    const httpParams = this.createHttpParams({
      ...this.defaultParams,
      ...params,
    } as ITrendingParams);

    console.info('TMDB getTrending', url, { params: httpParams.toString() });
    return this.http
      .get<ITrendingResponse>(url, { params: httpParams })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Failed to fetch movies. Please try again.'));
        })
      );
  }

  getPopularMovie(params?: IPopularParams): Observable<IPopularMovieResponse> {
    const moviePath = `movie/popular`;
    const url = `${this.baseUrl}${moviePath}`;

    const httpParams = this.createHttpParams({
      ...this.defaultParams,
      ...params
    });

    console.info('TMDB getPopularMovie', url, { params: httpParams.toString() });
    return this.http
      .get<IPopularMovieResponse>(url, { params: httpParams })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Failed to fetch movies. Please try again.'));
        })
      );
  }

  getNowPlaying(params?: IPopularParams): Observable<INowPlayingMovieResponse> {
    const moviePath = 'movie/now_playing';
    const url = `${this.baseUrl}${moviePath}`;

    const httpParams = this.createHttpParams({
      ...this.defaultParams,
      ...params,
    } as IPopularParams);

    console.info('TMDB getNowPlaying', url, { params: httpParams.toString() });
    return this.http
      .get<INowPlayingMovieResponse>(url, { params: httpParams })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Failed to fetch movies. Please try again.'));
        })
      );
  }

  getDetail(movieId: number): Observable<IMovieDetailResponse> {
    const MOVIE_PATH = `movie/${movieId}`;
    const url = `${this.baseUrl}${MOVIE_PATH}`;

    const httpParams = this.createHttpParams({
      ...this.defaultParams,
      append_to_response: 'videos,images',
    });

    console.info('TMDB getDetail', url);
    return this.http
      .get<IMovieDetailResponse>(url, { params: httpParams })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Failed to fetch movies. Please try again.'));
        })
      );
  }

  getRecommendation(movieId: number): Observable<IMovieRecommandationResponse> {
    const MOVIE_PATH = `movie/${movieId}/recommendations`;
    const url = `${this.baseUrl}${MOVIE_PATH}`;

    const httpParams = this.createHttpParams({
      ...this.defaultParams,
    });

    console.info('TMDB getRecommendation:', url);
    return this.http
      .get<IMovieRecommandationResponse>(url, { params: httpParams })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Failed to fetch movies. Please try again.'));
        })
      );
  }

  getVideos(movieId: number): Observable<IMovieVideoResponse> {
    const MOVIE_PATH = `movie/${movieId}/videos`;
    const url = `${this.baseUrl}${MOVIE_PATH}`;

    const httpParams = this.createHttpParams({
      ...this.defaultParams,
    });

    console.info('TMDB getVideos:', url)
    return this.http
      .get<IMovieVideoResponse>(url, { params: httpParams })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Failed to fetch movies. Please try again.'));
        })
      );
  }

  getImages(movieId: number): Observable<IMovieImagesData> {
    const MOVIE_PATH = `movie/${movieId}/images`;
    const url = `${this.baseUrl}${MOVIE_PATH}`;

    const httpParams = this.createHttpParams({
      ...this.defaultParams,
    });

    console.info('TMDB getImages:', url);
    return this.http
      .get<IMovieImagesData>(url, { params: httpParams })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Failed to fetch movies. Please try again.'));
        })
      );
  }

  getGenreList(params?: IGenreListParams): Observable<IGenreListResponse> {
    const path = `genre/movie/list`;
    const defaultLanguage = 'en';
    const url = `${this.baseUrl}${path}`;

    const httpParams = this.createHttpParams({
      ...this.defaultParams,
      language: params?.language ?? defaultLanguage,
    } as IGenreListParams);

    console.info('TMDB getGenreList:', url, { params: httpParams.toString() });
    return this.http
      .get<IGenreListResponse>(url, { params: httpParams })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Failed to fetch movies. Please try again.'));
        })
      );
  }

  // Fetch movies by genre
  getDiscoverMovies(params?: IDiscoverParams): Observable<IDiscoverMovieResponse> {
    const path = `discover/movie`;
    const url = `${this.baseUrl}${path}`;

    const httpParams = this.createHttpParams({
      ...this.defaultParams,
      ...params
    });

    console.info('TMDB getDiscoverMovies:', url, { params: httpParams.toString() });
    return this.http
      .get<IDiscoverMovieResponse>(url, { params: httpParams })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Failed to fetch movies. Please try again.'));
        })
      );
  }

  getDiscoverSortByOptions(): Observable<IListOptions> {
    const sortByOptions = [
      { label: 'Most Popular', value: 'popularity.desc' },
      { label: 'Top Rated', value: 'vote_average.desc' },
    ] as IListOptions["sortBy"];

    return forkJoin({
      genres: this.getGenreList(),
    }).pipe(
      map(({ genres }) => ({
        sortBy: sortByOptions,
        genres: genres.genres.map((g) => ({ label: g.name, value: g.id })),
      }))
    );
  }

}
