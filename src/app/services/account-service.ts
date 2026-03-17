import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createTenant(data: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/tenant`, data);
  }
}
