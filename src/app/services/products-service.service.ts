import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from '../Models/Products.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://localhost:7140/Api/Products/';
  http = inject(HttpClient);
  constructor() {}

  getAllProduct() {
    // console.log('getAllProduct', localStorage.getItem('token'));
    return this.http.get<IProduct[]>(this.apiUrl);
  }
  createProduct(product: IProduct): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
  getProduct(productId: number) {
    return this.http.get<IProduct>(this.apiUrl + productId);
  }

  updateProduct(productId: number, Product: IProduct) {
    console.log(Product);
    return this.http.put<IProduct>(this.apiUrl + productId, Product);
  }
  deleteProduct(productId: number) {
    return this.http.delete(this.apiUrl + productId);
  }
}
