/* tslint:disable:no-unused-variable */
import { of } from 'rxjs';
import { MovieListPage } from './movie-list.component';
import { IMovieListData } from '@app/services/tmbd/tmdb.service';

describe('MovieListPage (class)', () => {
  let component: MovieListPage;
  let mockService: any;
  const mockListData = [] as IMovieListData[];

  beforeEach(() => {
    mockService = {
      getDiscoverSortByOptions: jest.fn().mockReturnValue(of({ sortBy: [], genres: [] })),
      getDiscoverMovies: jest.fn().mockReturnValue(of({ results: mockListData, total_pages: 1 }))
    };
    component = new MovieListPage(mockService);
  });

  it('should instantiate', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getMovieList and loadListOptions', () => {
    jest.spyOn(component as any, 'getMovieList');
    jest.spyOn(component as any, 'loadListOptions');
    component.ngOnInit();
    expect((component as any).getMovieList).toHaveBeenCalled();
    expect((component as any).loadListOptions).toHaveBeenCalled();
  });

  it('handlePage should update params.page and call getMovieList when valid', () => {
    jest.spyOn(component as any, 'getMovieList');
    component.totalPages = 5;
    component.handlePage(3);
    expect(component.params.page).toBe(3);
    expect((component as any).getMovieList).toHaveBeenCalled();
  });

  it('handlePage should not call getMovieList when page out of range', () => {
    jest.spyOn(component as any, 'getMovieList');
    component.totalPages = 2;
    component.handlePage(5);
    expect((component as any).getMovieList).not.toHaveBeenCalled();
  });

});
