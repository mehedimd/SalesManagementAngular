import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  

  apiUrl = 'https://localhost:7140/Api/Employees/';
 
  http = inject(HttpClient);
  constructor() { }

  getAllEmployee() {
    // console.log('getAllProduct', localStorage.getItem('token'));
    return this.http.get<Employee[]>(this.apiUrl);
  }
  createEmployee(product: Employee): Observable<any> {
    return this.http.post(this.apiUrl, product)
  }
  getEmployee(ProductId: number) {
    return this.http.get<Employee>(this.apiUrl +ProductId
    );
  }
  
  updateEmployee(ProductId: number, Product: Employee) {
    console.log(Product)
    return this.http.put<Employee>(this.apiUrl + ProductId,
      Product
    );
  }
  deleteEmployees(ProductId: number) {
    return this.http.delete(this.apiUrl + ProductId);
  }
  
  
}
