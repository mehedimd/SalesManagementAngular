import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { ListOfProductsComponent } from '../list-of-products/list-of-products.component';

@Component({
  selector: 'app-home-rifat',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [MatButtonModule, MatTooltipModule, MatIconModule, MatDividerModule],
})
export class HomeComponentRifat {
  redirectToSalesAchievement() {
    this.router.navigate(['/List-of-SalesAchievement']);
  }
  constructor(private router: Router) {}

  redirectToProduct() {
    this.router.navigate(['/List']);
  }
  redirectToSalesTargets() {
    this.router.navigate(['/List-of-SalesTarget']);
  }
}
