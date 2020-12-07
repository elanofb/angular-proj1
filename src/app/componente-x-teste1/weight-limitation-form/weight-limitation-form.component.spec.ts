import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightLimitationFormComponent } from './weight-limitation-form.component';

describe('WeightLimitationFormComponent', () => {
  let component: WeightLimitationFormComponent;
  let fixture: ComponentFixture<WeightLimitationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLimitationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLimitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
