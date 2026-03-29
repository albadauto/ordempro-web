import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceOrderService } from '../../services/serviceorder/service-order-service';
import { MessageService } from '../../services/message/message-service';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-order',
  imports: [RouterLink, CommonModule],
  templateUrl: './service-order.html',
  styleUrl: './service-order.css',
})
export class ServiceOrder {
  messageForm: string = '';
  serviceOrders: any[] = [];
  isLoading = false;
  constructor(
    private serviceOrderService: ServiceOrderService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const message = this.messageService.getMessage();
    if (message) {
      this.messageForm = message;
    }
    this.getAllServiceOrders();
  }

  getAllServiceOrders(): void {
    this.isLoading = true;
    this.serviceOrderService.gelAllServiceOrder().subscribe({
      next: (data) => {
        this.serviceOrders = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  getBadgeClass(id: number): string {
    switch (id) {
      case 1:
        return 'bg-yellow-100 text-yellow-700';
      case 2:
        return 'bg-blue-100 text-blue-700';
      case 3:
        return 'bg-green-100 text-green-700';
      case 4:
        return 'bg-red-100 text-red-700';
      case 5:
        return 'bg-purple-100 text-purple-700';
      case 6:
        return 'bg-black text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
