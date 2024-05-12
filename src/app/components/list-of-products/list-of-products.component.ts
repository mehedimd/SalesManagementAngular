 import { Component, inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { IProduct } from '../../models/Products.model';
import { ProductService } from '../../services/products-service.service';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'List',
    standalone: true,
    templateUrl: './list-of-products.component.html',
    styleUrls: ['./list-of-products.component.css'],
    imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule]
})
export class ListOfProductsComponent {


 router=inject(Router)
 toaster=inject(ToastrService)

 
 productlist:IProduct[]=[];
//  http=inject(ProductService);
 displayedColumns: string[] = ['ProductId', 'ProductName', 'ProductDescription', 'Price','CategoryId','Action'];
 constructor(private http:ProductService) {}
 ngOnInit(){
  this.http.getAllProduct().subscribe((result:IProduct[])=>{this.productlist=result;
    console.log(this.productlist)
  });
  
 }


 Edit(ProductId: number) {
console.log(ProductId);
this.router.navigateByUrl("/products/"+ProductId)
 }

 Delete(ProductId: number) {
  this.http.deleteProduct(ProductId).subscribe(()=>{
    console.log("deleted")
    // this.productlist=this.productlist.filter(x=>x.ProductId!=ProductId)
    this.ngOnInit();
    this.toaster.error("Record deleted Successfully")
  })
  }


}

