import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/AuthService';
import { User } from './models/User';
import { HomeService } from './home.service';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from './models/Restaurant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  restaurantId: number = 3; // TODO fix restaurant id
  restaurant: Restaurant | null = null;
  
  constructor(
    private service: HomeService, 
    private auth: AuthService,
    private toaster: ToastrService) {}

  ngOnInit(): void {
   this.getUser();
   this.getRestaurant();
  }

  private getUser() {
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

  private getRestaurant() {
    this.service.getRestaurant(this.restaurantId).subscribe({
      next: (result) => {
        if (result.success) {
          this.restaurant = result.data;
          return;
        }
        return this.toaster.error(result.message);
      },
      error: ({error}) => this.toaster.error(error?.message || "Error fetching the restaurant")
    })
  }
}
