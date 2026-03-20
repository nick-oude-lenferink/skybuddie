import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AirfieldsPage } from './airfields.page';

describe('AirfieldsPage', () => {
  let component: AirfieldsPage;
  let fixture: ComponentFixture<AirfieldsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AirfieldsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
