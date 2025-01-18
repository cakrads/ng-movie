/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TmdbService } from './tmdb.service';

describe('Service: Tmdb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TmdbService],
    });
  });

  it('should ...', inject([TmdbService], (service: TmdbService) => {
    expect(service).toBeTruthy();
  }));
});
