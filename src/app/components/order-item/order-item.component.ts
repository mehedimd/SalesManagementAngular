import { Component, Inject, OnInit } from '@angular/core';
import { OrderItem } from '../../models/order-item.model';
import { ProductService } from '../../services/products-service.service';
import { FormsModule } from '@angular/forms';
import { MatDialogClose } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [FormsModule, MatDialogClose],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
})
export class OrderItemComponent implements OnInit {
  orderItem: OrderItem = {
    id: 0,
    productId: 0,
    productName: '',
    orderId: this.data.orderId,
    price: 0,
    quantity: 0,
    total: 0,
  };
  allProducts: any = [];
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OrderItemComponent>
  ) {}
  ngOnInit(): void {
    // all product get
    this.getAllProduct();
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
  // price update
  updatePrice(e: any) {
    if (e.target.selectedIndex != 0) {
      this.orderItem.price = this.allProducts[e.target.selectedIndex - 1].price;
      this.orderItem.productName =
        this.allProducts[e.target.selectedIndex - 1].productName;
      this.updateTotal();
    } else {
      this.orderItem.price = 0;
      this.orderItem.productName = '';
      this.updateTotal();
    }
  }
  // update Total
  updateTotal() {
    this.orderItem.total = this.orderItem.price * this.orderItem.quantity;
  }

  // add order item
  addOrderItem() {
    this.orderService.orderItems.push(this.orderItem);
    this.dialogRef.close();
  }
}
