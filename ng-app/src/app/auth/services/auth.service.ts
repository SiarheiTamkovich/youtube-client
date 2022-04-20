import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: UserModel;

  constructor() { }

  public get isLoggedIn(): boolean {
    return (localStorage.getItem('user') !== null);
  }

  public logIn(username: string, password: string): boolean {
    if (username === 'admin123' && password === 'admin123') {
      localStorage.setItem('user', 'isLogin');
      return true;
    }
    return false
  }

  public logOut(): void {
    localStorage.removeItem('user')
  }


}


