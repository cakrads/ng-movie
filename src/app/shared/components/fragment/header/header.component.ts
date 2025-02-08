import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { HeaderMobileComponent } from './header-mobile-menu/header-mobile-menu.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';

@Component({
  selector: 'app-header',
  imports: [NgClass, HeaderMenuComponent, HeaderMobileComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isBrowser: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) readonly platformId: Object,
  ) { }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      this.isScrolled = scrollPosition > 20;
    }
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
