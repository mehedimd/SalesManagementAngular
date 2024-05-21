import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { ISalesTarget } from '../../models/SalesTarget.model';
import { SalesTargetServiceService } from '../../services/sales-target-service.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../models/employee.model';
import {TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-list-of-sales-targets',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule,TooltipModule],
  templateUrl: './list-of-sales-targets.component.html',
  styleUrl: './list-of-sales-targets.component.css',
})
export class ListOfSalesTargetsComponent {
  router = inject(Router);
  toaster = inject(ToastrService);
  salestargetlist: ISalesTarget[] = [];
  employeelist:Employee[]=[];
  displayedColumns: string[] = [
    'salesTargetId',
    'targetTaka',
    'closingDate',
    'employeeId',
    'Action',
  ];
  constructor(private http: SalesTargetServiceService) {}
  ngOnInit() {
    this.http.getAllSalesTargets().subscribe((result: ISalesTarget[]) => {
      this.salestargetlist = result;
      console.log(this.salestargetlist);
    });
  }

  EditSales(salesTargetId: number) {
    console.log(salesTargetId);
    this.router.navigateByUrl('/salestargets/' + salesTargetId);
  }

  Delete(salesTargetId: number) {
    this.http.deleteSalesTarget(salesTargetId).subscribe(() => {
      console.log('deleted');
      // this.productlist=this.productlist.filter(x=>x.ProductId!=ProductId)
      this.ngOnInit();
      this.toaster.error('Record deleted Successfully');
    });
  }
}
