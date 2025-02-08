import { NgClass } from '@angular/common';
import {
  Component,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [
    NgClass,
  ],
  template: `
    <div class="flex flex-col md:flex-row">
      <a
        href="/"
        [ngClass]="[
          'text-xl py-4 !px-0 md:!p-4 transition',
          isActive('/') ? 'text-primary font-bold' : ''
        ]"
      >
        Home
      </a>
      <a
        href="/movie"
        [ngClass]="[
          'text-xl py-4 !px-0 md:!p-4 transition',
          isActive('/movie') ? 'text-primary font-bold' : ''
        ]"
      >
        Movies
      </a>
    </div>
  `
})
export class HeaderMenuComponent {
  constructor(
    readonly router: Router
  ) { }

  isActive(route: string): boolean {
    // Ensure home is only active when exactly "/"
    if (route === '/') {
      return this.router.url === '/';
    }

    return this.router.url.includes(route);
  }

}
