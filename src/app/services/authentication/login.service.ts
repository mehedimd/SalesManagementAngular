import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Login } from '../../models/authentication/login.model';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:7140/api/Auth/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnInit {
  refreshComponent() {
    this.ngOnInit();
  }
  ngOnInit(): void {}
  constructor(private http: HttpClient) {}

  loginPost(data: Login): Observable<any> {
    return this.http.post(baseUrl, data);
  }
}
