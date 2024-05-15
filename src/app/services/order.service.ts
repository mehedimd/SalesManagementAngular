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

  create(order: Order): Observable<any> {
    const obj = {
      ...order,
      orderItems: this.orderItems,
    };
    return this.http.post(baseUrl, obj);
  }
}
