import { Component, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Output() btnClick : EventEmitter<boolean> = new EventEmitter();
  @Output() searchParams : EventEmitter<string> = new EventEmitter();

  constructor (private router: Router,  private authService: AuthService) {}

  public btnClickEmit(): void {
    this.btnClick.emit();
  }

  public inputValueEmit(value: string): void {
    this.searchParams.emit(value);
  }

  public toggleLogIn() {
    this.router.navigate(['/home/auth/login'])
  }

  public toggleLogOut() {
    this.authService.logOut();
  }

}

