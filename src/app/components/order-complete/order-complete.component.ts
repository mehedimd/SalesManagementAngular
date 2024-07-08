import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-complete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-complete.component.html',
  styleUrl: './order-complete.component.css',
})
export class OrderCompleteComponent implements OnInit {
  allOrderList: any = [];
  order: any = {};
  orderItems: any = [];

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

  // order details
  orderDetails(id: any) {
    this.orderService.getOrderById(id).subscribe({
      next: (data) => {
        console.log(data);

        this.order = data.order;
        this.orderItems = data.orderItems;
      },
      error: (e) => console.log(e),
    });
  }
}
