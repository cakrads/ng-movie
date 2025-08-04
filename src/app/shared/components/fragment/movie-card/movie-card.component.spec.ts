/* tslint:disable:no-unused-variable */

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ MovieCardComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    // provide required @Input() values
    component.movie = {
      id: 1,
      title: 'Test Movie',
      backdrop_path: '/back.jpg',
      poster_path: '/post.jpg',
      release_date: '2025-01-01',
      overview: 'This is a test overview.',
      vote_average: 7.9
    } as any;
    component.variant = 'horizontal';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
