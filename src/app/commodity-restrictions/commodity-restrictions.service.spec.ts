import { TestBed } from '@angular/core/testing';

import { CommodityRestrictionsService } from './commodity-restrictions.service';

describe('CommodityRestrictionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommodityRestrictionsService = TestBed.get(CommodityRestrictionsService);
    expect(service).toBeTruthy();
  });
});
