import { Component, OnInit } from '@angular/core';
import { Dish } from './models/Dish';
import { MenuService } from './menu.service';
import { ToastrService } from 'ngx-toastr';
import { Menu } from './models/Menu';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../home/models/Restaurant';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: []
})
export class MenusComponent implements OnInit {
  restaurantId: number | null = null;
  restaurant: Restaurant | null = null;

  addDishSelected: boolean = false;
  addMenuSelected: boolean = true;

  dishTypes = ['Starter', 'Main Course', 'Extra'].map((dt, idx) => ({id: idx, name: dt}));

  config = {
    displayKey: 'name',
    placeholder:'Select dishes'
  }

  selectedDishes: Dish[] = [];

  dish: Dish = {
    name: '',
    unitPrice: 10,
    description: '',
    type: 1,
    isAvailable: true
  };

  menu: Menu = {
    name: '',
    date: new Date(),
    price: 15,
    restaurantId: this.restaurantId!,
    dishes: []
  }

  dishes: Dish[] = [];

  dishTypeSelected: number = 1;

  constructor(private service: MenuService, private homeService: HomeService, private router: ActivatedRoute, private toaster: ToastrService) {}
  
  ngOnInit(): void {
    this.getAllDishes();
    this.getRestaurantId();
    this.getRestaurant();
  }

  getAllDishes() {
    this.service.getAllDishes().subscribe({
      next: (response) => {
        this.dishes = response;
      },
      error: () => this.toaster.error("Cound't load dishes")
    })
  }

  getRestaurant() {
    this.homeService.getRestaurant(this.restaurantId!).subscribe({
      next: (response) => {
        if (response.success) {
          this.restaurant = response.data;
          return;
        }
        return this.toaster.error(response.message);
      },
      error: ({error}) => this.toaster.error(error?.message || "Error fetching the restaurant")
    })
  }

  onCreateDish() {
    this.dish = {
      ...this.dish,
      type: this.dishTypeSelected
    }
    
    this.service.createDish(this.dish).subscribe({
      next: (response) => {
        if (response.success) {
          this.toaster.success(response.message);
          this.dish = {
            name: '',
            unitPrice: 10,
            description: '',
            type: 1,
            isAvailable: true
          }
          this.getAllDishes();
          return;
        }
        return this.toaster.error(response.message);
      },
      error: (_) => this.toaster.error("Error creating dish")
    })
  }

  onCreateMenu() {
    this.menu = {
      ...this.menu,
      restaurantId: this.restaurantId!,
      dishes: this.selectedDishes.length > 0 ? this.selectedDishes.map(d => d.id!) : []
    }
    
    this.service.createMenu(this.menu).subscribe({
      next: (response) => {
        if (response.success) {
          this.toaster.success(response.message);
          this.menu = {
            name: '',
            date: new Date(),
            price: 15,
            restaurantId: this.restaurantId!,
            dishes: []
          }
          this.selectedDishes = []
          return;
        }
        return this.toaster.error(response.message);
      },
      error: ({error}) => this.toaster.error(error?.message)
    })
  }

  onEditMenu() {
    
  }

  onAddDish(){
    this.addMenuSelected = false;
    this.addDishSelected = true;
  }

  onAddMenu() {
    this.addDishSelected = false;
    this.addMenuSelected = true;
  }

  getRestaurantId() {
    this.restaurantId = parseInt(this.router.snapshot.paramMap.get('restaurantId')!);
  }

}
