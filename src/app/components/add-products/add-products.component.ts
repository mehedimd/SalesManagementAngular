import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/products-service.service';
import { IProduct } from '../../models/Products.model';

import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-products',
  standalone: true,
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class AddProductsComponent {
  builder = inject(FormBuilder);
  service = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);

  submitted = false;
  ProductForm = this.builder.group({
    ProductId: [0],
    ProductName: ['', [Validators.required]],
    ProductDescription: ['', [Validators.required]],
    Price: [0, [Validators.required]],
    CategoryId: [0],
  });

  productId!: number;
  isEdit = false;

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEdit = true;
      this.service.getProduct(this.productId).subscribe((result) => {
        console.log(result);
        this.ProductForm.patchValue(result);
        this.ProductForm.controls.ProductId.disabled;
      });
    }
  }

  Save() {
    console.log(this.ProductForm.value);
    const product: IProduct = {
      ProductId: this.ProductForm.value.ProductId!,
      ProductName: this.ProductForm.value.ProductName!,
      ProductDescription: this.ProductForm.value.ProductDescription!,
      Price: this.ProductForm.value.Price!,
      CategoryId: this.ProductForm.value.CategoryId!,
    };
    //Edit

    if (this.isEdit) {
      console.log(product);
      this.service.updateProduct(this.productId, product).subscribe(() => {
        console.log('Edit success');
        this.router.navigateByUrl('List');
        this.toaster.info('Record Updated Successfully');
      });
    } else {
      this.service.createProduct(product).subscribe(
        (result) => console.log(result)
        // {
        // this.ProductForm=this.builder.group({
        //   ProductId:[0],
        //   ProductName:['',[Validators.required]],
        //   ProductDescription:['',[Validators.required]],
        //   Price:[0,[Validators.required]],
        //   CategoryId:[0],
        // }
      );
      console.log('success');
      this.router.navigateByUrl('List');
      this.toaster.success('Record created Successfully');
    }
  }

  //   this.service.createProduct(product).subscribe(() => {
  //     console.log("success");
  //     this.router.navigateByUrl("\List")
  // });
}
