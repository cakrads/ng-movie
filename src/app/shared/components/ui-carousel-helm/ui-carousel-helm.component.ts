import { Component, Input } from '@angular/core';
import { HlmCarouselComponent, HlmCarouselContentComponent, HlmCarouselItemComponent, HlmCarouselNextComponent, HlmCarouselPreviousComponent } from '@spartan-ng/ui-carousel-helm';

@Component({
  selector: 'carousel',
  imports: [HlmCarouselComponent, HlmCarouselContentComponent, HlmCarouselItemComponent, HlmCarouselNextComponent, HlmCarouselPreviousComponent],
  templateUrl: './ui-carousel-helm.component.html',
})
export class CarouselComponent {
  @Input({ required: true }) items: any[] = [];
}