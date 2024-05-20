import { Injectable } from '@angular/core';
import { OrderItem } from '../models/order-item.model';
import { Order } from '../models/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:7140/api/orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderItems: OrderItem[] = [];
  constructor(private http: HttpClient) {}
  // header
  t = sessionStorage.getItem('jwtToken');
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + this.t,
  });

  // create
  create(order: Order): Observable<any> {
    const obj = {
      ...order,
      orderItems: this.orderItems,
    };

    return this.http.post(baseUrl, obj, { headers: this.header });
  }

  // get all order
  getAllOrder(): Observable<any> {
    return this.http.get<any>(baseUrl, { headers: this.header });
  }
  // delete Order
  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, { headers: this.header });
  }
  // get order by id
  getOrderById(id: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`, { headers: this.header });
  }

  // update order
  updateOrder(id: number, data: any): Observable<any> {
    const obj = {
      ...data,
      orderItems: this.orderItems,
    };
    return this.http.put(`${baseUrl}/${id}`, obj, { headers: this.header });
  }
}
