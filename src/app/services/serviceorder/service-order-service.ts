import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceOrderService {
  private apiUrl = environment.apiUrl;
  private bearer = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  getStatus(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    })

    return this.http.get(`${this.apiUrl}/status/get-all`, { headers: headers })
  }

  createServiceOrder(data: any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    })

    return this.http.post(`${this.apiUrl}/serviceorder/create-order`, data, { headers: headers })
  }
}
