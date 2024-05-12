import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../../models/pharmacy.model';
import { PharmacyService } from '../../services/pharmacy.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pharmacy',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './pharmacy.component.html',
  styleUrl: './pharmacy.component.css'
})
export class PharmacyComponent implements OnInit{
  color : string = '';
  pharmacies? : Pharmacy[];
  constructor(private service : PharmacyService){}

  ngOnInit(): void {
    this.retrivePharmacy();
  }

  retrivePharmacy() : void{
    this.service.getAll().subscribe({
      next: (data) =>{
        this.pharmacies = data;
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
