import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-iframe',
  templateUrl: './ui-youtube-iframe.component.html',
  imports: [CommonModule],
})
export class YoutubeIframeComponent {
  @Input() title: string = '';
  @Input() videoId!: string;
  videoUrl!: SafeResourceUrl;

  constructor(private readonly sanitizer: DomSanitizer) { }

  ngOnChanges() {
    this.updateVideoUrl();
  }

  updateVideoUrl() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
  }
}