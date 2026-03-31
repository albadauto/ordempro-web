import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CreateAccount } from './pages/create-account/create-account';
import { Main } from './pages/main/main';
import { authGuard } from './guards/auth-guard';
import { Customers } from './pages/customers/customers';
import { Customersform } from './pages/customersform/customersform';
import { ServiceOrder } from './pages/service-order/service-order';
import { ServiceOrderForm } from './pages/service-order-form/service-order-form';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'create-account', component: CreateAccount},
  { path: 'main', component: Main, canActivate:[authGuard]},
  { path: 'customers', component: Customers, canActivate:[authGuard]},
  { path: 'customers/new', component: Customersform, canActivate:[authGuard]},
  { path: 'customers/edit/:id', component: Customersform, canActivate:[authGuard]},
  { path: 'services-order', component: ServiceOrder, canActivate:[authGuard]},
  { path: 'services-order/new', component: ServiceOrderForm, canActivate:[authGuard]},
  { path: 'services-order/edit/:id', component: ServiceOrderForm, canActivate:[authGuard]},
  { path: 'services-order/view/:id', component: ServiceOrderForm, canActivate:[authGuard]},
];
