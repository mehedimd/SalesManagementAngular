import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-delivery',
  standalone: true,
  imports: [],
  templateUrl: './order-delivery.component.html',
  styleUrl: './order-delivery.component.css',
})
export class OrderDeliveryComponent implements OnInit {
  allOrderList: any = [];

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.getAllOrderList();
  }
  // get all order List
  getAllOrderList() {
    this.orderService.getAllOrder().subscribe({
      next: (data) => {
        console.log(data);
        this.allOrderList = data;
      },
      error: (e) => console.error(e),
    });
  }
}
