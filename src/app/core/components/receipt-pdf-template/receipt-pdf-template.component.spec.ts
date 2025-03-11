import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptPdfTemplateComponent } from './receipt-pdf-template.component';

describe('ReceiptPdfTemplateComponent', () => {
  let component: ReceiptPdfTemplateComponent;
  let fixture: ComponentFixture<ReceiptPdfTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptPdfTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptPdfTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
