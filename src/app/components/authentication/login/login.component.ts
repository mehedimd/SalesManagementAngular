import { Component } from '@angular/core';
import { Login } from '../../../models/authentication/login.model';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/authentication/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginModel: Login = {
    userName: '',
    password: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}
  login() {
    this.loginService.loginPost(this.loginModel).subscribe({
      next: (res) => {
        console.log(res);
        sessionStorage.setItem('jwtToken', res);
        this.router.navigate(['/home']);
      },
      error: (e) => console.log(e),
    });
  }
}
