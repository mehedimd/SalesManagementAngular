import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UnitConversionService } from '../../services/unit-conversion.service';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../models/unit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitConversion } from '../../models/unit-conversion.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-unit-conversion',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, MatButtonModule],
  templateUrl: './add-unit-conversion.component.html',
  styleUrl: './add-unit-conversion.component.css'
})
export class AddUnitConversionComponent implements OnInit{

  allUnit? : Unit[];
  id? : any;
  isEdit = false;
  
  constructor(private formBuilder : FormBuilder,
    private conversionService : UnitConversionService,
    private unitService : UnitService,
    private route : ActivatedRoute,
    private router: Router
  ){}

  unitConversionForm : any = this.formBuilder.group({
    unitConvertionId : [0],
    unitId : [0],
    productId: [0],
    quantity : [0,[Validators.required]]
  })

  ngOnInit(): void {
       this.id = this.route.snapshot.params['id'];
       console.log(this.id)

       if(this.id){
        this.isEdit = true;
        this.conversionService.get(this.id).subscribe({
          next : (data) => {
           this.unitConversionForm.patchValue(data)
          },
          error : (e) => console.error(e)
        })
       }

       this.unitService.getAll().subscribe({
        next : (data) => {
          this.allUnit = data;
          console.log(data)
        },
        error : (e) => console.error(e)
       });

  }
  submitForm() : void{
    const formData : UnitConversion = {
      unitConvertionId : this.unitConversionForm.value.unitConvertionId!,
      unitId : this.unitConversionForm.value.unitId!,
      productId : this.unitConversionForm.value.productId!,
      quantity : this.unitConversionForm.value.quantity!
    }

    if(this.isEdit){
      this.conversionService.update(this.id,formData).subscribe({
        next : (e) => this.router.navigate(['/unitConversion']),
        error : (e) => console.log(e)
      })
    }
    else{
      this.conversionService.create(formData).subscribe({
        next : (res) => this.router.navigate(['/unitConversion']),
        error : (e) => console.log(e)
      });
    }
  }
  
}
