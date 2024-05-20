import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Register } from '../../../models/authentication/register.model';
import { RegisterService } from '../../../services/authentication/register.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  newRegisterForm: any = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  finalError: any = '';

  register() {
    //console.log(this.registerModel);
    this.registerService.create(this.newRegisterForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (e) => (this.finalError = e.error.error),
    });
  }
}
