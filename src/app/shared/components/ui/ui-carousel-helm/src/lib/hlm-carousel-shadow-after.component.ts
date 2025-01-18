import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-carousel-shadow-after',
  host: {
    '[class]': '_computedClass()',
  },
  template: ` <ng-content /> `,
})
export class HlmCarouselShadowAfterComponent {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(
      'absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2',
      'bg-gradient-to-r from-transparent to-90% to-background  w-16 h-[calc(100%+10px)]',
      this.userClass()
    )
  );
}
