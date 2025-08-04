import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';

import { FavoriteMovieService } from './favorite-movie.service';

describe('FavoriteMovieService', () => {
  let service: FavoriteMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavoriteMovieService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(FavoriteMovieService);
    localStorage.clear();
  });

  it('should return empty favorites if not running in browser', () => {
    // Test server scenario by creating a new instance with server platform
    const srvServer = new FavoriteMovieService('server' as any);
    expect(srvServer.getFavorites()).toEqual([]);
  });

  it('should get empty favorites initially', () => {
    expect(service.getFavorites()).toEqual([]);
  });

  it('should addFavorite and persist in localStorage', () => {
    service.addFavorite(101);
    expect(service.getFavorites()).toEqual([101]);
    // storage should contain JSON array
    const stored = localStorage.getItem('favoriteMovies');
    expect(JSON.parse(stored!)).toEqual([101]);
  });

  it('should not add duplicates', () => {
    service.addFavorite(202);
    service.addFavorite(202);
    expect(service.getFavorites()).toEqual([202]);
  });

  it('should remove favorite', () => {
    service.addFavorite(303);
    expect(service.getFavorites()).toContain(303);
    service.removeFavorite(303);
    expect(service.getFavorites()).not.toContain(303);
  });

  it('isFavorite should detect existing and non-existing', () => {
    service.addFavorite(404);
    expect(service.isFavorite(404)).toBe(true);
    expect(service.isFavorite(505)).toBe(false);
  });
});
