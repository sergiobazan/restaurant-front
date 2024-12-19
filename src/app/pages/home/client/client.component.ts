import { Component, Input, SimpleChanges } from '@angular/core';
import { User } from '../models/User';
import { Restaurant } from '../models/Restaurant';
import { Dish, DishType } from '../models/Dish';
import * as moment from 'moment';
import { ClientService } from './client.service';
import { OrderRequest } from './models/OrderRequest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: []
})
export class ClientComponent {
  @Input()
  client: User | null = null;
  @Input()
  restaurant: Restaurant | null = null;
  isClosed: boolean = false;
  starters: Dish[] = [];
  mainCourse: Dish[] = [];

  starterSelected: Dish | null = null;
  mainSelected: Dish | null = null;

  instructions: string = 'Default';

  constructor(private service: ClientService, private toaster: ToastrService) {}

  protected selectStarter(starter: Dish) {
    this.starterSelected = starter;
  }

  protected selectMain(main: Dish) {
    this.mainSelected = main;
  }

  protected placeOrder() {
    const orderRequest: OrderRequest = {
      clientId: this.client?.id!,
      menuId: this.restaurant?.menu.id!,
      restaurantId: this.restaurant?.id!,
      description: this.instructions,
      dishIds: [this.starterSelected?.id!, this.mainSelected?.id!]
    };
    this.service.placeOrder(orderRequest).subscribe({
      next: (response) => {
        if (response.success) {
          this.toaster.success(response.message);
          return;
        }
        return this.toaster.error(response.message);
      },
      error: ({error}) => this.toaster.error(error?.message || "Error placing order")
    });
  }

  private ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurant'] && this.restaurant) {
      this.isClosed = this.getIsClosed();
      this.starters = this.restaurant.menu?.dishes.filter(dish => dish.type === DishType.STARTED) || [];
      this.mainCourse = this.restaurant.menu?.dishes.filter(dish => dish.type === DishType.MAIN_COURSE) || [];
    }
  }

  private getIsClosed() {
    const now = moment();
    const openAt = moment(this.restaurant?.openAt, 'HH:mm:ss');
    const closeAt = moment(this.restaurant?.closeAt, 'HH:mm:ss');
    return now.isBefore(openAt) || now.isAfter(closeAt);
  }

  isValidOrder() {
    return this.client && this.restaurant && this.mainSelected && this.starterSelected;
  }
}
