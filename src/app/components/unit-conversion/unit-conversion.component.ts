import { Component, OnInit } from '@angular/core';
import { UnitConversionService } from '../../services/unit-conversion.service';
import { UnitConversion } from '../../models/unit-conversion.model';
import { RouterLink } from '@angular/router';
import { MatTableModule} from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-unit-conversion',
  standalone: true,
  imports: [RouterLink,MatTableModule,MatButtonModule, MatIconModule],
  templateUrl: './unit-conversion.component.html',
  styleUrl: './unit-conversion.component.css'
})
export class UnitConversionComponent implements OnInit{
  unitconversion!: UnitConversion[];
  columns : string[] = ['unitConversionId','productId','productName','unitId','unitName','quantity','actions']

  ngOnInit(): void {
    this.retrive();
  }
  constructor(private service : UnitConversionService){}
  retrive() : void{
    this.service.getAll().subscribe({
      next: (data) =>{
        this.unitconversion = data;
        console.log(data);
      }
    })
  }
  Delete(id : any) : void{
    this.service.delete(id).subscribe({
      next : (res) =>{
        this.ngOnInit();
      },
      error : (e) => console.error(e)
    })
  }

}
