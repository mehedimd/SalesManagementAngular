import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../../models/authentication/register.model';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:7140/api/Auth/register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  create(user: Register): Observable<any> {
    return this.http.post(baseUrl, user);
  }
}
