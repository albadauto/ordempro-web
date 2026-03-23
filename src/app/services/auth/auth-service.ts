import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false);

  auth$ = this.authSubject.asObservable();

  constructor(
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  login() {
    this.authSubject.next(true);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.route.navigate(['']);
      this.authSubject.next(false);
    }
  }
}
