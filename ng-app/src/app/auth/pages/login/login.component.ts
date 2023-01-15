import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public username = new FormControl('');
  public password = new FormControl('');

  constructor(private auth: AuthService, private url: AuthGuard, private router: Router) { }

  login(): void {
//    console.log(this.url.urlFrom?.split('?')[0])
    if (this.username.value != '' && this.password.value != '') {
      if (this.auth.logIn(this.username.value, this.password.value)) {
        this.router.navigate(
          [this.url.urlFrom?.split('?')[0]],
          { queryParams: { order: this.url.urlFrom?.split('=')[1] }}
        );
      }
      else
        alert("Wrong username or password");
    }
  }
}


