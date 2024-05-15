import { Component } from '@angular/core';
import { Unit } from '../../models/unit.model';
import { UnitService } from '../../services/unit.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unit-add',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './unit-add.component.html',
  styleUrl: './unit-add.component.css',
})
export class UnitAddComponent {
  unit: Unit = {
    unitName: '',
  };
  id!: number;
  isValid = false;
  constructor(
    private service: UnitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    if (this.id) {
      this.service.get(this.id).subscribe({
        next: (data) => {
          console.log(data);
          this.unit = data;
        },
      });
    }
  }
  addUnit(): void {
    if (this.unit.unitName != null) {
      this.service.create(this.unit).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/unit']);
        },
        error: (e) => console.error(e),
      });
    } else {
      this.isValid = false;
    }
  }
  updateUnit(): void {
    this.service.update(this.id, this.unit).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['unit']);
      },
      error: (e) => console.error(e),
    });
  }
}
