import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/app/constants/apiUrl';
import { Response } from 'src/app/shared/Response';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getRestaurant(id: number) {
    return this.http.get<Response>(`${apiUrl}/restaurants/${id}`);
  }
}
