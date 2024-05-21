import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  allOrderList: any = [];
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
}
