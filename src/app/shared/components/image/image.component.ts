import { Component, Input } from '@angular/core';
import {
  NgClass,
  NgOptimizedImage,
  NgStyle,
  provideImgixLoader,
} from '@angular/common';
import { HlmAspectRatioDirective } from '@spartan-ng/ui-aspectratio-helm';

@Component({
  selector: 'app-image:not(p)',
  imports: [NgOptimizedImage, HlmAspectRatioDirective, NgStyle, NgClass],
  // providers: [
  //   provideImgixLoader('https://my.base.url/') // Replace with your base Imgix URL
  // ],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() ngSrc!: string; // Image source (required)
  @Input() alt!: string; // Alt text for the image
  @Input() width!: number; // Width of the image
  @Input() height!: number; // Height of the image
  @Input() prioritize = false; // Whether to prioritize loading the image
  @Input() aspectRatio!: number; // Aspect ratio for the container (width / height)
  @Input() customClass: string = ''; // Custom class for the container
}
