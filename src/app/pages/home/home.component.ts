import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/AuthService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnInit {
  user: any = null;
  
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getAuthenticatedUser().subscribe({
      next: (result) => {
        if (result.success) {
          this.user = result.data;
          return;
        }
        this.auth.handleAuthError();
      },
      error: (_) => this.auth.handleAuthError()
    });
  }
}
