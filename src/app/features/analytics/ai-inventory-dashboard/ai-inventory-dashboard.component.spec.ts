import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiInventoryDashboardComponent } from './ai-inventory-dashboard.component';

describe('AiInventoryDashboardComponent', () => {
  let component: AiInventoryDashboardComponent;
  let fixture: ComponentFixture<AiInventoryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiInventoryDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiInventoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
