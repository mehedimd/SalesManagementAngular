import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ISalesTarget } from '../../models/SalesTarget.model';
import { SalesTargetServiceService } from '../../services/sales-target-service.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../models/employee.model';
import { TooltipModule } from 'primeng/tooltip';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-list-of-sales-targets',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule, TooltipModule],
  templateUrl: './list-of-sales-targets.component.html',
  styleUrls: ['./list-of-sales-targets.component.css'],
})
export class ListOfSalesTargetsComponent implements OnInit {
  router = inject(Router);
  toaster = inject(ToastrService);
  employee_srv = inject(EmployeeService);
  salestargetlist: ISalesTarget[] = [];
  employeeList: Employee[] = [];

  displayedColumns: string[] = [
    'salesTargetId',
    'targetTaka',
    'closingDate',
    'employeeName', // Update the column name to employeeName
    'Action',
  ];

  constructor(private http: SalesTargetServiceService) {}

  ngOnInit() {
    this.http.getAllSalesTargets().subscribe((result: ISalesTarget[]) => {
      this.salestargetlist = result;
      console.log(this.salestargetlist);
    });

    this.employee_srv.getAllEmployee().subscribe(result => {
      this.employeeList = result;
    });
  }

  getEmployeeName(employeeId: number) {

    const employee = this.employeeList.find(emp => emp.employeeId === employeeId);
    return employee ? employee.employeeName : 'Unknown';
  }

  EditSales(salesTargetId: number) {
    console.log(salesTargetId);
    this.router.navigateByUrl('/salestargets/' + salesTargetId);
  }

  Delete(salesTargetId: number) {
    this.http.deleteSalesTarget(salesTargetId).subscribe(() => {
      console.log('deleted');
      this.ngOnInit();
      this.toaster.error('Record deleted Successfully');
    });
  }
}