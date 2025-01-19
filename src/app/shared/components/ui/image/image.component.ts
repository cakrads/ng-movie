import { Component, computed, input, Input } from '@angular/core';
import {
  NgClass,
  NgOptimizedImage,
  NgStyle,
  provideImgixLoader,
} from '@angular/common';
import { hlm } from '@spartan-ng/ui-core';
import { ClassValue } from 'clsx';

@Component({
  selector: 'app-image:not(p)',
  imports: [NgOptimizedImage, NgStyle, NgClass],
  // providers: [
  //   provideImgixLoader('https://my.base.url/') // Replace with your base Imgix URL
  // ],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() ngSrc!: string; // Image source (required)
  @Input() alt!: string; // Alt text for the image
  @Input() width: number = 0; // Width of the image
  @Input() height: number = 0; // Height of the image
  @Input() prioritize = false; // Whether to prioritize loading the image
  @Input() aspectRatio!: number; // Aspect ratio for the container (width / height)
  @Input() zoom: boolean = false; // Custom style for the container
  @Input() fill: boolean = false; // Custom style for the container

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  figureClass = computed(() =>
    hlm('relative', 'overflow-hidden', 'drop-shadow', this.userClass())
  );
}
