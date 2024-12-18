import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/AuthService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: []
})
export class MenuComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout(): void {
    this.authService.logout();
    this.checkLoginStatus();
  }
}
