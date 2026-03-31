import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private message: string | null = null;

  setMessage(msg: string) {
    this.message = msg;
  }

  getMessage(): string | null {
    const msg = this.message;
    this.message = null;
    return msg;
  }
}
