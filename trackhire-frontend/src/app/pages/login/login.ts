import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: []
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Please enter email and password';
      alert(this.error);
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        if (response && response.token) {
          this.authService.saveToken(response.token);
          this.loading = false;
          alert('Login successful! Welcome back!');
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.loading = false;
        this.error = err.error?.error || 'Login failed. Please check your credentials.';
        alert(this.error);
      }
    });
  }

  onGoogleLogin() {
    alert('Google login coming soon');
  }
}