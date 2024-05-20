import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [  MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{
  builder = inject(FormBuilder);
  service = inject(EmployeeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  submitted = false;
  EmployeeForm = this.builder.group({
    employeeId: [0],
    employeeName: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    phoneNumber: ['',[Validators.required]],
    emailAddress: ['',[Validators.required]],
    country: ['',[Validators.required]],
    city: ['',[Validators.required]],
    state: ['',[Validators.required]],
    postalCode: ['',[Validators.required]],
    gender: ['',[Validators.required]],
  });
  
  EmployeeId!:number;
  isEdit = false;
  
  ngOnInit(): void {
    this.EmployeeId=this.route.snapshot.params['id'];
    if (this.EmployeeId){
      this.isEdit = true;
      this.service.getEmployee(this.EmployeeId).subscribe((result)=>{
        console.log(result);
        this.EmployeeForm.patchValue(result);
        this.EmployeeForm.controls.employeeId.disabled;
      });
    }
  }

  Save() {
    console.log(this.EmployeeForm.value);
    const employee: Employee = {
      employeeId: this.EmployeeForm.value.employeeId!,
      employeeName: this.EmployeeForm.value.employeeName!,
      designation: this.EmployeeForm.value.designation!,
      phoneNumber: this.EmployeeForm.value.phoneNumber!,
      emailAddress: this.EmployeeForm.value.emailAddress!,
      country: this.EmployeeForm.value.country!,
      state: this.EmployeeForm.value.state!,
      city: this.EmployeeForm.value.city!,
      postalCode: this.EmployeeForm.value.postalCode!,
      gender: this.EmployeeForm.value.gender!,
      address:'',
    };
    employee.address=(`${employee.state},${employee.city}-${employee.postalCode},${employee.country}`);
    //edit
  
    if (this.isEdit) {
      console.log(employee);
      this.service
        .updateEmployee(this.EmployeeId, employee)
        .subscribe(() => {
          console.log('Edit success');
          this.router.navigateByUrl('employee');
          this.toaster.info('Record Updated Successfully');
        });
    }
    else {
      this.service.createEmployee(employee).subscribe(() => {
        this.EmployeeForm = this.builder.group({
          employeeId: [0],
    employeeName: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    phoneNumber: ['',[Validators.required]],
    emailAddress: ['',[Validators.required]],
    country: ['',[Validators.required]],
    city: ['',[Validators.required]],
    state: ['',[Validators.required]],
    postalCode: ['',[Validators.required]],
    gender: ['',[Validators.required]],
        });
        console.log('success');
        this.router.navigateByUrl('employee');
        this.toaster.success('Record created Successfully');
      });
    }

  }
}