import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Output() btnClick : EventEmitter<boolean> = new EventEmitter();
  @Output() searchParams : EventEmitter<string> = new EventEmitter();
  
  public btnClickEmit(): void {
    this.btnClick.emit();
  }

  public inputValueEmit(value: string): void {
    this.searchParams.emit(value);
  }
}

