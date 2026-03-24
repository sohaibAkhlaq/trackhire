import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { JobCardComponent } from '../../components/job-card/job-card';
import { AddJobModalComponent } from '../../components/add-job-modal/add-job-modal';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent, JobCardComponent, AddJobModalComponent],
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
  showAddModal: boolean = false;

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
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
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
        this.loading = false;
      }
    });
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  onJobAdded() {
    this.loadJobs();
    this.showAddModal = false;
  }

  deleteJob(id: string) {
    this.jobService.deleteJob(id).subscribe({
      next: () => this.loadJobs(),
      error: (err) => console.error('Error deleting job:', err)
    });
  }

  updateJobStatus(event: { id: string; status: string }) {
    this.jobService.updateJob(event.id, { status: event.status }).subscribe({
      next: () => this.loadJobs(),
      error: (err) => console.error('Error updating job:', err)
    });
  }
}