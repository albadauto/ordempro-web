import { ChangeDetectorRef, Component } from '@angular/core';
import { ServiceOrderService } from '../../services/serviceorder/service-order-service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
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
  id: number | null = null;
  isReadOnly = false;

  constructor(
    private serviceOrder: ServiceOrderService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private customerService: CustomerService,
  ) {
    this.form = this.fb.group({
      id: [null, Validators.required],
      orderNumber: [null, Validators.required],
      customerId: ['', Validators.required],
      obs: ['', [Validators.required]],
      tenantId: localStorage.getItem('tenant'),
      statusId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllStatus();
    this.getAllCustomers();
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? Number(param) : null;
    const mode = this.route.snapshot.queryParamMap.get('mode');

    if (this.id) {
      this.isReadOnly = mode === 'view';

      this.getServiceOrder(this.id);
    }
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

  getServiceOrder(id: any) {
    this.serviceOrder.getServiceOrderById(id).subscribe({
      next: (data) => {
        this.form.patchValue(data);

        if (this.isReadOnly) {
          this.form.disable();
        }
      },
    });
  }

  deleteService(id: any) {
    this.serviceOrder.deleteServiceOrder(id).subscribe({
      next: (data) => {
        this.router.navigate(['/services-order']);
        this.messageService.setMessage('Excluido com sucesso!');
      },
    });
  }

  getAllCustomers() {
    this.isLoading = true;
    this.customerService.getCustomers().subscribe({
      next: (data) => {
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
    if (this.id) {
      this.serviceOrder.editService(this.id, this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/services-order']);
        },
      });
    } else {
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
}
