
import { Component, OnInit } from '@angular/core';
import { SalesAchivementService } from '../../services/sales-achivement.service';
import { SalesTargetServiceService } from '../../services/sales-target-service.service';
import { ISalesAchivement } from '../../Models/SalesAchievement.model';
import { ISalesTarget } from '../../models/SalesTarget.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

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
    private salesTargetService: SalesTargetServiceService
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
   
  }

  // calculateSummary(): void {
  //   this.totalTarget = this.salesTargets.reduce((acc, target) => acc + target.targetTaka, 0);
  //   this.totalAchievement = this.salesAchievements.reduce((acc, achievement) => acc + achievement.amount, 0);
  // }
}
