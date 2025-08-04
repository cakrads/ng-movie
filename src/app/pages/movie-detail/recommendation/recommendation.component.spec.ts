/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { RecommendationComponent } from './recommendation.component';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '@app/services/tmbd/tmdb.service';

describe('RecommendationComponent', () => {
  let component: RecommendationComponent;
  let fixture: ComponentFixture<RecommendationComponent>;

  beforeEach(waitForAsync(() => {
    const mockRec = { results: [{ id:1, title:'A'}] } as any;
    TestBed.configureTestingModule({
      imports: [ RecommendationComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ movieId: '1' }) } },
        { provide: TmdbService, useValue: { getRecommendation: () => of(mockRec) } }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
