import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollingNumberComponent } from './rolling-number.component';

describe('RollingNumberComponent', () => {
  let component: RollingNumberComponent;
  let fixture: ComponentFixture<RollingNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollingNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollingNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
