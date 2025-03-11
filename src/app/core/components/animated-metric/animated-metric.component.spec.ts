import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedMetricComponent } from './animated-metric.component';

describe('AnimatedMetricComponent', () => {
  let component: AnimatedMetricComponent;
  let fixture: ComponentFixture<AnimatedMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedMetricComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
