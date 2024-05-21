import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  // for user profile
  user: any;
  role: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('home component called');
    this.user = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
  }

  // for login and logOut
  isLoggedIn(): boolean {
    const jwt = localStorage.getItem('jwtToken');
    if (jwt != null) {
      return false;
    }
    return true;
  }
  // logout
  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.ngOnInit();
  }
  // for Toggle side nav
  sidenavToggle(): any {
    let x = document.getElementById('body');
    x?.classList.toggle('toggle-sidebar');
  }
}
