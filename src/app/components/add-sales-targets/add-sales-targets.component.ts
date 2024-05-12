import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SalesTargetServiceService } from '../../services/sales-target-service.service';
import { ISalesTarget } from '../../models/SalesTarget.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-sales-targets',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  templateUrl: './add-sales-targets.component.html',
  styleUrl: './add-sales-targets.component.css',
})
export class AddSalesTargetsComponent {
  builder = inject(FormBuilder);
  service = inject(SalesTargetServiceService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  submitted = false;
  SalesTargetForm = this.builder.group({
    SalesTargetId: [0],
    TargetTaka: [0, [Validators.required]],
    ClosingDate: [new Date(), [Validators.required]],
    EmployeeId: [0],
  });

  SalesTargetId!: number;
  isEdit = false;

  ngOnInit() {
    this.SalesTargetId = this.route.snapshot.params['id'];
    if (this.SalesTargetId) {
      this.isEdit = true;
      this.service.getSalesTaget(this.SalesTargetId).subscribe((result) => {
        console.log(result);
        this.SalesTargetForm.patchValue(result);
        this.SalesTargetForm.controls.SalesTargetId.disabled;
      });
    }
  }

  Save() {
    console.log(this.SalesTargetForm.value);
    const SalesTarget: ISalesTarget = {
      SalesTargetId: this.SalesTargetForm.value.SalesTargetId!,
      TargetTaka: this.SalesTargetForm.value.TargetTaka!,
      ClosingDate: this.SalesTargetForm.value.ClosingDate!,
      EmployeeId: this.SalesTargetForm.value.EmployeeId!,
    };
    //Edit

    if (this.isEdit) {
      console.log(SalesTarget);
      this.service
        .updateSalesTarget(this.SalesTargetId, SalesTarget)
        .subscribe(() => {
          console.log('Edit success');
          this.router.navigateByUrl('List-of-SalesTarget');
          this.toaster.info('Record Updated Successfully');
        });
    } else {
      this.service.createSalesTarget(SalesTarget).subscribe(() => {
        this.SalesTargetForm = this.builder.group({
          SalesTargetId: [0],
          TargetTaka: [0, [Validators.required]],
          ClosingDate: [new Date(), [Validators.required]],
          EmployeeId: [0],
        });
        console.log('success');
        this.router.navigateByUrl('List-of-SalesTarget');
        this.toaster.success('Record created Successfully');
      });
    }

    //   this.service.createProduct(product).subscribe(() => {
    //     console.log("success");
    //     this.router.navigateByUrl("\List")
    // });
  }
}
