import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-pending',
  standalone: true,
  imports: [],
  templateUrl: './order-pending.component.html',
  styleUrl: './order-pending.component.css',
})
export class OrderPendingComponent implements OnInit {
  allOrderList: any = [];
  order: any = {};
  orderItems: any = [];

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
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

  // approved order by admin/manager
  approved(id: any) {
    this.orderService.getOrderById(id).subscribe({
      next: (data) => {
        data.order.isApproved = true;
        this.orderService.orderItems = data.orderitems;
        this.orderService.updateOrder(id, data.order).subscribe({
          next: (data) => {
            this.toastr.success('approved', 'Order');
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
