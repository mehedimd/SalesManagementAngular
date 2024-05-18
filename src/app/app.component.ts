import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    RouterLinkActive,
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'myPharmacy';
  isLoggedIn(): boolean {
    const jwt = sessionStorage.getItem('jwtToken');
    if (jwt != null) {
      return false;
    }
    return true;
  }
  logout() {
    sessionStorage.removeItem('jwtToken');
  }
}
