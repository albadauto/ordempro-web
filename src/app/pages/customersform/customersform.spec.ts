import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customersform } from './customersform';

describe('Customersform', () => {
  let component: Customersform;
  let fixture: ComponentFixture<Customersform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Customersform],
    }).compileComponents();

    fixture = TestBed.createComponent(Customersform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
