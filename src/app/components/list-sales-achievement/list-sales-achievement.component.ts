import { Component, Input, inject, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { SalesAchivementService } from '../../services/sales-achivement.service';
import { ISalesAchivement } from '../../Models/SalesAchievement.model';
import { ISalesTarget } from '../../models/SalesTarget.model';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-list-sales-achievement',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule,TooltipModule],
  templateUrl: './list-sales-achievement.component.html',
  styleUrl: './list-sales-achievement.component.css',
})
export class ListSalesAchievementComponent {
  router = inject(Router);
  toaster = inject(ToastrService);
  // target=inject(SalesTargetServiceService)

  constructor(private http: SalesAchivementService) {}

  salesachievementlist: ISalesAchivement[] = [];
  salestarget:ISalesTarget[]=[]
  // AllTarget:ISalesTarget[]=[];
  // SalesTargetId!:number;

  displayedColumns: string[] = ['id', 'amount', 'salesTargetsId', 'Action'];

  ngOnInit() {
    this.http
      .getAllSalesAchievements()
      .subscribe((result: ISalesAchivement[]) => {
        this.salesachievementlist = result;
        console.log(this.salesachievementlist);

        // this.target.getAllSalesTargets().subscribe(result=>{
        //   this.AllTarget=result
        //   console.log(result)
        // })
      });
  }

  Edit(SalesAchievementId: number) {
    console.log(SalesAchievementId);
    this.router.navigateByUrl('/SalesAchievement/' + SalesAchievementId);
  }

  Delete(id: number) {
    this.http.deleteSalesAchievement(id).subscribe(() => {
      console.log('deleted');
      // this.productlist=this.productlist.filter(x=>x.ProductId!=ProductId)
      this.ngOnInit();
      this.toaster.error('Record deleted Successfully');
    });
  }

  
}
