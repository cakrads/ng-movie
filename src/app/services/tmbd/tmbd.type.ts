export interface IResponseList<T> {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}

export interface IMovieListData {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type?: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ITvListData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface ITrendingParams {
  page: number;
  period: 'day' | 'week';
  type: 'movie' | 'tv';
}
export type ITrendingResponse = IResponseList<IMovieListData[]>;

export interface IPopularParams {
  page: number;
}
export type IPopularList = IResponseList<IMovieListData[]>;
export type IPopularMovieResponse = IResponseList<IMovieListData[]>;
export type IPopularTvResponse = IResponseList<ITvListData[]>;
