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
      alert(this.error);
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);
        if (response && response.token) {
          this.authService.saveToken(response.token);
          this.loading = false;
          alert('Registration successful! Welcome to TrackHire!');
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        console.error('Registration error:', err);
        this.loading = false;
        this.error = err.error?.error || 'Registration failed. Please try again.';
        alert(this.error);
      }
    });
  }
}