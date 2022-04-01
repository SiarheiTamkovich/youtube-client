import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title: string = 'ng-app';

  public isFiltersON: boolean = false;
  public isSearchON: boolean = false;
  public inputValue: string;

  ngOnInit(): void {

  }

  public displayFilters(): void {
    this.isFiltersON = !this.isFiltersON;
  }

  public getSearchParams(params: string): void {
    if (params != '') {
      this.isSearchON = true;
  //    console.log(params);
    }
  }
}





