import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeBankPage } from './home-bank.page';

describe('HomeBankPage', () => {
  let component: HomeBankPage;
  let fixture: ComponentFixture<HomeBankPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeBankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
