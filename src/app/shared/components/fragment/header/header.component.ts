import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) readonly platformId: Object) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      this.isScrolled = scrollPosition > 50;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      if (window) {
        const scrollPosition =
          window.scrollY || document.documentElement.scrollTop;
        this.isScrolled = scrollPosition > 50; // Change based on desired scroll offset
      }
    }
  }
}
