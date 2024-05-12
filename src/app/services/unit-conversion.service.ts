import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnitConversion } from '../models/unit-conversion.model';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:7140/api/unitconvertions';
@Injectable({
  providedIn: 'root'
})
export class UnitConversionService {

  constructor(private http : HttpClient) { }
  getAll(): Observable<UnitConversion[]>{
    return this.http.get<UnitConversion[]>(baseUrl);
  }

  get(id : any): Observable<UnitConversion>{
    return this.http.get<UnitConversion>(`${baseUrl}/${id}`)
  }
  create(data : any): Observable<any>{
    return this.http.post(baseUrl,data)
  }
  update(id : any, data : any): Observable<any>{
    return this.http.put(`${baseUrl}/${id}`,data);
  }
 delete(id : any): Observable<any>{
  return this.http.delete(`${baseUrl}/${id}`);
 }
}
