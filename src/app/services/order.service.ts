import { Injectable } from '@angular/core';
import { OrderItem } from '../models/order-item.model';
import { Order } from '../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:7140/api/orders';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderItems: OrderItem[] = [];
  constructor(private http: HttpClient) {}

  // create
  create(order: Order): Observable<any> {
    const obj = {
      ...order,
      orderItems: this.orderItems,
    };
    return this.http.post(baseUrl, obj, { responseType: 'text' });
  }

  // get all order
  getAllOrder(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }
  // delete Order
  delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`, { responseType: 'text' });
  }
  // get order by id
  getOrderById(id: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  // update order
  updateOrder(id: number, data: any): Observable<any> {
    const obj = {
      ...data,
      orderItems: this.orderItems,
    };
    return this.http.put(`${baseUrl}/${id}`, obj, { responseType: 'text' });
  }
}
