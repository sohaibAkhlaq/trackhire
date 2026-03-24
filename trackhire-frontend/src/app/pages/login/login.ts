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
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
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
        this.error = err.error?.error || 'Login failed. Please check your credentials.';
      }
    });
  }

  onGoogleLogin() {
    this.error = 'Google login coming soon!';
  }
}