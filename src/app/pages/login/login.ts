import { Component, signal } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login-service';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginService,
    private routeTransfer: Router,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  accountIsCreated: boolean = false;
  loginFailed = signal(false);
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['created']) {
        this.accountIsCreated = true;
      }
    });

    this.authService.logout()
  }

  submit() {
    this.loginFailed.set(false); // 👈 reset aqui
    this.loginService.login(this.form.value).subscribe({
      next: (data) => {
        this.routeTransfer.navigate(['/main']);
        this.authService.login();
        localStorage.setItem('token', data.token);
        localStorage.setItem('tenant', data.idTenant);
      },
      error: (err) => {
        this.loginFailed.set(true);
      },
    });
  }
}
