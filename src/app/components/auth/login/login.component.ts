import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private service: LoginService) {}

  onSubmit() {
    this.service.login(this.email, this.password).subscribe(response => {
      console.log("Response: ", response);
    });
  }
}
