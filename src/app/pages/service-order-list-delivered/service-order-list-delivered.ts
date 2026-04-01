import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageUtils } from '../../../utils/StorageUtils';
import { ServiceOrderService } from '../../services/serviceorder/service-order-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-service-order-list-delivered',
  imports: [FormsModule, DatePipe],
  templateUrl: './service-order-list-delivered.html',
  styleUrl: './service-order-list-delivered.css',
})
export class ServiceOrderListDelivered {
  baseMonth: number = 0;
  baseYear: number = 0;
  years: any[] = [];
  serviceOrderList: any = [];
  isLoading: boolean = false;

  constructor(
    private serviceOrderService: ServiceOrderService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.getDescYears();
  }

  filter() {
    this.isLoading = true;

    let data = {
      insertDate: this.getBaseDate(),
      tenantId: StorageUtils.getTenantId(),
    };
    this.serviceOrderService.getOSDelivered(data).subscribe({
      next: (data) => {
        this.serviceOrderList = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
  getBaseDate() {
    return new Date(this.baseYear, this.baseMonth - 1, 1).toISOString().split('T')[0];
  }

  getDescYears() {
    let nowYear = new Date().getFullYear();
    for (let i = nowYear; i >= nowYear - 4; i--) {
      this.years.push(i);
    }
  }
}
