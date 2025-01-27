import { NgModule } from '@angular/core';
import { HlmScrollAreaDirective } from './lib/hlm-scroll-area.directive';

export * from './lib/hlm-scroll-area.directive';
export * from './lib/hlm-scroll-area.component';

@NgModule({
	imports: [HlmScrollAreaDirective],
	exports: [HlmScrollAreaDirective],
})
export class HlmScrollAreaModule { }
