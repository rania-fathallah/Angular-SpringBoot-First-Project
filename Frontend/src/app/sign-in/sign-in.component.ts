import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  user = {
    username: '',
    password: ''
  };
  loginError: string;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    //this.user.username = this.user.username || '';
    if (this.authService.login(this.user.username, this.user.password)) {
      this.router.navigateByUrl('');
    } else {
      console.log(this.user.password, this.user.username)
      this.loginError = 'Invalid username or password';
    }
  }
}
