import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScannerPayerPage } from './scanner-payer.page';

describe('ScannerPayerPage', () => {
  let component: ScannerPayerPage;
  let fixture: ComponentFixture<ScannerPayerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScannerPayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
