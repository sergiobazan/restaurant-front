import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/RegisterRequest';
import { Response } from '../../../shared/Response';
import { apiUrl } from 'src/app/constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(data: RegisterRequest) {
    return this.http.post<Response>(`${apiUrl}/register`, data);
  }
}
