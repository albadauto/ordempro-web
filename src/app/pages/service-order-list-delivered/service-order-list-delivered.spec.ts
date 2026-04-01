import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderListDelivered } from './service-order-list-delivered';

describe('ServiceOrderListDelivered', () => {
  let component: ServiceOrderListDelivered;
  let fixture: ComponentFixture<ServiceOrderListDelivered>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrderListDelivered],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceOrderListDelivered);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
