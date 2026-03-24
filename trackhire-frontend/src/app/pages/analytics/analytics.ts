import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './analytics.html',
  styleUrls: []
})
export class AnalyticsComponent implements OnInit {
  loading: boolean = true;
  total: number = 0;
  saved: number = 0;
  applied: number = 0;
  interview: number = 0;
  offer: number = 0;
  rejected: number = 0;
  offerRate: string = '0';
  responseRate: string = '0';

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.jobService.getStats().subscribe({
      next: (stats: any) => {
        this.total = stats.total || 0;
        this.saved = stats.saved || 0;
        this.applied = stats.applied || 0;
        this.interview = stats.interview || 0;
        this.offer = stats.offer || 0;
        this.rejected = stats.rejected || 0;

        if (this.total > 0) {
          this.offerRate = ((this.offer / this.total) * 100).toFixed(0);
          const responded = this.interview + this.offer + this.rejected;
          this.responseRate = ((responded / this.total) * 100).toFixed(0);
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading stats:', err);
        this.loading = false;
      }
    });
  }

  getBarWidth(count: number): string {
    if (this.total === 0) return '0%';
    return ((count / this.total) * 100).toFixed(0) + '%';
  }
}