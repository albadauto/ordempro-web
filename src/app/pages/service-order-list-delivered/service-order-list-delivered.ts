import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageUtils } from '../../../utils/StorageUtils';
import { ServiceOrderService } from '../../services/serviceorder/service-order-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message/message-service';

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
  hasFiltetered: boolean = false;
  hasErrorFilter: boolean = false;
  searchTerm: string = '';
  filteredOsList: any[] = [];

  constructor(
    private serviceOrderService: ServiceOrderService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageService,
  ) {}
  ngOnInit() {
    this.getDescYears();
  }

  filter() {
    if (!this.baseYear || !this.baseMonth) {
      this.hasErrorFilter = true;
      return;
    }
    this.hasErrorFilter = false;
    this.isLoading = true;
    this.hasFiltetered = true;
    let data = {
      insertDate: this.getBaseDate(),
      tenantId: new StorageUtils().getTenantId(),
    };
    this.serviceOrderService.getOSDelivered(data).subscribe({
      next: (data) => {
        this.serviceOrderList = data;
        this.filteredOsList = [...this.serviceOrderList];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.serviceOrderList = [];
        this.cdr.detectChanges();
      },
    });
  }
  filteredOS() {
    const term = this.searchTerm.toLowerCase();
    this.filteredOsList = this.serviceOrderList.filter(
      (os: any) =>
        os.customer.name.toLowerCase().includes(term) ||
        os.customer.email.toLowerCase().includes(term),
    );
  }

  getBaseDate() {
    return new Date(this.baseYear, this.baseMonth - 1, 1).toISOString().split('T')[0];
  }

  deleteService(id: any) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      this.serviceOrderService.deleteServiceOrder(id).subscribe({
        next: (data) => {
          this.serviceOrderList = this.serviceOrderList.filter((x: any) => x.id !== id);
          this.cdr.detectChanges();
        },
      });
    }
  }

  getDescYears() {
    let nowYear = new Date().getFullYear();
    for (let i = nowYear; i >= nowYear - 4; i--) {
      console.log(i);
      this.years.push(i);
    }
  }
}
