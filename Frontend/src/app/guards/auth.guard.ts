import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this.authService.isAuth) return true;
    this.router.navigate(['/signin'])
    return false;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
 return inject(GuardService).canActivate();
// return true;
};