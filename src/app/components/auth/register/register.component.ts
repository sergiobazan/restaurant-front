import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/RegisterRequest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  birthDay: Date = new Date();

  constructor(private service: RegisterService, private router: Router, private toaster: ToastrService) {}

  onSubmit() {
    const request: RegisterRequest = {
      name: this.name,
      email: this.email,
      password: this.password,
      birthDay: this.birthDay,
      role: "CLIENT"
    } 
    this.service.register(request).subscribe(response => {
      if (response.success) {
        this.router.navigate(['/login']);
      } else {
        this.toaster.error("Invalid Credentials");
      }
    },
    ({error}) => {
      this.toaster.error(error.message)
    });
  }
}
