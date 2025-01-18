import { Input, NgModule } from '@angular/core';
import { HlmCarouselContentComponent } from './lib/hlm-carousel-content.component';
import { HlmCarouselItemComponent } from './lib/hlm-carousel-item.component';
import { HlmCarouselNextComponent } from './lib/hlm-carousel-next.component';
import { HlmCarouselPreviousComponent } from './lib/hlm-carousel-previous.component';
import { HlmCarouselComponent } from './lib/hlm-carousel.component';
import { HlmCarouselShadowAfterComponent } from './lib/hlm-carousel-shadow-after.component';
import { HlmCarouselShadowABeforeComponent } from './lib/hlm-carousel-shadow-before.component';

export * from './lib/hlm-carousel-content.component';
export * from './lib/hlm-carousel-item.component';
export * from './lib/hlm-carousel-next.component';
export * from './lib/hlm-carousel-previous.component';
export * from './lib/hlm-carousel-shadow-before.component';
export * from './lib/hlm-carousel-shadow-after.component';
export * from './lib/hlm-carousel.component';

export const HlmCarouselImports = [
  HlmCarouselComponent,
  HlmCarouselContentComponent,
  HlmCarouselItemComponent,
  HlmCarouselPreviousComponent,
  HlmCarouselNextComponent,
  HlmCarouselShadowABeforeComponent,
  HlmCarouselShadowAfterComponent,
] as const;

@NgModule({
  imports: [...HlmCarouselImports],
  exports: [...HlmCarouselImports],
})
export class HlmCarouselModule {}
