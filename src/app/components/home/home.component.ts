import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponentRifat } from '../homeRifat/home.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, HomeComponentRifat, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}
  // for login and logOut
  isLoggedIn(): boolean {
    const jwt = sessionStorage.getItem('jwtToken');
    if (jwt != null) {
      return false;
    }
    return true;
  }
  // logout
  logout() {
    sessionStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
  // for Toggle side nav
  sidenavToggle(): any {
    let x = document.getElementById('body');
    x?.classList.toggle('toggle-sidebar');
  }
}
