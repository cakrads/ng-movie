import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITrendingParams, ITrendingResponse } from './tmbd.type';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  baseUrl: string;
  defaultParams: Record<string, any> = {};

  constructor(private readonly http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.defaultParams = {
      api_key: '',
      language: 'en-US',
      include_adult: false,
    };
  }

  private generateUrlParams(params: Record<string, any>): string {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');
  }

  getTrending(trendingParams: ITrendingParams): Observable<ITrendingResponse> {
    const MOVIE_PATH = `trending/${trendingParams.type}/day`;
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
      page: trendingParams.page || 1,
    });
    const url = `${this.baseUrl}${MOVIE_PATH}?${urlParams}`;
    console.info('url', url);
    return this.http.get<ITrendingResponse>(url);
  }

  getNowPlaying(page: number): Observable<any> {
    const MOVIE_PATH = '/movie/now_playing';
    const urlParams = this.generateUrlParams({
      ...this.defaultParams,
      page,
    });

    return this.http.get(`${this.baseUrl}${MOVIE_PATH}${urlParams}`);
  }
}
