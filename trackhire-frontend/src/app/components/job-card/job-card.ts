import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrls: []
})
export class JobCardComponent {
  @Input() title: string = '';
  @Input() company: string = '';
  @Input() location: string = '';
  @Input() appliedDate: string | Date = '';
  @Input() status: 'saved' | 'applied' | 'interview' | 'offer' | 'rejected' = 'applied';

  get statusColor(): string {
    const colors = {
      saved: '#6366F1',
      applied: '#6366F1',
      interview: '#10B981',
      offer: '#10B981',
      rejected: '#EF4444'
    };
    return colors[this.status];
  }

  get formattedDate(): string {
    if (!this.appliedDate) return 'No date';
    const date = new Date(this.appliedDate);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}