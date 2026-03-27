import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceOrderService } from '../../services/serviceorder/service-order-service';
import { MessageService } from '../../services/message/message-service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service-order',
  imports: [RouterLink],
  templateUrl: './service-order.html',
  styleUrl: './service-order.css',
})
export class ServiceOrder {
  messageForm: string = ""
  constructor(
    private serviceOrderService: ServiceOrderService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    const message = this.messageService.getMessage();
    if(message) {
      this.messageForm = message;
    }
  }
}
