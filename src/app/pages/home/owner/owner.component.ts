import { Component, Input, SimpleChanges } from '@angular/core';
import { User } from '../models/User';
import { OwnerService } from './owner.service';
import { Restaurant } from '../models/Restaurant';
import { ToastrService } from 'ngx-toastr';
import { RestaurantRequest } from '../models/RestaurantRequest';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: []
})
export class OwnerComponent {
  @Input()
  owner: User | null = null;

  restaurant: Restaurant | null = null;

  restaurantInput: RestaurantRequest = {
      name: '',
      address: '',
      description: '',
      openAt: new Date(),
      closeAt: new Date(),
      ownerId: this.owner?.id!
  }

  constructor(private service: OwnerService, private toaster: ToastrService) {}

  private ngOnChanges(changes: SimpleChanges) {
    if (changes['owner'] && this.owner) {
      this.getRestaurant();
      this.restaurantInput.ownerId = this.owner.id;
    }
  }

  getRestaurant() {
    this.service.getRestaurant(this.owner?.id!).subscribe({
      next: (response)=> {
        if (response.success) {
          this.restaurant = response.data;
        }
      },
      error: () => this.toaster.warning("You must create a restaurant")
    })
  }

  createRestaurant() {
    console.log(this.restaurantInput);
    this.service.createRestaurant(this.restaurantInput).subscribe({
      next: (response) => {
        if (response.success) {
          this.restaurant = response.data;
          return this.toaster.success("Restaurant Created Successfully");
        }
        return this.toaster.error(response.message);
      },
      error: () => this.toaster.error("Error creating restaurant")
    })
  }
}
