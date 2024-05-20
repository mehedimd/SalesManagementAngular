import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISalesAchivement } from '../Models/SalesAchievement.model';

@Injectable({
  providedIn: 'root'
})
export class SalesAchivementService {
  SalesAchievementApiUrl = 'https://localhost:7140/api/SalesAchivements/';
  http = inject(HttpClient);
  constructor() { }


  getAllSalesAchievements() {
    // console.log('getAllProduct', localStorage.getItem('token'));
    return this.http.get<ISalesAchivement[]>(this.SalesAchievementApiUrl);
  }
  createSalesAchievement(salesAchievement: ISalesAchivement): Observable<any> {
    return this.http.post(this.SalesAchievementApiUrl, salesAchievement)
  }
  getSalesAchivenemt(salesAchievementId: number) {
    return this.http.get<ISalesAchivement>(
      this.SalesAchievementApiUrl + salesAchievementId
    );
  }
  updateSalesAchievement(salesAchievementId: number, SalesAchievement: ISalesAchivement) {
    console.log(SalesAchievement)
    return this.http.put<ISalesAchivement>(
      this.SalesAchievementApiUrl + salesAchievementId,
      SalesAchievement
    );
  }
  deleteSalesAchievement(salesAchievementId: number) {
    return this.http.delete(this.SalesAchievementApiUrl + salesAchievementId);
  }








}
