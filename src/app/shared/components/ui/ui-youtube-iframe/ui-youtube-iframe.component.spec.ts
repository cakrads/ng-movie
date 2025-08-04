/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { YoutubeIframeComponent } from './ui-youtube-iframe.component';

describe('UiYoutubeIframeComponent', () => {
  let component: YoutubeIframeComponent;
  let fixture: ComponentFixture<YoutubeIframeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ YoutubeIframeComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeIframeComponent);
    component = fixture.componentInstance;
    // provide a videoId so updateVideoUrl() sets a SafeResourceUrl
    component.videoId = 'test123';
    component.title = 'Test Video';
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
