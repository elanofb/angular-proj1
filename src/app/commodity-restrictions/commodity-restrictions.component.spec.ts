import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityRestrictionsComponent } from './commodity-restrictions.component';

describe('CommodityRestrictionsComponent', () => {
  let component: CommodityRestrictionsComponent;
  let fixture: ComponentFixture<CommodityRestrictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommodityRestrictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityRestrictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
