import { Component, Inject, OnInit } from '@angular/core';
import { OrderItem } from '../../models/order-item.model';
import { ProductService } from '../../services/products-service.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogClose } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { UnitService } from '../../services/unit.service';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock.model';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [FormsModule, MatDialogClose, ReactiveFormsModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
})
export class OrderItemComponent implements OnInit {
  orderItemForm: any = this.formBuilder.group({
    id: [0],
    productId: ['', [Validators.required]],
    productName: [''],
    orderId: [this.data.orderId],
    unitId: ['', [Validators.required]],
    unitName: [''],
    price: [0],
    quantity: [0, [Validators.required, Validators.min(1)]],
    total: [0],
  });
  allProducts: any = [];
  allUnits: any = [];
  singleStock: Stock = {};
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OrderItemComponent>,
    private formBuilder: FormBuilder,
    private unitService: UnitService,
    private stockService: StockService
  ) {}
  ngOnInit(): void {
    // all product get
    this.getAllProduct();
    // all unit get
    this.getAllUnit();
    // all stock get
    if (this.data.itemIndex != null) {
      this.orderItemForm.patchValue(
        this.orderService.orderItems[this.data.itemIndex]
      );
    }
  }

  /// all product retrive
  getAllProduct() {
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        console.log(data);
        this.allProducts = data;
      },
      error: (e) => console.log(e),
    });
  }
  // all unit retrive
  getAllUnit() {
    this.unitService.getAll().subscribe({
      next: (data) => (this.allUnits = data),
      error: (e) => console.log(e),
    });
  }
  // all Stock retrive
  getAllStock(id: any) {
    if (id != 0) {
      this.stockService.getAll().subscribe({
        next: (data) => {
          this.singleStock = data.filter((f) => f.productId == id)[0];
          console.log(this.singleStock);
        },
        error: (e) => console.log(e),
      });
    } else {
      this.singleStock = {
        quantity: 0,
      };
    }
  }
  // price update
  updatePrice(e: any) {
    if (e.target.selectedIndex != 0) {
      this.orderItemForm.patchValue({
        price: this.allProducts[e.target.selectedIndex - 1].price,
        productName: this.allProducts[e.target.selectedIndex - 1].productName,
      });
      // update total
      this.updateTotal();
      // update stock qty
      let pid = e.target.value;
      this.getAllStock(pid);
    } else {
      this.orderItemForm.patchValue({
        price: 0,
        productName: '',
      });
      // update total
      this.updateTotal();
      // update stock qty
      let pid = e.target.value;
      this.getAllStock(pid);
    }
  }
  // update Total
  updateTotal() {
    this.orderItemForm.patchValue({
      total: this.orderItemForm.value.price * this.orderItemForm.value.quantity,
    });
  }

  // update unit name and id
  updateUnit(e: any) {
    if (e.target.selectedIndex != 0) {
      this.orderItemForm.patchValue({
        unitName: this.allUnits[e.target.selectedIndex - 1].unitName,
      });
    } else {
      this.orderItemForm.patchValue({
        unitName: '',
      });
    }
  }

  // add order item
  addOrderItem() {
    if (this.data.itemIndex == null) {
      this.orderService.orderItems.push(this.orderItemForm.value);
      this.dialogRef.close();
    } else {
      this.orderService.orderItems[this.data.itemIndex] =
        this.orderItemForm.value;
      this.dialogRef.close();
    }
  }
}
