import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  split(arg0: string) {
    throw new Error('Method not implemented.');
  }

  public urlFrom: string | undefined = '';

  constructor(
    private router: Router,
    private authService: AuthService ) {}

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {

    this.urlFrom = route.path;
    console.log('UrlFrom: '+ this.urlFrom);

    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean|Observable<boolean>|Promise<boolean> {

    this.urlFrom = state.url;
    //console.log('UrlFrom: '+ this.urlFrom);

    return this.checkLogin(this.urlFrom);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) return true;
    this.router.navigate(['/home/auth/login'])
    return false
  }
}
