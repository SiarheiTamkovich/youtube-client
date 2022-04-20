import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(
    private router: Router,
    public authService: AuthService,
    private location: Location,
  ) { }

  public logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }

  public returnPrevPage() {
    this.location.back();
  }

}
