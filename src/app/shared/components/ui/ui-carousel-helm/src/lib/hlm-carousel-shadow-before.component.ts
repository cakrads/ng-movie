import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-carousel-shadow-before',
  host: {
    '[class]': '_computedClass()',
  },
  template: ` <ng-content /> `,
})
export class HlmCarouselShadowABeforeComponent {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(
      'absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2',
      'bg-gradient-to-r from-background to-90% to-transparent w-8 md:w-16 h-[calc(100%+10px)]',
      this.userClass()
    )
  );
}
