import { Component, inject } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
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
    phoneNumber: ['', [Validators.required]],
    emailAddress: ['', [Validators.required]],
    
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    //address: [''],
  });

  employeeId!: number;
  isEdit = false;

  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.service.getEmployee(this.employeeId).subscribe((result) => {
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
      emailAddress: this.EmployeeForm.value.emailAddress!,
      phoneNumber: this.EmployeeForm.value.phoneNumber!,
      country: this.EmployeeForm.value.country!,
      city: this.EmployeeForm.value.city!,
      state: this.EmployeeForm.value.state!,
      postalCode: this.EmployeeForm.value.postalCode!,
      gender: this.EmployeeForm.value.gender!,
     
    };
    //Edit
employee.address=(`${employee.state},${employee.city}-${employee.state},${employee.country}`);
    if (this.isEdit) {
      console.log(employee);
      this.service.updateEmployee(this.employeeId, employee).subscribe(() => {
        console.log('Edit success');
        this.router.navigateByUrl('/employee');
        this.toaster.info('Record Updated Successfully');
      });
    } else {
      this.service.createEmployee(employee).subscribe(
        (result) => console.log(result)
     
      );
      console.log('success');
      this.router.navigateByUrl('/employee');
      this.toaster.success('Record created Successfully');
    }
  }

}
