import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-delivery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-delivery.component.html',
  styleUrl: './order-delivery.component.css',
})
export class OrderDeliveryComponent implements OnInit {
  allOrderList: any = [];
  order: any = {};
  orderItems: any = [];

  role: any;

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllOrderList();
    this.role = localStorage.getItem('role');
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

  // approved order by admin/manager
  approved(id: any) {
    this.orderService.getOrderById(id).subscribe({
      next: (data) => {
        data.order.isDelivered = true;
        this.orderService.orderItems = data.orderItems;
        this.orderService.updateOrder(id, data.order).subscribe({
          next: (data) => {
            this.toastr.success('Delivery Completed', 'Order');
            this.ngOnInit();
          },
          error: (e) => console.log(e),
        });
      },
      error: (e) => console.log(e),
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
