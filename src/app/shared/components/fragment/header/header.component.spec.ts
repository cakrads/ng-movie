/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should set isScrolled false when scroll position <=20', () => {
    Object.defineProperty(document.documentElement, 'scrollTop', { get: () => 10, configurable: true });
    component.ngOnInit();
    expect(component.isScrolled).toBe(false);
  });

  it('should set isScrolled true when scroll position >20', () => {
    Object.defineProperty(document.documentElement, 'scrollTop', { get: () => 30, configurable: true });
    component.ngOnInit();
    expect(component.isScrolled).toBe(true);
  });

  it('should update isScrolled on window scroll event', () => {
    Object.defineProperty(document.documentElement, 'scrollTop', { get: () => 30, configurable: true });
    component.onWindowScroll();
    expect(component.isScrolled).toBe(true);
  });
});
