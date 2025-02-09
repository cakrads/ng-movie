import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAlignJustify, lucideAlignVerticalJustifyCenter } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { BrnSheetContentDirective, BrnSheetTriggerDirective } from '@spartan-ng/brain/sheet';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetHeaderComponent,
} from '@spartan-ng/ui-sheet-helm';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [
    NgIcon,
    HlmIconDirective,
    BrnSheetTriggerDirective,
    BrnSheetContentDirective,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetHeaderComponent,
    HlmButtonDirective,

    HeaderMenuComponent,
  ],
  providers: [provideIcons({ lucideAlignJustify })],
  template: `
    <hlm-sheet side="right">
      <button id="mobile-menu" variant="outline" brnSheetTrigger hlmBtn>
        <ng-icon
        hlm
          class="text-white"
          name="lucideAlignJustify"
        />
      </button>
      <hlm-sheet-content *brnSheetContent="let ctx">
        <hlm-sheet-header class="mb-4">
          <div
            class="font-extrabold text-2xl lg:text-2xl scroll-m-20 tracking-tight text-primary"
          >
            <a href="/" class="text-foreground">Ng-Animation</a>
          </div>
        </hlm-sheet-header>
        <menu>
          <app-header-menu></app-header-menu>
        </menu>
      </hlm-sheet-content>
    </hlm-sheet>

  `,
})
export class HeaderMobileComponent { }