import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly hardUsername = 'root';
  private readonly hardPassword = 'root';

  isAuth : boolean = false;
  authSubject = new Subject<boolean>();
  constructor() { }

  emitAuthSubject(){
    this.authSubject.next(this.isAuth)
  }

  login(username: string, password: string): boolean {
    if (username === this.hardUsername && password === this.hardPassword) {
      this.isAuth = true;
      this.emitAuthSubject();
      return true;
    }else{
      return false;
    }
  }
  logout(){
    this.isAuth= false;
    this.emitAuthSubject();
  }
}
