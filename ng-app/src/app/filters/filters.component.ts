import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() public clickSortByDate: EventEmitter<boolean> = new EventEmitter;
  @Output() public clickSortByViews: EventEmitter<boolean> = new EventEmitter;
  @Output() public inputFilterByString: EventEmitter<string> = new EventEmitter;

  constructor() { }

  public clickSortByDateEmit(): void {
    this.clickSortByDate.emit();
  }

  public clickSortByViewsEmit(): void {
    this.clickSortByViews.emit();
  }

  public inputFilterByStringEmit(value: string): void {
    this.inputFilterByString.emit(value);
  }

  ngOnInit(): void {}
}
