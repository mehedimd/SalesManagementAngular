import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginService } from '../../../services/authentication/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  newLoginForm: any = this.formBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  finalError: any = '';

  login() {
    this.loginService.loginPost(this.newLoginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('jwtToken', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('logInUser', res.applicationUser.userName);
        window.location.reload();
        this.router.navigate(['/']);
      },
      error: (e) => {
        this.finalError = e.error.error;
      },
    });
  }
}
