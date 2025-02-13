/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiYoutubeIframeComponent } from './ui-youtube-iframe.component';

describe('UiYoutubeIframeComponent', () => {
  let component: UiYoutubeIframeComponent;
  let fixture: ComponentFixture<UiYoutubeIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiYoutubeIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiYoutubeIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
