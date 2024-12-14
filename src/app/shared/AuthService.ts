import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiUrl } from "../constants/apiUrl";
import { Response } from "./Response";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = localStorage.getItem('token');

  constructor(private http: HttpClient, private router: Router, private toaster: ToastrService) {}

  getAuthenticatedUser() {
    return this.http.get<Response>(`${apiUrl}/me`);
  }

  handleAuthError() {
    this.toaster.error('Error authenticating user');
    this.logout();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}