import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequest } from './models/OrderRequest';
import { Response } from 'src/app/shared/Response';
import { apiUrl } from 'src/app/constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  placeOrder(order: OrderRequest) {
    return this.http.post<Response>(`${apiUrl}/orders`, order);
  }
}
