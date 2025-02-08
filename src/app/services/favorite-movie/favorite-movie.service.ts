import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMovieService {
  private readonly storageKey = 'favoriteMovies';

  constructor() { }

  getFavorites(): number[] {
    const storedMovies = localStorage.getItem(this.storageKey);
    return storedMovies ? JSON.parse(storedMovies) : [];
  }

  addFavorite(movieId: number): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(movieId: number): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(id => id !== movieId);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(movieId: number): boolean {
    return this.getFavorites().includes(movieId);
  }
}
