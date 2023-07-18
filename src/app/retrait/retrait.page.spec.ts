import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetraitPage } from './retrait.page';

describe('RetraitPage', () => {
  let component: RetraitPage;
  let fixture: ComponentFixture<RetraitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RetraitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
