import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from '../models/unit.model';


const baseUrl = 'https://localhost:7140/api/units'

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  constructor(private http : HttpClient) { }

  getAll(): Observable<Unit[]>{
    return this.http.get<Unit[]>(baseUrl);
  }

  get(id : any): Observable<Unit>{
    return this.http.get<Unit>(`${baseUrl}/${id}`)
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
