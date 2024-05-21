import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Icategories } from '../models/icategories';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 

  

  apiUrl = 'https://localhost:7140/Api/Categories/';
 
  http = inject(HttpClient);
  constructor() { }

  getAllCategory() {
    // console.log('getAllProduct', localStorage.getItem('token'));
    return this.http.get<Icategories[]>(this.apiUrl);
  }
  createIcategories(product: Icategories): Observable<any> {
    return this.http.post(this.apiUrl, product)
  }
  getIcategories(ProductId: number) {
    return this.http.get<Icategories>(this.apiUrl +ProductId
    );
  }
  
  updateIcategories(ProductId: number, Product: Icategories) {
    console.log(Product)
    return this.http.put<Icategories>(this.apiUrl + ProductId,
      Product
    );
  }
  deleteIcategoriess(ProductId: number) {
    return this.http.delete(this.apiUrl + ProductId);
  }
  
  

}
