import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { hlmH1, hlmP } from './shared/components/ui-typography-helm/src';
import { HlmButtonDirective } from './shared/components/ui-button-helm/src';
import { CarouselComponent } from './shared/components/ui-carousel-helm/ui-carousel-helm.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HlmButtonDirective,
    CarouselComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'my-movie';
  hlmH1 = hlmH1;
  hlmP = hlmP;
  carouselItems = Array.from({ length: 5 }, (_, i) => i + 1);
}
