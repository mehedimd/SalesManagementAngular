import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  allOrderList: any = [];
  order: any = {};
  orderItems: any = [];
  getUserRole: any;
  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserRole = localStorage.getItem('role');
    this.getAllOrderList();
  }

  // get all order List
  getAllOrderList() {
    this.orderService.getAllOrder().subscribe({
      next: (data) => {
        console.log(data);
        this.allOrderList = data;
      },
      error: (e) => {
        console.error(e);
        this.router.navigate(['/badrequest']);
      },
    });
  }
  // Delete order
  deleteOrder(id: any) {
    this.orderService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.warning(res.message, 'Order');
        this.ngOnInit();
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
