import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { hlmH1, hlmP } from './shared/components/ui/ui-typography-helm/src';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CarouselComponent } from '@components/caraousel/carousel.component';
import { ImageComponent } from './shared/components/image/image.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HlmButtonDirective,
    CarouselComponent,
    ImageComponent
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
