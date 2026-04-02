import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth-service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ordem-pro-web');
  isOpen = false;
  isLoggedIn$: Observable<boolean>;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  open = false;
  constructor(
    public authService: AuthService,
  ) {
    this.isLoggedIn$ = this.authService.auth$;
  }
}
