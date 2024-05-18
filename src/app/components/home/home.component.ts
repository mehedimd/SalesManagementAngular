import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponentRifat } from '../homeRifat/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, HomeComponentRifat, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
