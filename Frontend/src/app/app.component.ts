import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetWeb';
  isNavbarCollapsed: boolean = true;

  isAuth =false;
  authSubscription : Subscription;

  constructor(private authService : AuthService, private router: Router){}
  ngOnInit() : void{
    this.authSubscription = this.authService.authSubject.subscribe(
      (isAuth : boolean) => {this.isAuth = isAuth;});
    this.authService.emitAuthSubject();
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  signOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}
