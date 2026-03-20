import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AirfieldPage } from './airfield.page';

describe('AirfieldPage', () => {
  let component: AirfieldPage;
  let fixture: ComponentFixture<AirfieldPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AirfieldPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
