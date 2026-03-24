import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: []
})
export class SidebarComponent {
  userName: string = '';
  userEmail: string = '';
  userInitials: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.name;
      this.userEmail = user.email;
    }
    this.userInitials = this.authService.getUserInitials();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}