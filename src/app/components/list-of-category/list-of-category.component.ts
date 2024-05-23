import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-of-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-of-category.component.html',
  styleUrl: './list-of-category.component.css'
})
export class ListOfCategoryComponent implements OnInit {
  router=inject(Router)
  toaster=inject(ToastrService)
  
  allCategorylist: any = [];
  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getallCategorylist();
  }

  // get all Category List
  getallCategorylist() {
    this.categoryService.getAllCategory().subscribe({
      next: (data) => {
        console.log(data);
        this.allCategorylist = data;
      },
      error: (e) => console.error(e),
    });
  }
  // Delete Category
  deleteCategory(id: any) {
    this.categoryService.deleteIcategoriess(id).subscribe({
      next:(res)=> {
        //this.toastr.warning(res,'category');
        console.log('this is warning', res);
        this.ngOnInit();
        this.toaster.error("Record deleted Successfully");
      },
      error: (e) => console.log(e),
    });
  }
  Edit(productId: number) {
    console.log(productId);
    this.router.navigateByUrl("/category/add/"+productId)
     }

}
