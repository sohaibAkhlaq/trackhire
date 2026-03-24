import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: []
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onRegister() {
    if (!this.name || !this.email || !this.password) {
      this.error = 'Please fill all fields';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response: any) => {
        if (response && response.token) {
          this.authService.saveToken(response.token);
          this.authService.saveUser(response.user);
          this.loading = false;
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err.error?.error || 'Registration failed. Please try again.';
      }
    });
  }
}