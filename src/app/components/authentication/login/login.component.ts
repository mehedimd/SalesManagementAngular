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
        sessionStorage.setItem('jwtToken', res);
        this.router.navigate(['/home']);
      },
      error: (e) => (this.finalError = e.error.error),
    });
  }
}
