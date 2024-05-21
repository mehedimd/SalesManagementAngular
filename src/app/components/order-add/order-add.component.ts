import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { Order } from '../../models/order.model';
import { FormsModule } from '@angular/forms';
import { PharmacyService } from '../../services/pharmacy.service';
import { Pharmacy } from '../../models/pharmacy.model';
import { OrderItemComponent } from '../order-item/order-item.component';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [MatDialogModule, FormsModule, RouterLink],
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.css',
})
export class OrderAddComponent implements OnInit {
  orderMaster: Order = {
    orderId: 0,
    orderNo: 10000 + Math.floor(Math.random() * 1000 + 500),
    orderDate: new Date().toISOString().slice(0, 10),
    grandTotal: 0,
    paymentTotal: 0,
    totalDue: 0,
    pharmacyId: 0,
  };
  pharmacyList: Pharmacy[] = [];

  activeRouteId: any;
  isValid: boolean = true;
  isAnyItem: boolean = true;

  constructor(
    private dialog: MatDialog,
    private pharmacyService: PharmacyService,
    public orderService: OrderService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getAllPharmacy();
    this.activeRouteId = this.route.snapshot.params['id'];
    if (this.activeRouteId > 0) {
      this.orderService.getOrderById(this.activeRouteId).subscribe({
        next: (res) => {
          console.log(res);
          this.orderMaster = res.order;
          this.orderService.orderItems = res.orderItems;
        },
        error: (e) => console.error(e),
      });
    }
  }

  // all pharmacy list retrive
  getAllPharmacy() {
    this.pharmacyService.getAll().subscribe({
      next: (data) => (this.pharmacyList = data),
      error: (e) => console.warn(e),
    });
  }
  //orderItem order Item dialog popup
  addOrEditItems(itemIndex: any, orderId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { itemIndex, orderId };
    this.dialog
      .open(OrderItemComponent, dialogConfig)
      .afterClosed()
      .subscribe({
        next: (res) => this.updateGrandTotal(),
      });
  }
  // remove orderItems in orderList
  removeItems(id: any) {
    console.log(id);
    this.orderService.orderItems.splice(id, 1);
    this.updateGrandTotal();
    this.updateTotalDue();
  }
  // update Grand Total
  updateGrandTotal() {
    this.orderMaster.grandTotal = this.orderService.orderItems.reduce(
      (prev, current) => {
        return prev + current.total;
      },
      0
    );
    this.updateTotalDue();
  }
  // update due
  updateTotalDue() {
    this.orderMaster.totalDue =
      this.orderMaster.grandTotal - this.orderMaster.paymentTotal;
  }
  // Create Order
  createOrder(orderId: any) {
    this.isValid = true;
    this.isAnyItem = true;
    if (this.orderMaster.pharmacyId == 0) {
      this.isValid = false;
    } else if (this.orderService.orderItems.length == 0) {
      this.isAnyItem = false;
      this.toastr.warning('Please Order At Least 1 Item!', 'Order');
    }
    if (this.isValid && this.isAnyItem) {
      if (orderId > 0) {
        this.orderService.updateOrder(orderId, this.orderMaster).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success(res.message, 'Order');
            this.router.navigate(['/order']);
            this.resetOrderForm();
          },
          error: (e) => console.log(e),
        });
      } else {
        this.orderService.create(this.orderMaster).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success(res.message, 'Order');
            this.router.navigate(['/order']);
            this.resetOrderForm();
          },
          error: (e) => console.log(e),
        });
      }
    }
  }

  // reset all input
  resetOrderForm() {
    this.orderMaster = {
      orderId: 0,
      orderNo: 10000 + Math.floor(Math.random() * 1000 + 500),
      orderDate: '2024-02-04',
      grandTotal: 0,
      paymentTotal: 0,
      totalDue: 0,
      pharmacyId: 0,
    };
    this.orderService.orderItems = [];
  }
}
