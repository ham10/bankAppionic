import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionClientPage } from './transaction-client.page';

describe('TransactionClientPage', () => {
  let component: TransactionClientPage;
  let fixture: ComponentFixture<TransactionClientPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransactionClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
