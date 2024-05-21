import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ISalesTarget } from '../Models/SalesTarget.model';

@Injectable({
  providedIn: 'root'
})

export class SalesTargetServiceService {
  SalesApiUrl = 'https://localhost:7140/Api/SalesTargets/';
  http = inject(HttpClient);
  
  constructor() { }


  getAllSalesTargets() {
    // console.log('getAllProduct', localStorage.getItem('token'));
    return this.http.get<ISalesTarget[]>(this.SalesApiUrl);
  }
  createSalesTarget(salesTarget: ISalesTarget): Observable<any> {
    return this.http.post(this.SalesApiUrl, salesTarget)
    // pipe(
    //   map((response: any) => {
    //     // You can perform any processing of the response here if needed
    //     // For example, returning just the response body
    //     return response;
        
    //   })
    // );
  }
  getSalesTaget(salesTargetId: number) {
    return this.http.get<ISalesTarget>(
      this.SalesApiUrl + salesTargetId
    );
  }
  updateSalesTarget(salesTargetId: number, SalesTarget: ISalesTarget) {
    console.log(SalesTarget)
    return this.http.put<ISalesTarget>(
      this.SalesApiUrl + salesTargetId,
      SalesTarget
    );
  }
  deleteSalesTarget(salesTargetId: number) {
    return this.http.delete(this.SalesApiUrl + salesTargetId);
  }





}
