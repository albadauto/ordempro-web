import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Iniciamos o Subject. O valor será atualizado no constructor.
  private authSubject = new BehaviorSubject<boolean>(false);
  auth$ = this.authSubject.asObservable();

  constructor(
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // ESSENCIAL: Chama a verificação assim que o serviço é instanciado
    this.checkToken();
  }

  private checkToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        // Se achou o token, avisa a todos os inscritos (incluindo a navbar)
        this.authSubject.next(true);
      } else {
        this.authSubject.next(false);
      }
    }
  }

  login(token: string, idTenant: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('tenant', idTenant);
      this.authSubject.next(true);
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.authSubject.next(false);
      this.route.navigate(['/']); // Redireciona para a home ou login
    }
  }
}
