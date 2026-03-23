import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = environment.apiUrl;
  private bearer = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  createCustomer(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearer}`,
    });
    return this.http.post(`${this.apiUrl}/customer/create-customer`, data, { headers });
  }

  getCustomers() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearer}`,
    });
    return this.http.get<any[]>(
      `${this.apiUrl}/customer/get-all-customers/${localStorage.getItem('tenant')}`,
      { headers },
    );
  }

  deleteCustomer(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearer}`,
    });
    return this.http.delete(`${this.apiUrl}/customer/delete-customer/${id}`, { headers });
  }

  getCustomer(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearer}`,
    });
    return this.http.get(
      `${this.apiUrl}/customer/get-customer/${id}/${localStorage.getItem('tenant')}`,
      { headers },
    );
  }

  updateCustomer(id: number, data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearer}`,
    })
    return this.http.put(`${this.apiUrl}/customer/update-customer/${id}`, data, { headers });
  }
}
