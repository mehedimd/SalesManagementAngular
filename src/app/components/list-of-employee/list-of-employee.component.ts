import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  allEmployeeList: any = [];
  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
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
        //this.toastr.warning(res,'Employee');
        console.log('this is warning', res);
        this.ngOnInit();
      },
      error: (e) => console.log(e),
    });
  }
}
