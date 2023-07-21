import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTransactionPage } from './home-transaction.page';

describe('HomeTransactionPage', () => {
  let component: HomeTransactionPage;
  let fixture: ComponentFixture<HomeTransactionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
