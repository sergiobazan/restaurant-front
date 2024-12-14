import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/AuthService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: []
})
export class MenuComponent {
  isLoggedIn: boolean = !!localStorage.getItem('token');

  constructor(private authService: AuthService) {}

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
  }
}
