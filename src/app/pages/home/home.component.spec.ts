/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { TmdbService } from '@app/services/tmbd/tmdb.service';
import { HomePage } from './home.component';

describe('HomeComponent', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    const mockList = { results: [], total_pages: 1 } as any;
    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        { provide: TmdbService, useValue: {
            getTrending: () => of(mockList),
            getPopularMovie: () => of(mockList),
            getNowPlaying: () => of(mockList),
            getUpcoming: () => of(mockList)
        } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
