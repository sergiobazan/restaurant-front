import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../../../shared/Response';
import { apiUrl } from 'src/app/constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<Response>(`${apiUrl}/login`, {
      email,
      password
    });
  }

  logout() {
    // TODO Handle logout
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
