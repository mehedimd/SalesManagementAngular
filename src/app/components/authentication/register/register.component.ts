import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Register } from '../../../models/authentication/register.model';
import { RegisterService } from '../../../services/authentication/register.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerModel: Register = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}
  register() {
    //console.log(this.registerModel);
    this.registerService.create(this.registerModel).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (e) => console.log(e),
    });
  }
}
