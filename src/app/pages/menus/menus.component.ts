import { Component, OnInit } from '@angular/core';
import { Dish } from './Dish';
import { MenuService } from './menu.service';
import { ToastrService } from 'ngx-toastr';
import { Menu } from './Menu';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: []
})
export class MenusComponent implements OnInit {
  addDishSelected: boolean = false;
  addMenuSelected: boolean = true;

  config = {
    displayKey: 'name',
    placeholder:'Select dishes'
  }

  selectedDishes: Dish[] = [];

  dish: Dish = {
    name: '',
    unitPrice: 10,
    description: ''
  };

  menu: Menu = {
    name: '',
    date: new Date(),
    price: 15,
    restaurantId: 2,
    dishes: []
  }

  dishes: Dish[] = [];

  constructor(private service: MenuService, private toaster: ToastrService) {}
  
  ngOnInit(): void {
    this.service.getAllDishes().subscribe({
      next: (response) => {
        this.dishes = response;
      },
      error: () => this.toaster.error("Cound't load dishes")
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

  onCreateDish() {
    this.service.createDish(this.dish).subscribe({
      next: (response) => {
        if (response.success) {
          this.toaster.success(response.message);
          this.dish = {
            name: '',
            unitPrice: 10,
            description: ''
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
      dishes: this.selectedDishes.map(d => d.id!)
    }
    this.service.createMenu(this.menu).subscribe({
      next: (response) => {
        if (response.success) {
          this.toaster.success(response.message);
          this.menu = {
            name: '',
            date: new Date(),
            price: 15,
            restaurantId: 2,
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
}
