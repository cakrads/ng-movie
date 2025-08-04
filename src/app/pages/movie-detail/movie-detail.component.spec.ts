/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { MovieDetailPage } from './movie-detail.component';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '@app/services/tmbd/tmdb.service';
import { FavoriteMovieService } from '@app/services/favorite-movie/favorite-movie.service';

describe('MovieDetailPage', () => {
  let component: MovieDetailPage;
  let fixture: ComponentFixture<MovieDetailPage>;

  beforeEach(async () => {
    const mockDetail = { id: 1, backdrop_path: '', poster_path: '', title: 'Test', release_date: '', overview: '', vote_average: 5 };
    await TestBed.configureTestingModule({
      imports: [MovieDetailPage],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ movieId: '1' }) } },
        { provide: TmdbService, useValue: { getDetail: () => of(mockDetail) } },
        { provide: FavoriteMovieService, useValue: { isFavorite: () => false, addFavorite: () => {}, removeFavorite: () => {} } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
