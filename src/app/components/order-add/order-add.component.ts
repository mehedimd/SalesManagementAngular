import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { Order } from '../../models/order.model';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PharmacyService } from '../../services/pharmacy.service';
import { Pharmacy } from '../../models/pharmacy.model';
import { OrderItemComponent } from '../order-item/order-item.component';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PharmacyRouteService } from '../../services/pharmacy-route.service';
import { PharmacyRoute } from '../../models/pharmacy-route.model';
@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [MatDialogModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.css',
})
export class OrderAddComponent implements OnInit {
  orderForm: any = this.formBuilder.group({
    orderId: [0],
    orderNo: [10000 + Math.floor(Math.random() * 1000 + 500)],
    orderDate: [new Date().toISOString().slice(0, 10)],
    grandTotal: [0],
    pharmacyId: ['', [Validators.required]],
    routeId: [''],
  });
  pharmacyList: Pharmacy[] = [];
  pharmacyRouteList: PharmacyRoute[] = [];
  activeRouteId: any;
  pharmacyRouteId!: number;
  isRouteSelected: boolean = false;

  constructor(
    private dialog: MatDialog,
    private pharmacyService: PharmacyService,
    public orderService: OrderService,
    private pharmacyRouteService: PharmacyRouteService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    // reset order form
    this.resetOrderForm();

    // get all pharmacyRoute
    this.getAllPharmacyRoute();
    // for edit  get id by snapshot route
    this.activeRouteId = this.route.snapshot.params['id'];
    this.getEditFormValue();
  }

  // for edit patch value to form
  getEditFormValue() {
    if (this.activeRouteId > 0) {
      this.orderService.getOrderById(this.activeRouteId).subscribe({
        next: (res) => {
          console.log(res);
          this.getPharmacyByRouteId(res.order.routeId);
          this.orderForm.patchValue(res.order);
          this.orderService.orderItems = res.orderItems;
        },
        error: (e) => console.error(e),
      });
    }
  }

  // all pharmacyRoute list retrive
  getAllPharmacyRoute() {
    this.pharmacyRouteService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.pharmacyRouteList = data;
      },
      error: (e) => console.log(e),
    });
  }
  //orderItem order Item dialog popup
  addOrEditItems(itemIndex: any) {
    let orderId = this.orderForm.value.orderId;
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
  }
  // update Grand Total
  updateGrandTotal() {
    this.orderForm.patchValue({
      grandTotal: this.orderService.orderItems.reduce((prev, current) => {
        return prev + current.total;
      }, 0),
    });
  }
  // Pharmacy Route Change
  ChangeRoute(e: any) {
    if (e.target.selectedIndex != 0) {
      this.pharmacyRouteId =
        this.pharmacyRouteList[e.target.selectedIndex - 1].id;
      this.getPharmacyByRouteId(this.pharmacyRouteId);
    } else {
      // for validateion
      this.isRouteSelected = false;
      this.pharmacyList = [];
    }
    // refresh/change pharmacyId
    this.orderForm.patchValue({
      pharmacyId: '',
    });
  }

  // get Pharmacy by Route Id
  getPharmacyByRouteId(routeId: number) {
    // for validateion
    this.isRouteSelected = true;
    this.pharmacyService.getPharmacyByRouteId(routeId).subscribe({
      next: (data) => {
        console.log(data);
        this.pharmacyList = data;
      },
      error: (e) => console.log(e),
    });
  }

  // Create Order
  createOrder() {
    if (this.orderService.orderItems.length == 0) {
      this.toastr.warning('Please Order At Least 1 Item!', 'Order');
    } else {
      if (this.orderForm.value.orderId > 0) {
        this.orderService
          .updateOrder(this.orderForm.value.orderId, this.orderForm.value)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.toastr.success(res.message, 'Order');
              this.router.navigate(['/order']);
              this.resetOrderForm();
            },
            error: (e) => console.log(e),
          });
      } else {
        this.orderService.create(this.orderForm.value).subscribe({
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
    this.orderForm.patchValue({
      orderId: 0,
      orderNo: 10000 + Math.floor(Math.random() * 1000 + 500),
      orderDate: new Date().toISOString().slice(0, 10),
      grandTotal: 0,
      pharmacyId: '',
    });
    this.orderService.orderItems = [];
  }
}
