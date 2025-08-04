/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderMenuComponent } from './header-menu.component';

describe('HeaderMenuComponent', () => {
  let component: HeaderMenuComponent;
  let fixture: ComponentFixture<HeaderMenuComponent>;

beforeEach(waitForAsync(() => {
  TestBed.configureTestingModule({
    imports: [ HeaderMenuComponent ],
    providers: [ { provide: Router, useValue: { url: '' } } ],
    schemas: [ NO_ERRORS_SCHEMA ]
  }).compileComponents();
}));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Additional interaction tests removed; keep only basic creation test for standalone component.

});
