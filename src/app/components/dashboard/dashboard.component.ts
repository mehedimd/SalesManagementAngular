
import { Component, OnInit } from '@angular/core';
import { SalesAchivementService } from '../../services/sales-achivement.service';
import { SalesTargetServiceService } from '../../services/sales-target-service.service';
import { ISalesAchivement } from '../../Models/SalesAchievement.model';
import { ISalesTarget } from '../../models/SalesTarget.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { ProductService } from '../../services/products-service.service';
import { StockService } from '../../services/stock.service';
import { IProduct } from '../../models/Products.model';
import { Stock } from '../../models/stock.model';
import { PharmacyService } from '../../services/pharmacy.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  salesAchievements: ISalesAchivement[] = [];
  salesTargets: ISalesTarget[] = [];
  totalTarget: number = 0;
  totalAchievement: number = 0;

  constructor(
    private salesAchievementService: SalesAchivementService,
    private salesTargetService: SalesTargetServiceService,
    private orderService:OrderService,
    private productService:ProductService,
    private stockService:StockService,
    private pharmacyService:PharmacyService
  ) {}

  ngOnInit(): void {
    // forkJoin({
    //   achievements: this.salesAchievementService.getAllSalesAchievements(),
    //   targets: this.salesTargetService.getAllSalesTargets()
    // }).subscribe(({ achievements, targets }) => {
    //   this.salesAchievements = achievements;
    //   this.salesTargets = targets;
    //   this.calculateSummary();
    // });

    this.salesAchievementService.getAllSalesAchievements().subscribe(result=>{
      this.salesAchievements=result;
      this.totalAchievement=this.salesAchievements.reduce((acc, achievement) => acc + achievement.amount, 0);
    });
     
    this.salesTargetService.getAllSalesTargets().subscribe(res=>{
      this.salesTargets=res;
      this.totalTarget = this.salesTargets.reduce((acc, target) => acc + target.targetTaka, 0);
    });
    
    this.orderMatrix();
    this.productmatrix();
    this.outletmatrix();
   
  }

  // calculateSummary(): void {
  //   this.totalTarget = this.salesTargets.reduce((acc, target) => acc + target.targetTaka, 0);
  //   this.totalAchievement = this.salesAchievements.reduce((acc, achievement) => acc + achievement.amount, 0);
  // }
  onhold:number=0;
  totalorder:number=0;
  holdDelivery:number=0;
  deliveryCompleted:number=0;
  onholdparcent:number=0;
  
orderMatrix():void{
  
  this.orderService.getAllOrder().subscribe(res=>{res.forEach((o:Order)=>{
    if (!o.isApproved) {
      this.onhold++;
    }
    if (o.isDelivered) {
      this.deliveryCompleted++;
    }

  });
this.totalorder=res.length;
this.holdDelivery=this.totalorder-this.onhold;
this.onholdparcent=((this.onhold/this.totalProduct)*100);
})

}


totalProduct:number=0;
productmatrix():void{
this.productService.getAllProduct().subscribe(res=>{
  this.totalProduct=res.length;
  
})

}

totalpharmacy:number=0;
outletmatrix():void{
this.pharmacyService.getAll().subscribe(res=>this.totalpharmacy=res.length)
}

}
