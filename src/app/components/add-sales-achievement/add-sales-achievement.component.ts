import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import { SalesAchivementService } from '../../services/sales-achivement.service';
// import { ISalesAchivement } from '../../models/SalesAchievement.model';
import { SalesTargetServiceService } from '../../services/sales-target-service.service';
import { ISalesTarget } from '../../models/SalesTarget.model';
import { MatSelectModule } from '@angular/material/select';
import { ISalesAchivement } from '../../Models/SalesAchievement.model';

@Component({
  selector: 'app-add-sales-achievement',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  templateUrl: './add-sales-achievement.component.html',
  styleUrl: './add-sales-achievement.component.css',
})
export class AddSalesAchievementComponent {
  builder = inject(FormBuilder);
  service = inject(SalesAchivementService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  target = inject(SalesTargetServiceService);

  AllTarget: ISalesTarget[] = [];
  singleSalesTarget: ISalesTarget | undefined;

  submitted = false;
  SalesAchievementForm = this.builder.group({
    ID: [0],
    Amount: [0, [Validators.required]],
    SalesTargetsId: [0, [Validators.required]],
  });

  ID!: number;
  isEdit = false;

  ngOnInit() {
    this.ID = this.route.snapshot.params['id'];
    if (this.ID) {
      this.isEdit = true;
      this.service.getSalesAchivenemt(this.ID).subscribe((result) => {
        console.log(result);
        this.SalesAchievementForm.patchValue(result);
        this.SalesAchievementForm.controls.ID.disabled;
      });
    }
    // for binding target value in selectalist
    this.target.getAllSalesTargets().subscribe((result) => {
      this.AllTarget = result;
      console.log(result);
    });
  }

  Save() {
    console.log(this.SalesAchievementForm.value);
    const SalesAchievement: ISalesAchivement = {
      ID: this.SalesAchievementForm.value.ID!,
      Amount: this.SalesAchievementForm.value.Amount!,
      SalesTargetsId: this.SalesAchievementForm.value.SalesTargetsId!,
    };
    //Edit

    if (this.isEdit) {
      console.log(SalesAchievement);
      this.service
        .updateSalesAchievement(this.ID, SalesAchievement)
        .subscribe(() => {
          console.log('Edit success');
          this.router.navigateByUrl('List-of-SalesAchievement');
          this.toaster.info('Record Updated Successfully');
        });
    } else {
      this.service.createSalesAchievement(SalesAchievement).subscribe(() => {
        this.SalesAchievementForm = this.builder.group({
          ID: [0],
          Amount: [0, [Validators.required]],
          SalesTargetsId: [0, [Validators.required]],
        });
        console.log('success');
        this.router.navigateByUrl('List-of-SalesAchievement');
        this.toaster.success('Record created Successfully');
      });
    }
  }
}
