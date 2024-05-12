import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { ISalesTarget } from '../../models/SalesTarget.model';
import { SalesTargetServiceService } from '../../services/sales-target-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-of-sales-targets',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './list-of-sales-targets.component.html',
  styleUrl: './list-of-sales-targets.component.css',
})
export class ListOfSalesTargetsComponent {
  router = inject(Router);
  toaster = inject(ToastrService);
  salestargetlist: ISalesTarget[] = [];

  displayedColumns: string[] = [
    'SalesTargetId',
    'TargetTaka',
    'ClosingDate',
    'EmployeeId',
    'Action',
  ];
  constructor(private http: SalesTargetServiceService) {}
  ngOnInit() {
    this.http.getAllSalesTargets().subscribe((result: ISalesTarget[]) => {
      this.salestargetlist = result;
      console.log(this.salestargetlist);
    });
  }

  EditSales(SalesTargetId: number) {
    console.log(SalesTargetId);
    this.router.navigateByUrl('/salestargets/' + SalesTargetId);
  }

  Delete(SalesTargetId: number) {
    this.http.deleteSalesTarget(SalesTargetId).subscribe(() => {
      console.log('deleted');
      // this.productlist=this.productlist.filter(x=>x.ProductId!=ProductId)
      this.ngOnInit();
      this.toaster.error('Record deleted Successfully');
    });
  }
}
