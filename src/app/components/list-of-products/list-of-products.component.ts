 import { Component, inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { IProduct } from '../../models/Products.model';
import { ProductService } from '../../services/products-service.service';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'List',
    standalone: true,
    templateUrl: './list-of-products.component.html',
    styleUrls: ['./list-of-products.component.css'],
    imports: [TooltipModule,MatTableModule, MatButtonModule, RouterLink, MatIconModule]
})
export class ListOfProductsComponent {


 router=inject(Router)
 toaster=inject(ToastrService)

 
 productlist:IProduct[]=[];




//  http=inject(ProductService);
 displayedColumns: string[] = ['productId', 'productName', 'productDescription', 'price','categoryId','Action'];
  
 constructor(private http:ProductService) {}
 ngOnInit(){
  this.http.getAllProduct().subscribe((result:IProduct[])=>{this.productlist=result;
    console.log(this.productlist)
  });
  
 }


 Edit(productId: number) {
console.log(productId);
this.router.navigateByUrl("/products/"+productId)
 }

 Delete(productId: number) {
  this.http.deleteProduct(productId).subscribe(()=>{
    console.log("deleted")
    // this.productlist=this.productlist.filter(x=>x.productId!=productId)
    this.ngOnInit();
    this.toaster.error("Record deleted Successfully")
  })
  }


  


}

