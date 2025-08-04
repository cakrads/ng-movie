import { HttpClient, HttpParams } from '@angular/common/http';
import { TransferState } from '@angular/core';
import { of, throwError } from 'rxjs';
import { TmdbService } from './tmdb.service';
import {
  IPopularMovieResponse,
  IMovieDetailResponse,
  IMovieVideoResponse,
  IMovieImagesData,
  IMovieRecommandationResponse,
  IGenreListResponse,
  IDiscoverMovieResponse,
  IListOptions,
} from './tmbd.type';

describe('TmdbService', () => {
  let httpClientSpy: { get: jest.Mock };
  let transferStateSpy: Partial<TransferState>;
  let service: TmdbService;

  beforeEach(() => {
    httpClientSpy = { get: jest.fn() };
    transferStateSpy = {};
    service = new TmdbService(httpClientSpy as any, transferStateSpy as TransferState);
    service.BASE_URL = 'https://api/';
    service.defaultParams = { api_key: 'KEY', include_adult: false, with_genres: 16 };
  });

  describe('createHttpParams', () => {
    it('should serialize simple and nested params correctly', () => {
      // only valid IParamsList props: page and vote_average
      const params = service['createHttpParams']({ page: 2, vote_average: { gte: 5, lte: 10 }, include_adult: true });
      expect(params.get('page')).toBe('2');
      expect(params.get('vote_average.gte')).toBe('5');
      expect(params.get('vote_average.lte')).toBe('10');
      expect(params.get('include_adult')).toBe('true');
    });
  });

  describe('getPopularMovie', () => {
    it('should return movies on success', (done) => {
      const mockResp: IPopularMovieResponse = { page: 1, results: [], total_pages: 1, total_results: 0 };
      httpClientSpy.get.mockReturnValue(of(mockResp));
      service.getPopularMovie({ page: 3 }).subscribe((res) => {
        expect(res).toBe(mockResp);
        // verify http call args
        const [[url, options]] = httpClientSpy.get.mock.calls;
        expect(url).toBe('https://api/discover/movie');
        expect(options.params.get('page')).toBe('3');
        done();
      });
    });

    it('should propagate formatted error on failure', (done) => {
      httpClientSpy.get.mockReturnValue(throwError(() => new Error('http err')));
      service.getPopularMovie().subscribe({
        next: () => fail('expected error'),
        error: (err) => {
          expect(err.message).toBe('Failed to fetch movies. Please try again.');
          done();
        },
      });
    });
  });

  describe('list endpoint wrappers', () => {
    beforeEach(() => {
      jest.spyOn<any, any>(service as any, 'fetchMoviesUntilLimit')
        .mockReturnValue(of({ page: 1, results: [{ id: 1, genre_ids: [16] }], total_pages: 1, total_results: 1 }));
    });

    it('getTrending should call fetchMoviesUntilLimit correctly', (done) => {
      (service as any).fetchMoviesUntilLimit.mockClear();
      service.getTrending({ period: 'week' }).subscribe((res) => {
        expect((service as any).fetchMoviesUntilLimit).toHaveBeenCalledWith('trending/movie/week', 'trending-animation-week');
        expect(res.total_results).toBe(1);
        done();
      });
    });

    it('getNowPlaying should call fetchMoviesUntilLimit with now_playing', (done) => {
      (service as any).fetchMoviesUntilLimit.mockClear();
      service.getNowPlaying().subscribe(() => {
        expect((service as any).fetchMoviesUntilLimit).toHaveBeenCalledWith('movie/now_playing', 'now-playing-animation');
        done();
      });
    });

    it('getUpcoming should call fetchMoviesUntilLimit with upcoming', (done) => {
      (service as any).fetchMoviesUntilLimit.mockClear();
      service.getUpcoming().subscribe(() => {
        expect((service as any).fetchMoviesUntilLimit).toHaveBeenCalledWith('movie/upcoming', 'upcoming-animation');
        done();
      });
    });
  });

  describe('detail, videos, images', () => {
    it('getDetail returns movie detail', (done) => {
      const mockDetail: IMovieDetailResponse = { id: 1, backdrop_path: '', title: '', original_title: '', overview: '', poster_path: '', adult: false, original_language: '', genre_ids: [], popularity: 0, release_date: '', video: false, vote_average: 0, vote_count: 0, videos: { page: 1, results: [], total_pages: 1, total_results: 0 }, images: { id: 1, backdrops: [], logos: [], posters: [] } } as any;
      httpClientSpy.get.mockReturnValue(of(mockDetail));
      service.getDetail(1).subscribe((res) => {
        expect(res).toBe(mockDetail);
        const [[url, options]] = httpClientSpy.get.mock.calls;
        expect(url).toBe('https://api/movie/1');
        expect(options.params).toBeInstanceOf(HttpParams);
        done();
      });
    });

    it('getVideos fetches videos', (done) => {
      const mockVid: IMovieVideoResponse = { page: 1, results: [], total_pages: 1, total_results: 0 };
      httpClientSpy.get.mockReturnValue(of(mockVid));
      service.getVideos(2).subscribe((res) => {
        expect(res).toBe(mockVid);
        const [[url, options]] = httpClientSpy.get.mock.calls;
        expect(url).toBe('https://api/movie/2/videos');
        expect(options.params).toBeInstanceOf(HttpParams);
        done();
      });
    });

    it('getImages fetches images', (done) => {
      const mockImg: IMovieImagesData = { id: 3, backdrops: [], logos: [], posters: [] } as any;
      httpClientSpy.get.mockReturnValue(of(mockImg));
      service.getImages(3).subscribe((res) => {
        expect(res).toBe(mockImg);
        const [[url, options]] = httpClientSpy.get.mock.calls;
        expect(url).toBe('https://api/movie/3/images');
        expect(options.params).toBeInstanceOf(HttpParams);
        done();
      });
    });

    it('getDetail should propagate formatted error on failure', (done) => {
      httpClientSpy.get.mockReturnValue(throwError(() => new Error('http err')));
      service.getDetail(123).subscribe({
        next: () => fail('expected error'),
        error: (err) => {
          expect(err.message).toBe('Failed to fetch movies. Please try again.');
          done();
        }
      });
    });

    it('getVideos should propagate formatted error on failure', (done) => {
      httpClientSpy.get.mockReturnValue(throwError(() => new Error('http err')));
      service.getVideos(123).subscribe({
        next: () => fail('expected error'),
        error: (err) => {
          expect(err.message).toBe('Failed to fetch movies. Please try again.');
          done();
        }
      });
    });

    it('getImages should propagate formatted error on failure', (done) => {
      httpClientSpy.get.mockReturnValue(throwError(() => new Error('http err')));
      service.getImages(123).subscribe({
        next: () => fail('expected error'),
        error: (err) => {
          expect(err.message).toBe('Failed to fetch movies. Please try again.');
          done();
        }
      });
    });
  });

  describe('getRecommendation', () => {
    it('filters results to animation genre', (done) => {
      const r1 = { backdrop_path: '', id: 10, title: '', original_title: '', overview: '', poster_path: '', genre_ids: [14], media_type: '', adult: false, original_language: '', popularity: 0, release_date: '', video: false, vote_average: 0, vote_count: 0 };
      const r2 = { backdrop_path: '', id: 11, title: '', original_title: '', overview: '', poster_path: '', genre_ids: [16], media_type: '', adult: false, original_language: '', popularity: 0, release_date: '', video: false, vote_average: 0, vote_count: 0 };
      const resp: IMovieRecommandationResponse = { page: 1, results: [r1, r2], total_pages: 1, total_results: 2 } as any;
      httpClientSpy.get.mockReturnValue(of(resp));
      service.getRecommendation(4).subscribe((res) => {
        expect(res.results).toEqual([r2]);
        expect(res.total_results).toBe(1);
        done();
      });
    });

    it('propagates formatted error', (done) => {
      httpClientSpy.get.mockReturnValue(throwError(() => new Error('fail')));
      service.getRecommendation(0).subscribe({
        error: (err) => {
          expect(err.message).toBe('Failed to fetch movies. Please try again.');
          done();
        }
      });
    });
  });

  describe('genre and discover', () => {
    it('getGenreList returns genres', (done) => {
      const mockGenres: IGenreListResponse = { genres: [{ id: 1, name: 'A' }] };
      httpClientSpy.get.mockReturnValue(of(mockGenres));
      service.getGenreList().subscribe((res) => {
        expect(res).toBe(mockGenres);
        const [[url, options]] = httpClientSpy.get.mock.calls;
        expect(url).toBe('https://api/genre/movie/list');
        expect(options.params).toBeInstanceOf(HttpParams);
        done();
      });
    });

    it('getDiscoverMovies returns discover data', (done) => {
      const mockDisc: IDiscoverMovieResponse = { page: 1, results: [], total_pages: 1, total_results: 0 };
      httpClientSpy.get.mockReturnValue(of(mockDisc));
      service.getDiscoverMovies({ sort_by: 'popularity.desc' }).subscribe((res) => {
        expect(res).toBe(mockDisc);
        const [[url, options]] = httpClientSpy.get.mock.calls;
        expect(url).toBe('https://api/discover/movie');
        expect(options.params).toBeInstanceOf(HttpParams);
        done();
      });
    });

    it('getDiscoverSortByOptions combines genres and sortBy', (done) => {
      const mockGenres: IGenreListResponse = { genres: [{ id: 2, name: 'B' }] };
      httpClientSpy.get.mockReturnValue(of(mockGenres));
      service.getDiscoverSortByOptions().subscribe((opts: IListOptions) => {
        expect(opts.sortBy).toEqual([
          { label: 'Most Popular', value: 'popularity.desc' },
          { label: 'Top Rated', value: 'vote_average.desc' }
        ]);
        expect(opts.genres).toEqual([{ label: 'B', value: 2 }]);
        done();
      });
    });

    it('getGenreList should propagate formatted error on failure', (done) => {
      httpClientSpy.get.mockReturnValue(throwError(() => new Error('http err')));
      service.getGenreList().subscribe({
        next: () => fail('expected error'),
        error: (err) => {
          expect(err.message).toBe('Failed to fetch movies. Please try again.');
          done();
        }
      });
    });

    it('getDiscoverMovies should propagate formatted error on failure', (done) => {
      httpClientSpy.get.mockReturnValue(throwError(() => new Error('http err')));
      service.getDiscoverMovies({ sort_by: 'popularity.desc' }).subscribe({
        next: () => fail('expected error'),
        error: (err) => {
          expect(err.message).toBe('Failed to fetch movies. Please try again.');
          done();
        }
      });
    });
  });

  it('aggregates results across pages until minimum movies reached', (done) => {
    // Prepare pages: first page has 1 matching and 1 non-matching, second page has 6 matching
    const page1 = {
      page: 1, total_pages: 2, total_results: 0, results: [
        { backdrop_path: '', id: 1, title: 'A', original_title: '', overview: '', poster_path: '', adult: false, original_language: '', genre_ids: [16], popularity: 0, release_date: '', video: false, vote_average: 0, vote_count: 0 },
        { backdrop_path: '', id: 2, title: 'B', original_title: '', overview: '', poster_path: '', adult: false, original_language: '', genre_ids: [99], popularity: 0, release_date: '', video: false, vote_average: 0, vote_count: 0 }
      ]
    };
    const match = { backdrop_path: '', id: 3, title: 'C', original_title: '', overview: '', poster_path: '', adult: false, original_language: '', genre_ids: [16], popularity: 0, release_date: '', video: false, vote_average: 0, vote_count: 0 };
    const page2 = { page: 2, total_pages: 2, total_results: 0, results: Array(6).fill(match) };
    // Mock http.get to return pages based on page param
    httpClientSpy.get.mockImplementation((url: string, opts: any) => {
      const p = opts.params.page;
      if (p === 1) {
        return of(page1 as any);
      } else if (p === 2) {
        return of(page2 as any);
      }
      return of(null as any);
    });
    // Call private method
    (service as any).fetchMoviesUntilLimit('movies/endpoint', 'key').subscribe((res: any) => {
      // Expect aggregated results length = 7 (1 from page1 + 6 from page2)
      expect(res.results.length).toBe(7);
      expect(res.total_results).toBe(7);
      expect(res.page).toBe(1);
      // Verify http.get calls for page 1 and 2
      const calls = httpClientSpy.get.mock.calls;
      expect(calls[0][0]).toBe('https://api/movies/endpoint');
      expect(calls[0][1].params.page).toBe(1);
      expect(calls[1][0]).toBe('https://api/movies/endpoint');
      expect(calls[1][1].params.page).toBe(2);
      done();
    });
  });
  
});
