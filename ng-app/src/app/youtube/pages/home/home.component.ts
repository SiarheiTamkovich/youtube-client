import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { SortModel } from '../../models/sort.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {}
  
  @ViewChild(SearchResultsComponent) child: SearchResultsComponent;

  public isFiltersON: boolean = false;
  public isSearchON: boolean = false;
  public inputValue: string;

  public sort: SortModel = {
    byDate: 'no',
    byViews: 'no',
    counterDate: 0,
    counterViews: 0,
    inputFilterValue: '',
  }

  ngOnInit(): void {}

  public displayFilters(): void {
    this.isFiltersON = !this.isFiltersON;
  }

  public getSearchParams(params: string): void {
    if (params != '') {
      this.isSearchON = true;
  //    console.log(params);
    }
  }

  public sendEventClickSortByData() {
    this.sort.byViews = 'no;'
    this.sort.counterDate++;
    if (this.sort.counterDate === 1) this.sort.byDate = 'incr';
    if (this.sort.counterDate === 2) {this.sort.byDate = 'decr'; this.sort.counterDate = 0}
    this.child.ngOnInit()
  }

  public sendEventClickSortByViews() {
    this.sort.byDate = 'no';
    this.sort.counterViews++;
    if (this.sort.counterViews === 1) this.sort.byViews = 'incr';
    if (this.sort.counterViews === 2) {this.sort.byViews = 'decr'; this.sort.counterViews = 0}
    this.child.ngOnInit()
  }

  public sendInputFilterByString(value: string) {
    this.sort.inputFilterValue = value;
  }

}
