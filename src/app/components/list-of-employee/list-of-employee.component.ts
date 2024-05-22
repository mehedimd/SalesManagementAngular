import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-of-employee',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-of-employee.component.html',
  styleUrl: './list-of-employee.component.css'
})
export class ListOfEmployeeComponent implements OnInit{
  router=inject(Router)
  toaster=inject(ToastrService)
  allEmployeeList: any = [];
  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getallEmployeeList();
  }

  // get all Employee List
  getallEmployeeList() {
    this.employeeService.getAllEmployee().subscribe({
      next: (data) => {
        console.log(data);
        this.allEmployeeList = data;
      },
      error: (e) => console.error(e),
    });
  }
  // Delete Employee
  deleteEmployee(id: any) {
    
    this.employeeService.deleteEmployees(id).subscribe({
      next:(res)=> {
        console.log(res);
        //this.toastr.warning(res,'Employee');
        //console.log('this is warning', res);
        this.ngOnInit();
        this.toaster.error("Record deleted Successfully");
      },
      error: (e) => console.log(e),
    });
  }
  Edit(productId: number) {
    console.log(productId);
    this.router.navigateByUrl("/employee/add/"+productId)
     }
}
