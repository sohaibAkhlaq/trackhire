import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { JobCardComponent } from '../../components/job-card/job-card';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent, JobCardComponent],
  templateUrl: './dashboard.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  savedJobs: any[] = [];
  appliedJobs: any[] = [];
  interviewJobs: any[] = [];
  offerJobs: any[] = [];
  rejectedJobs: any[] = [];
  loading: boolean = true;

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadJobs();
  }

  loadJobs() {
    this.loading = true;
    this.jobService.getJobs().subscribe({
      next: (jobs: any[]) => {
        this.savedJobs = jobs.filter(j => j.status === 'saved');
        this.appliedJobs = jobs.filter(j => j.status === 'applied');
        this.interviewJobs = jobs.filter(j => j.status === 'interview');
        this.offerJobs = jobs.filter(j => j.status === 'offer');
        this.rejectedJobs = jobs.filter(j => j.status === 'rejected');
        this.loading = false;
        console.log('Jobs loaded:', jobs.length);
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
        this.loading = false;
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }
}