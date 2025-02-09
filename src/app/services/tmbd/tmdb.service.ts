import { Injectable, TransferState } from '@angular/core';
import { catchError, expand, forkJoin, map, Observable, of, takeWhile, throwError, } from 'rxjs';
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
  IMovieListData,
  IMovieRecommandationResponse,
  IMovieVideoResponse,
  IParamsList,
  IPopularMovieResponse,
  IPopularParams,
  IResponseList,
  ITrendingParams,
} from './tmbd.type';
import { environment } from '@environments/environment';

export * from './tmbd.type';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  BASE_URL: string;
  ANIMATION_GENRE_ID = 16;
  defaultParams: Record<string, any> = {};
  private readonly MIN_MOVIES = 7;
  private readonly MAX_PAGES = 5;

  constructor(
    private readonly http: HttpClient,
    private readonly transferState: TransferState
  ) {
    this.BASE_URL = environment.tmdbUrl;
    this.defaultParams = {
      api_key: environment.apiKey,
      include_adult: false,
      with_genres: this.ANIMATION_GENRE_ID, // Animation
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
        if (typeof value === 'object' && value !== null) {
          // Handle nested objects like { vote_average: { gte: 7, lte: 10 } }
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            if (nestedValue !== undefined && nestedValue !== null) {
              httpParams = httpParams.set(`${key}.${nestedKey}`, String(nestedValue));
            }
          });
        } else {
          httpParams = httpParams.set(key, String(value));
        }
      }
    });
    return httpParams;
  }

  /** Get popular animation or anime movies */
  getPopularMovie(params?: IPopularParams): Observable<IPopularMovieResponse> {
    const moviePath = `discover/movie`;
    const url = `${this.BASE_URL}${moviePath}`;

    const httpParams = this.createHttpParams({
      ...this.defaultParams,
      ...params,
      sort_by: 'popularity.desc',
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

  private fetchMoviesUntilLimit(endpoint: string, key: string): Observable<IResponseList<IMovieListData[]>> {
    let currentPage = 1;
    const collectedMovies: IMovieListData[] = [];

    return this.http
      .get<IResponseList<IMovieListData[]>>(`${this.BASE_URL}${endpoint}`, {
        params: { ...this.defaultParams, page: currentPage, },
      })
      .pipe(
        expand((response) => {
          if (!response || collectedMovies.length >= this.MIN_MOVIES || currentPage >= this.MAX_PAGES) {
            return of(null); // Stop expanding
          }

          // Collect filtered movies
          console.info(`get ${endpoint}?page=${currentPage}`);
          const filteredMovies = response.results.filter((movie) => movie.genre_ids.includes(this.ANIMATION_GENRE_ID));
          console.info(`page ${currentPage} has ${filteredMovies.length} animation movies`);
          collectedMovies.push(...filteredMovies);
          console.info(`total animation movies ${collectedMovies.length}`);

          // Only continue if we haven't reached 7 movies
          return collectedMovies.length < this.MIN_MOVIES && currentPage < response.total_pages && currentPage < this.MAX_PAGES
            ? this.http.get<IMovieListData>(`${this.BASE_URL}${endpoint}`, {
              params: { ...this.defaultParams, page: ++currentPage },
            })
            : of(null);
        }),
        takeWhile((response) => !!response, true),
        map(() => {
          return {
            page: 1,
            results: collectedMovies,
            total_pages: 1,
            total_results: collectedMovies.length,
          };
        })
      )
  }

  getTrending(params: ITrendingParams): Observable<IResponseList<IMovieListData[]>> {
    return this.fetchMoviesUntilLimit(`trending/movie/${params.period}`, `trending-animation-${params.period}`);
  }

  getNowPlaying(): Observable<IResponseList<IMovieListData[]>> {
    return this.fetchMoviesUntilLimit('movie/now_playing', 'now-playing-animation');
  }

  getUpcoming(): Observable<IResponseList<IMovieListData[]>> {
    return this.fetchMoviesUntilLimit('movie/upcoming', 'upcoming-animation');
  }

  getDetail(movieId: number): Observable<IMovieDetailResponse> {
    const MOVIE_PATH = `movie/${movieId}`;
    const url = `${this.BASE_URL}${MOVIE_PATH}`;

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

  getVideos(movieId: number): Observable<IMovieVideoResponse> {
    const MOVIE_PATH = `movie/${movieId}/videos`;
    const url = `${this.BASE_URL}${MOVIE_PATH}`;

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
    const url = `${this.BASE_URL}${MOVIE_PATH}`;

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

  getRecommendation(movieId: number): Observable<IMovieRecommandationResponse> {
    const MOVIE_PATH = `movie/${movieId}/recommendations`;
    const url = `${this.BASE_URL}${MOVIE_PATH}`;

    const httpParams = this.createHttpParams({
      ...this.defaultParams,
    });

    console.info('TMDB getRecommendation:', url);
    return this.http
      .get<IMovieRecommandationResponse>(url, { params: httpParams })
      .pipe(
        map((response) => {
          const filteredResults = response.results.filter((movie) =>
            movie.genre_ids.includes(this.ANIMATION_GENRE_ID)
          );

          return {
            ...response,
            results: filteredResults,
            total_results: filteredResults.length,
          };
        }),
        catchError((error) => {
          console.error('Error fetching movies:', error);
          return throwError(() => new Error('Failed to fetch movies. Please try again.'));
        })
      );
  }

  // [TO DO]: not used cause this project only focus on animation genre
  getGenreList(params?: IGenreListParams): Observable<IGenreListResponse> {
    const path = `genre/movie/list`;
    const defaultLanguage = 'en';
    const url = `${this.BASE_URL}${path}`;

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
    const url = `${this.BASE_URL}${path}`;

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
      // [TO DO]: not used cause this project only focus on animation genre
      genreResult: this.getGenreList(),
    }).pipe(
      map(({ genreResult }) => ({
        sortBy: sortByOptions,
        genres: genreResult.genres.map((g) => ({ label: g.name, value: g.id })),
      }))
    );
  }

}
