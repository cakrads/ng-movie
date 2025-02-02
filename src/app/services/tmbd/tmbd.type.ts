export interface IResponseList<T> {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}

export type ListSortBy = 'popularity.asc' | 'popularity.desc' | 'release_date.asc' | 'release_date.desc' | 'revenue.asc' | 'revenue.desc' | 'primary_release_date.asc' | 'primary_release_date.desc' | 'original_title.asc' | 'original_title.desc' | 'vote_average.asc' | 'vote_average.desc' | 'vote_count.asc' | 'vote_count.desc';

export interface IParamsList {
  include_adult?: boolean;
  page?: number;
  query?: string;
  sort_by?: ListSortBy;
  with_genres?: number;
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
export interface IListOptions {
  sortBy: {
    label: string;
    value: ListSortBy;
  }[]
  genres: {
    label: string;
    value: number;
  }[]
}


export interface ITrendingParams extends IParamsList {
  period: 'day' | 'week';
  type: 'movie';
}
export type ITrendingResponse = IResponseList<IMovieListData[]>;


export interface IPopularParams extends IParamsList { }
export type IPopularMovieResponse = IResponseList<IMovieListData[]>;

export interface INowPlayingParams extends IParamsList { }
export type INowPlayingMovieResponse = IResponseList<IMovieListData[]>;

export interface IDiscoverParams extends IParamsList { }
export type IDiscoverMovieResponse = IResponseList<IMovieListData[]>;

export type IMovieRecommandationResponse = IResponseList<IMovieListData[]>;


export interface IMovieVideoData {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}
export type IMovieVideoResponse = IResponseList<IMovieVideoData[]>;

export interface IMovieImageData {
  aspect_ratio: number
  height: number
  iso_639_1: any
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}
export interface IMovieImagesData {
  id: number
  backdrops: IMovieImageData[]
  logos: IMovieImageData[]
  posters: IMovieImageData[]
};
export type IMovieImagesResponse = IMovieImagesData;

export interface IMovieDetailParams {
  append_to_response?: string;
  language?: string;
}
export interface IMovieDetailData {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: IMovieDetailDataGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IMovieDetailDataProductionCompany[];
  production_countries: IMovieDetailDataProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: IMovieDetailDataSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos?: IMovieVideoResponse;
  images?: IMovieImagesResponse;
}
interface IMovieDetailDataGenre {
  id: number;
  name: string;
}
interface IMovieDetailDataProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}
interface IMovieDetailDataProductionCountry {
  iso_3166_1: string;
  name: string;
}
interface IMovieDetailDataSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export type IMovieDetailResponse = IMovieDetailData;


export interface IGenreListParams {
  language: string;
}
export interface IGenreData {
  id: number
  name: string
}
export type IGenreListResponse = {
  genres: IGenreData[]
};

