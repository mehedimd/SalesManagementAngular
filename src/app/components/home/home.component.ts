import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponentRifat } from '../homeRifat/home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, HomeComponentRifat],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
