import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-add-job-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-job-modal.html',
  styleUrls: ['./add-job-modal.css']
})
export class AddJobModalComponent {
  @Output() jobAdded = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  job = {
    title: '',
    company: '',
    location: '',
    status: 'saved',
    appliedDate: new Date().toISOString().split('T')[0]
  };
  
  loading: boolean = false;

  constructor(private jobService: JobService) {}

  onSubmit() {
    if (!this.job.title || !this.job.company || !this.job.location) {
      return;
    }

    this.loading = true;

    this.jobService.createJob(this.job).subscribe({
      next: () => {
        this.loading = false;
        this.jobAdded.emit();
        this.close();
      },
      error: (err) => {
        console.error('Error adding job:', err);
        this.loading = false;
        
        // Show detailed error message
        const errorMsg = err.error?.error || err.message || 'Unknown error';
        alert(`Failed to add job: ${errorMsg}`);
      }
    });
  }

  close() {
    this.closeModal.emit();
  }
}