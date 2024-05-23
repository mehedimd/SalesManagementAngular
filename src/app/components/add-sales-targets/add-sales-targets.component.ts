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
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SalesTargetServiceService } from '../../services/sales-target-service.service';
import { ISalesTarget } from '../../models/SalesTarget.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../models/employee.model';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-add-sales-targets',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,MatSelectModule
  ],
  templateUrl: './add-sales-targets.component.html',
  styleUrl: './add-sales-targets.component.css',
})
export class AddSalesTargetsComponent {
  builder = inject(FormBuilder);
  service = inject(SalesTargetServiceService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  employee_srv=inject(EmployeeService)

  

  submitted = false;
  SalesTargetForm = this.builder.group({
    salesTargetId: [0],
    targetTaka: [0, [Validators.required]],
    closingDate: [new Date(), [Validators.required]],
    employeeId: [0],
  });

  employeeList:Employee[]=[];
  salesTargetId!: number;
  isEdit = false;

  ngOnInit() {
    this.salesTargetId = this.route.snapshot.params['id'];
    if (this.salesTargetId) {
      this.isEdit = true;
      this.service.getSalesTaget(this.salesTargetId).subscribe((result) => {
        console.log(result);
        this.SalesTargetForm.patchValue(result);
        this.SalesTargetForm.controls.salesTargetId.disabled;
      });
    }
    this.employee_srv.getAllEmployee().subscribe((result)=>{
      this.employeeList=result;
    })
  }

  Save() {
    console.log(this.SalesTargetForm.value);
    const SalesTarget: ISalesTarget = {
      salesTargetId: this.SalesTargetForm.value.salesTargetId!,
      targetTaka: this.SalesTargetForm.value.targetTaka!,
      closingDate: this.SalesTargetForm.value.closingDate!,
      employeeId: this.SalesTargetForm.value.employeeId!,
    };
    //Edit

    if (this.isEdit) {
      console.log(SalesTarget);
      this.service
        .updateSalesTarget(this.salesTargetId, SalesTarget)
        .subscribe(() => {
          console.log('Edit success');
          this.router.navigateByUrl('List-of-SalesTarget');
          this.toaster.info('Record Updated Successfully');
        });
    } else {
      this.service.createSalesTarget(SalesTarget).subscribe(() => {
        this.SalesTargetForm = this.builder.group({
          salesTargetId: [0],
          targetTaka: [0, [Validators.required]],
          closingDate: [new Date(), [Validators.required]],
          employeeId: [0],
        });
        console.log('success');
        this.router.navigateByUrl('List-of-SalesTarget');
        this.toaster.success('Record created Successfully');
      });
    }

    //   this.service.createProduct(product).subscribe(() => {
    //     console.log("success");
    //     this.router.navigateByUrl("\List")
    // });
  }
}
