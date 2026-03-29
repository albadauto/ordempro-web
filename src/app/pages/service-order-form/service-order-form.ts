import { ChangeDetectorRef, Component } from '@angular/core';
import { ServiceOrderService } from '../../services/serviceorder/service-order-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { MessageService } from '../../services/message/message-service';
import { CustomerService } from '../../services/customers/customer-service';

@Component({
  selector: 'app-service-order-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './service-order-form.html',
  styleUrl: './service-order-form.css',
})
export class ServiceOrderForm {
  status: any[] = [];
  isLoading = false;
  form: FormGroup;
  customers: any[] = [];

  constructor(
    private serviceOrder: ServiceOrderService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageService,
    private customerService: CustomerService,
  ) {
    this.form = this.fb.group({
      customerId: ['', Validators.required],
      obs: ['', [Validators.required]],
      tenantId: localStorage.getItem('tenant'),
      statusId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllStatus();
    this.getAllCustomers();
  }

  getAllStatus() {
    this.isLoading = true;
    this.serviceOrder.getStatus().subscribe({
      next: (data) => {
        this.status = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  getAllCustomers() {
    this.isLoading = true;
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        console.log(data);
        this.customers = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  submit() {
    this.serviceOrder.createServiceOrder(this.form.value).subscribe({
      next: (data) => {
        this.messageService.setMessage(`Ordem de serviço ${data.data} criada com sucesso!`);
        this.router.navigate(['/services-order']);
      },
      error: (error) => {
        console.log(this.form.value);
        console.log(error);
      },
    });
  }
}
