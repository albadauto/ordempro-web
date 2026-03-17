import { Routes } from '@angular/router';
import { Login } from './login/login';
import { CreateAccount } from './create-account/create-account';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'create-account', component: CreateAccount}
];
