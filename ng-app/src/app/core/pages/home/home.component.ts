import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchResultsComponent } from '../../../youtube/components/search-results/search-results.component';
import { SortModel } from '../../../youtube/models/sort.model';
import { Router } from '@angular/router';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private srv: YoutubeService ) {}

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

  ngOnInit(): void {

  }

  public displayFilters(): void {
    this.isFiltersON = !this.isFiltersON;
  }

  public getSearchParams(params: string): void {
    if (params != '') {
      this.isSearchON = true;
      this.router.navigate(['home/search'], {queryParams: {order: params}});
     // console.log(params);
    }
  }

  public sendEventClickSortByData() {
    this.srv.sortNew.byDate = 'no';
    this.srv.sortNew.counterDate++;
    if (this.srv.sortNew.counterDate === 1) this.srv.sortNew.byDate = 'incr';
    if (this.srv.sortNew.counterDate === 2) {this.srv.sortNew.byDate = 'decr'; this.srv.sortNew.counterDate = 0};
   // this.child.ngOnInit()
    this.srv.setDataSort$(this.srv.sortNew);


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
