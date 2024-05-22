import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; // Change import here
import { IProduct } from '../../models/Products.model';
import { ProductService } from '../../services/products-service.service';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { TooltipModule } from 'primeng/tooltip';
import { CategoryService } from '../../services/category.service';
import { Icategories } from '../../models/icategories';

@Component({
    selector: 'List',
    standalone: true,
    templateUrl: './list-of-products.component.html',
    styleUrls: ['./list-of-products.component.css'],
    imports: [TooltipModule, MatTableModule, MatButtonModule, MatIconModule] // Remove RouterLink from imports
})
export class ListOfProductsComponent {

  productlist: IProduct[] = [];
  categoryList: Icategories[] = [];

  displayedColumns: string[] = ['productId', 'productName', 'productDescription', 'price', 'categoryName', 'Action'];

  constructor(private router: Router, // Inject Router
              private http: ProductService,
              private toaster: ToastrService, // Inject ToastrService
              private category_srv: CategoryService) { // Inject CategoryService
  }

  ngOnInit() {
    this.http.getAllProduct().subscribe((result: IProduct[]) => {
      this.productlist = result;
      console.log(this.productlist);
    });

    this.category_srv.getAllCategory().subscribe(c => {
      this.categoryList = c;
    });
  }

  getCategoryName(id: number) {
    const category = this.categoryList.find(cat => cat.categoryId === id);
    return category ? category.categoryName : 'Unknown';
  }

  Edit(productId: number) {
    console.log(productId);
    this.router.navigateByUrl("/products/" + productId);
  }

  Delete(productId: number) {
    this.http.deleteProduct(productId).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      this.toaster.error("Record deleted Successfully");
    })
  }
}
