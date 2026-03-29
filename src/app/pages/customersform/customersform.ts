import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customers/customer-service';
import { MaskHelper } from '../../../helpers/MaskHelper';

@Component({
  selector: 'app-customersform',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './customersform.html',
  styleUrl: './customersform.css',
})
export class Customersform {
  form: FormGroup;
  isLoading: boolean = false;
  id: number | null = null;
  isLoadingEditForm = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private custumerService: CustomerService,
    public maskHelper: MaskHelper,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', Validators.required],
      address: ['', [Validators.required]],
      number: ['', [Validators.required]],
      name: ['', [Validators.required]],
      tenantId: localStorage.getItem('tenant'),
    });
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? Number(param) : null;

    if (this.id) {
      this.loadCustomer(this.id);
    }
  }

  loadCustomer(id: number) {
    this.isLoadingEditForm = true;
    this.custumerService.getCustomer(id).subscribe({
      next: (data) => {
        this.form.patchValue(data);
      },
    });
    this.isLoadingEditForm = false;
  }

  onPhoneInput() {
    const control = this.form.get('whatsapp');
    control?.setValue(this.maskHelper.maskPhone(control.value), { emitEvent: false });
  }
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    if (this.id) {
      this.custumerService.updateCustomer(this.id, this.form.value).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.router.navigate([`/customers`]);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      console.log(this.form.value)
      this.custumerService.createCustomer(this.form.value).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.router.navigate([`/customers`]);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
  get f() {
    return this.form.controls;
  }
}
