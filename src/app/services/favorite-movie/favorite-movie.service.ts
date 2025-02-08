import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMovieService {
  private readonly storageKey = 'favoriteMovies';

  constructor(
    @Inject(PLATFORM_ID) readonly platformId: any
  ) { }

  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
  }

  getFavorites(): number[] {
    if (!this.isLocalStorageAvailable()) return [];

    const storedMovies = localStorage.getItem(this.storageKey);
    return storedMovies ? JSON.parse(storedMovies) : [];
  }

  addFavorite(movieId: number): void {
    if (!this.isLocalStorageAvailable()) return;

    const favorites = this.getFavorites();
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(movieId: number): void {
    if (!this.isLocalStorageAvailable()) return;

    let favorites = this.getFavorites();
    favorites = favorites.filter(id => id !== movieId);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(movieId: number): boolean {
    return this.getFavorites().includes(movieId);
  }
}
