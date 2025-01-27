import { Component, Input } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HlmScrollAreaDirective } from '@app/shared/components/ui/ui-scrollarea-helm/src';
import { NgClass } from '@angular/common';

@Component({
  selector: 'hlm-scroll-area',
  standalone: true,
  imports: [HlmScrollAreaDirective, NgScrollbarModule, NgClass],
  template: `
  <ng-scrollbar hlm class="w-full">
    <div [ngClass]="['flex', gapEnabled ? 'gap-4' : '']">
        <ng-content />
    </div>
  </ng-scrollbar>
  `,
})
export class HlmScrollAreaComponent {
  @Input() customClass: string | undefined;
  @Input() gapEnabled = true;
}