import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UnitConversionService } from '../../services/unit-conversion.service';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../models/unit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitConversion } from '../../models/unit-conversion.model';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/products-service.service';

@Component({
  selector: 'app-add-unit-conversion',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './add-unit-conversion.component.html',
  styleUrl: './add-unit-conversion.component.css',
})
export class AddUnitConversionComponent implements OnInit {
  allUnit?: Unit[];
  allProducts?: any;
  id?: any;
  isEdit = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private conversionService: UnitConversionService,
    private unitService: UnitService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  unitConversionForm: any = this.formBuilder.group({
    unitConvertionId: [0],
    unitId: ['', [Validators.required]],
    productId: ['', [Validators.required]],
    quantity: ['', [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    if (this.id) {
      this.isEdit = true;
      this.conversionService.get(this.id).subscribe({
        next: (data) => {
          this.unitConversionForm.patchValue(data);
        },
        error: (e) => console.error(e),
      });
    }
    // get all unit call
    this.getAllUnit();

    // get all prodcuts call
    this.getAllProducts();
  }

  // get all unit
  getAllUnit() {
    this.unitService.getAll().subscribe({
      next: (data) => {
        this.allUnit = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  // getAllProduct
  getAllProducts() {
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        this.allProducts = data;
      },
      error: (e) => console.error(e),
    });
  }
  // form add and edit
  submitForm(): void {
    console.log(this.unitConversionForm.value);
    const formData: UnitConversion = {
      unitConvertionId: this.unitConversionForm.value.unitConvertionId!,
      unitId: this.unitConversionForm.value.unitId!,
      productId: this.unitConversionForm.value.productId!,
      quantity: this.unitConversionForm.value.quantity!,
    };

    if (this.isEdit) {
      this.conversionService.update(this.id, formData).subscribe({
        next: (e) => this.router.navigate(['/unitConversion']),
        error: (e) => console.log(e),
      });
    } else {
      this.conversionService.create(formData).subscribe({
        next: (res) => this.router.navigate(['/unitConversion']),
        error: (e) => console.log(e),
      });
    }
  }
}
