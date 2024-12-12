import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private service: LoginService, private router: Router) {}

  onSubmit() {
    this.service.login(this.email, this.password).subscribe(response => {
      if (response.success) {
        const token = response.data;
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      } else {
        // TODO handle error
        throw new Error("Invalid Credentials");
      }
    });
  }
}
