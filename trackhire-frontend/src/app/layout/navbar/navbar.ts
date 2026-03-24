import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {
  pageTitle: string = 'Job Applications';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        if (url.includes('dashboard')) this.pageTitle = 'Job Applications';
        else if (url.includes('analytics')) this.pageTitle = 'Analytics';
        else if (url.includes('profile')) this.pageTitle = 'Profile';
      }
    });
  }
}