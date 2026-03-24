import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-card.html',
  styleUrls: []
})
export class JobCardComponent {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() company: string = '';
  @Input() location: string = '';
  @Input() appliedDate: string | Date = '';
  @Input() status: 'saved' | 'applied' | 'interview' | 'offer' | 'rejected' = 'applied';

  @Output() deleteJob = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<{ id: string; status: string }>();

  showActions: boolean = false;

  get formattedDate(): string {
    if (!this.appliedDate) return 'No date';
    const date = new Date(this.appliedDate);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  onDelete() {
    if (confirm('Delete this job application?')) {
      this.deleteJob.emit(this.id);
    }
  }

  onStatusChange(newStatus: string) {
    this.statusChange.emit({ id: this.id, status: newStatus });
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }
}