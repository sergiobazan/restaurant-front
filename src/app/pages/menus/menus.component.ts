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
  addMenuSelected: boolean = false;
  editMenuSelected: boolean = false;

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
    isAvailable: true,
    restaurantId: this.restaurantId!
  };

  menu: Menu = {
    name: '',
    date: new Date(),
    price: 15,
    restaurantId: this.restaurantId!,
    dishes: []
  }

  todayMenu: Menu | null = null;
  todayDishes: Dish[] = [];

  dishes: Dish[] = [];

  dishTypeSelected: number = 1;

  constructor(private service: MenuService, private homeService: HomeService, private router: ActivatedRoute, private toaster: ToastrService) {}
  
  ngOnInit(): void {
    this.getRestaurantId();
    this.getRestaurant();
    this.getAllDishes();
  }

  getAllDishes() {
    this.service.getAllDishes(this.restaurantId!).subscribe({
      next: (response) => {
        if (response.success) {
          this.dishes = response.data;
          return;
        }
        return this.toaster.error(response.message);
      },
      error: () => this.toaster.error("Cound't load dishes")
    })
  }

  getRestaurant() {
    this.homeService.getRestaurant(this.restaurantId!).subscribe({
      next: (response) => {
        if (response.success) {
          this.restaurant = response.data;
          this.editMenuSelected = response.data.menu !== null;
          this.addMenuSelected = response.data.menu === null;
          this.todayMenu = response.data.menu;
          this.todayDishes = response.data.menu?.dishes || [];
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
      type: this.dishTypeSelected,
      restaurantId: this.restaurantId!
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
            isAvailable: true,
            restaurantId: this.restaurantId!
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
          this.getRestaurant();
          return;
        }
        return this.toaster.error(response.message);
      },
      error: ({error}) => this.toaster.error(error?.message)
    })
  }

  onEditMenu() {

  }


  onSelectEditMenu() {
    this.editMenuSelected = true;
    this.addDishSelected = false;
    this.addMenuSelected = false;
  }
  
  onAddDish(){
    this.addMenuSelected = false;
    this.addDishSelected = true;
    this.editMenuSelected = false;
  }

  onAddMenu() {
    this.addDishSelected = false;
    this.addMenuSelected = true;
    this.editMenuSelected = false;
  }

  getRestaurantId() {
    this.restaurantId = parseInt(this.router.snapshot.paramMap.get('restaurantId')!);
  }

}
