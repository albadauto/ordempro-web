import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../services/account-service';
import { finalize } from 'rxjs';
import { MaskHelper } from '../../helpers/MaskHelper';

@Component({
  selector: 'app-create-account',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css',
})
export class CreateAccount {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private maskHelper: MaskHelper
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cnpj: ['', Validators.required],
      whatsapp: ['', Validators.required],
    });
  }

  onCnpjInput() {
    const control = this.form.get('cnpj');
    control?.setValue(this.maskHelper.maskCNPJ(control.value), { emitEvent: false });
  }

  onPhoneInput() {
    const control = this.form.get('whatsapp');
    control?.setValue(this.maskHelper.maskPhone(control.value), { emitEvent: false });
  }

  submit() {
    this.isLoading = true;

    this.accountService
      .createTenant(this.form.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (result) => {
          console.log('Sucesso');
          this.form.reset();
          this.isLoading = false;
          this.router.navigate(['/'], { queryParams: { created: true } });
        },
        error: (err) => {
          console.log('Erro');
          this.isLoading = false;
          this.router.navigate(['/'], { queryParams: { created: false } });
        },
      });
  }
}
