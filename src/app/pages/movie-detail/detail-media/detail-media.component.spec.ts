/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DetailMediaComponent } from './detail-media.component';

describe('DetailMediaComponent', () => {
  let component: DetailMediaComponent;
  let fixture: ComponentFixture<DetailMediaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ DetailMediaComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize loadingSkeleton with numbers 1 to 10', () => {
    expect(component.loadingSkeleton.length).toBe(10);
    expect(component.loadingSkeleton).toEqual([1,2,3,4,5,6,7,8,9,10]);
  });
  
  it('mediaInfo functions should build correct URLs', () => {
    const env = require('@environments/environment').environment;
    const thumb = component.mediaInfo.thumbnail('abc');
    expect(thumb).toBe(env.movieVideoThumbnail + 'abc' + '/hqdefault.jpg');
    const backdrop = component.mediaInfo.imageBackdropUrl('/back.jpg');
    expect(backdrop).toBe(env.movieMedia + 'w533_and_h300_bestv2' + '/back.jpg');
    const poster = component.mediaInfo.imagePosterUrl('/post.jpg');
    expect(poster).toBe(env.movieMedia + 'w220_and_h330_face' + '/post.jpg');
    const video = component.mediaInfo.videoUrl('xyz');
    expect(video).toBe(env.movieVideoUrl + 'xyz');
  });
  
  it('should open and close video and reflect dialogState', () => {
    expect(component.dialogState()).toBe('closed');
    component.handleOpenVideo('key1');
    expect(component.playVideo.open).toBe(true);
    expect(component.playVideo.videoKey).toBe('key1');
    expect(component.dialogState()).toBe('open');
    component.handleCloseVideo();
    expect(component.playVideo.open).toBe(false);
    expect(component.playVideo.videoKey).toBe('');
    expect(component.dialogState()).toBe('closed');
  });
});
