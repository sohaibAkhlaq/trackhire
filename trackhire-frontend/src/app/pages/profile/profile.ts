import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './profile.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userInitials: string = '';
  totalApplications: number = 0;
  memberSince: string = '';
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.name;
      this.userEmail = user.email;
    }
    this.userInitials = this.authService.getUserInitials();
    this.memberSince = new Date().getFullYear().toString();

    this.jobService.getStats().subscribe({
      next: (stats: any) => {
        this.totalApplications = stats.total || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}