import { NgClass } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImageComponent } from '@components/ui/image/image.component';
import { hlmH1 } from '@components//ui/ui-typography-helm/src';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  imports: [NgClass, ImageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailPage {
  hlmH1 = hlmH1;

  constructor() {}
}
