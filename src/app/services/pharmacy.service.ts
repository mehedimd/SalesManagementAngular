import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pharmacy } from '../models/pharmacy.model';

const baseUrl = 'https://localhost:7140/api/pharmacies';
@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Pharmacy[]> {
    return this.http.get<Pharmacy[]>(baseUrl);
  }

  get(id: number): Observable<Pharmacy> {
    return this.http.get<Pharmacy>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // get by pharmacy route id
  getPharmacyByRouteId(id: number): Observable<Pharmacy[]> {
    return this.http.get<Pharmacy[]>(baseUrl + '/GetByRoute/' + id);
  }
}
