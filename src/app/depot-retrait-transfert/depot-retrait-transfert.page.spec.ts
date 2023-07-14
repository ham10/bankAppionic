import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepotRetraitTransfertPage } from './depot-retrait-transfert.page';

describe('DepotRetraitTransfertPage', () => {
  let component: DepotRetraitTransfertPage;
  let fixture: ComponentFixture<DepotRetraitTransfertPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DepotRetraitTransfertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
