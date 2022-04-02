import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { SortModel } from './search/sort.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title: string = 'ng-app';

  @ViewChild(SearchResultsComponent) child: SearchResultsComponent;

  public isFiltersON: boolean = false;
  public isSearchON: boolean = false;
  public inputValue: string;

  public sort: SortModel = {
    byDate: 'no',
    byViews: 'no',
    counter: 0
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
    this.sort.counter++;
    if (this.sort.counter === 1) this.sort.byDate = 'incr';
    if (this.sort.counter === 2) this.sort.byDate = 'decr';
    if (this.sort.counter === 3) {this.sort.byDate = 'no'; this.sort.counter = 0}
    this.child.ngOnInit()
  }
}





