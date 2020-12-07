import { TestBed } from '@angular/core/testing';

import { WeightLimitationService } from './weight-limitation.service';

describe('WeightLimitationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeightLimitationService = TestBed.get(WeightLimitationService);
    expect(service).toBeTruthy();
  });
});
