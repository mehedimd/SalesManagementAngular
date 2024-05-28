import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:7140/api/stocks';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl);
  }
}
