import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { StorageUtils } from '../../../utils/StorageUtils';

@Injectable({
  providedIn: 'root',
})
export class ServiceOrderService {
  private apiUrl = environment.apiUrl;
  private bearer = StorageUtils.getBearerToken();
  private tenantId = StorageUtils.getTenantId();
  constructor(private http: HttpClient) {}

  getStatus(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearer}`,
    });

    return this.http.get(`${this.apiUrl}/status/get-all`, { headers: headers })
  }

  createServiceOrder(data: any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearer}`,
    });

    return this.http.post(`${this.apiUrl}/serviceorder/create-order`, data, { headers: headers })
  }

  gelAllServiceOrder(): Observable<any>{
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.bearer}` });
    const idTenant = localStorage.getItem('tenant');
    return this.http.get(`${this.apiUrl}/serviceorder/get-all-os/${idTenant}`, { headers: headers })
  }

  getServiceOrderById(Id: any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearer}`,
    });
    return this.http.get(`${this.apiUrl}/serviceorder/get-service-order/${Id}/${this.tenantId}`, { headers: headers });
  }

  deleteServiceOrder(id: any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearer}`,
    })
    return this.http.delete(`${this.apiUrl}/serviceorder/delete/${id}`, { headers: headers });
  }

  editService(id: any, data: any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearer}`,
    })

    return this.http.put(`${this.apiUrl}/serviceorder/edit/${id}`, data, { headers: headers })
  }

}
