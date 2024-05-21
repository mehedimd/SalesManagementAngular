import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Icategories } from '../../models/icategories';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  builder = inject(FormBuilder);
  service = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  submitted = false;
  CategoryForm = this.builder.group({
    categoryId: [0],
    categoryName: ['', [Validators.required]],
  });
  
  categoryId!:number;
  isEdit = false;
  
  ngOnInit(): void {
    this.categoryId=this.route.snapshot.params['id'];
    if (this.categoryId){
      this.isEdit = true;
      this.service.getIcategories(this.categoryId).subscribe((result)=>{
        console.log(result);
        this.CategoryForm.patchValue(result);
        this.CategoryForm.controls.categoryId.disabled;
      });
    }
  }

  Save() {
    console.log(this.CategoryForm.value);
    const category: Icategories = {
      categoryId: this.CategoryForm.value.categoryId!,
      categoryName: this.CategoryForm.value.categoryName!,
    };
    //edit
  
    if (this.isEdit) {
      console.log(category);
      this.service
        .updateIcategories(this.categoryId, category)
        .subscribe(() => {
          console.log('Edit success');
          this.router.navigateByUrl('category');
          this.toaster.info('Record Updated Successfully');
        });
    }
    else {
      this.service.createIcategories(category).subscribe(() => {
        this.CategoryForm = this.builder.group({
          categoryId: [0],
          categoryName: ['', [Validators.required]],
    
        });
        console.log('success');
        this.router.navigateByUrl('category');
        this.toaster.success('Record created Successfully');
      });
    }

  }

}
