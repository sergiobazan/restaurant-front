import { Component, Input, SimpleChanges } from '@angular/core';
import { User } from '../models/User';
import { Restaurant } from '../models/Restaurant';
import { Dish, DishType } from '../models/Dish';
import * as moment from 'moment';

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

  protected selectStarter(starter: Dish) {
    this.starterSelected = starter;
  }

  protected selectMain(main: Dish) {
    this.mainSelected = main;
  }

  protected orderMenu() {
    console.log("Starter: ", this.starterSelected)
    console.log("Main: ", this.mainSelected)
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
}
