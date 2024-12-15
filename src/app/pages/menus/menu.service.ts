import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from './models/Dish';
import { apiUrl } from 'src/app/constants/apiUrl';
import { Response } from 'src/app/shared/Response';
import { Menu } from './models/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  createDish(dish: Dish) {
    return this.http.post<Response>(`${apiUrl}/dishes`, dish);
  }

  createMenu(menu: Menu) {
    return this.http.post<Response>(`${apiUrl}/menus`, menu);
  }

  getAllDishes() {
    return this.http.get<Dish[]>(`${apiUrl}/dishes`);
  }
}
