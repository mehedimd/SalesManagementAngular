import { Component, OnInit } from '@angular/core';
import { Unit } from '../../models/unit.model';
import { UnitService } from '../../services/unit.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent implements OnInit{
  units? : Unit[];
  constructor(private service : UnitService){}

  ngOnInit(): void {
    this.retriveUnit();
  }

  retriveUnit() : void{
    this.service.getAll().subscribe({
      next: (data) =>{
        this.units = data;
        console.log(data);
      }
    })
  }
  Delete(id : any): void{
    this.service.delete(id).subscribe({
      next : (res) => {
        this.ngOnInit();
        console.log(res);
      },
      error : (e) => console.error(e)
    })
  }
}
