import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../../models/pharmacy.model';
import { FormsModule } from '@angular/forms';
import { PharmacyService } from '../../services/pharmacy.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-pharmacy',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-pharmacy.component.html',
  styleUrl: './add-pharmacy.component.css',
})
export class AddPharmacyComponent implements OnInit {
  pharmacy: Pharmacy = {
    pharmacyName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  };
  id!: number;
  constructor(
    private service: PharmacyService,
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
          this.pharmacy = data;
        },
      });
    }
  }
  addPharmacy(): void {
    this.service.create(this.pharmacy).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/pharmacy']);
      },
      error: (e) => console.error(e),
    });
  }
  updatePharmacy(): void {
    this.service.update(this.id, this.pharmacy).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['pharmacy']);
      },
      error: (e) => console.error(e),
    });
  }
}
