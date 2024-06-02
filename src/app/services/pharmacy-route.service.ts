import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PharmacyRoute } from '../models/pharmacy-route.model';

const baseUrl = 'https://localhost:7140/api/PharmacyRoutes';

@Injectable({
  providedIn: 'root',
})
export class PharmacyRouteService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<PharmacyRoute[]> {
    return this.http.get<PharmacyRoute[]>(baseUrl);
  }
}
