import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/app/constants/apiUrl';
import { Response } from 'src/app/shared/Response';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClientOrders(clientId: number, date = 'today') {
    return this.http.get<Response>(`${apiUrl}/clients/${clientId}/orders?date=${date}`);
  }
}
