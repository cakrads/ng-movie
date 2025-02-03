import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isBrowser: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) readonly platformId: Object,
    readonly router: Router
  ) { }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      this.isScrolled = scrollPosition > 20;
    }
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      if (window) {
        const scrollPosition =
          window.scrollY || document.documentElement.scrollTop;
        this.isScrolled = scrollPosition > 20; // Change based on desired scroll offset
      }
    }
  }
}
