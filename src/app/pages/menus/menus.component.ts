import { Component, OnInit } from '@angular/core';
import { Dish } from './models/Dish';
import { MenuService } from './menu.service';
import { ToastrService } from 'ngx-toastr';
import { Menu } from './models/Menu';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: []
})
export class MenusComponent implements OnInit {
  restaurantId: number | null = null;

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
    restaurantId: 2,
    dishes: []
  }

  dishes: Dish[] = [];

  dishTypeSelected: number = 1;

  constructor(private service: MenuService, private router: ActivatedRoute, private toaster: ToastrService) {}
  
  ngOnInit(): void {
    this.getAllDishes();
    this.getRestaurantId();
  }

  getAllDishes() {
    this.service.getAllDishes().subscribe({
      next: (response) => {
        this.dishes = response;
      },
      error: () => this.toaster.error("Cound't load dishes")
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
      error: (_) => this.toaster.error("Error creating dish")
    })
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
