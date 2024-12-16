import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/app/constants/apiUrl';
import { Response } from 'src/app/shared/Response';
import { RestaurantRequest } from '../models/RestaurantRequest';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  getRestaurant(id: number) {
    return this.http.get<Response>(`${apiUrl}/owners/${id}/restaurant`);
  }

  createRestaurant(restaurant: RestaurantRequest) {
    return this.http.post<Response>(`${apiUrl}/restaurants`, restaurant);
  }
}
