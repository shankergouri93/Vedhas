import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import users from './logindata.json';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private users: any[] = [];
  public IsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(
    this.isUserAuthenticated()
  );
  constructor() {
    this.users = users;
  }
  public IsValid(username: string, password: string): boolean {
    if (users.find((u) => u.username == username && u.password == password)) {
      return true;
    }
    return false;
  }
  public loginUser() {
    this.IsLoggedIn.next(true);
    localStorage.setItem('userLogin', 'true');
  }
  public LogoutUser() {
    localStorage.setItem('userLogin', 'false');
    this.IsLoggedIn.next(false);
  }
  public isUserAuthenticated(): boolean {
    const isUserAuth = localStorage.getItem('userLogin');
    if (isUserAuth && isUserAuth === 'true') {
      return true;
    }
    return false;
  }
}
