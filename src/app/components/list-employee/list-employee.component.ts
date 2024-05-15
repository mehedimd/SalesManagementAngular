import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TooltipModule } from 'primeng/tooltip';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule,TooltipModule],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})
export class ListEmployeeComponent implements OnInit {
 
  router=inject(Router)
  toaster=inject(ToastrService)
 
  
  employeelist:Employee[]=[];
 //  http=inject(ProductService);
  displayedColumns: string[] = ['employeeId', 'employeeName', 'designation', 'gender','phoneNumber','emailAddress','address','Action'];
  constructor(private http:EmployeeService) {}
  ngOnInit(){
   this.http.getAllEmployee().subscribe((result:Employee[])=>{this.employeelist=result;
     console.log(this.employeelist)
   });
   
  }
 
 
  Edit(employeeId: number) {
 
 this.router.navigateByUrl("/employee/"+employeeId)
  }
 
  Delete(employeeId: number) {
   this.http.deleteEmployee(employeeId).subscribe((data:any)=>{
     console.log(data)
     // this.productlist=this.productlist.filter(x=>x.ProductId!=ProductId)
     this.ngOnInit();
     this.toaster.info(data)
   })
   }
 
 
}
