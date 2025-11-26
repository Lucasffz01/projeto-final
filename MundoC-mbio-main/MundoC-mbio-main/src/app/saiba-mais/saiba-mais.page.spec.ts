import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaibaMaisPage } from './saiba-mais.page';

describe('SaibaMaisPage', () => {
  let component: SaibaMaisPage;
  let fixture: ComponentFixture<SaibaMaisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaibaMaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
