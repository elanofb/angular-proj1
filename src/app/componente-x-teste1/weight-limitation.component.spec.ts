import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightLimitationComponent } from './weight-limitation.component';

describe('WeightLimitationComponent', () => {
  let component: WeightLimitationComponent;
  let fixture: ComponentFixture<WeightLimitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLimitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLimitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
