import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private srv: YoutubeService,
    ) {}

  public isFiltersON: boolean = false;
  public isSearchON: boolean = false;
  public inputValue: string;

  ngOnInit(): void {}

  public displayFilters(): void {
    this.isFiltersON = !this.isFiltersON;
  }

  public getSearchParams(params: string): void {
    if (params === '') return;
    this.router.navigate(['home/search'], {queryParams: {order: params}});
    // console.log(params);
  }

  public sendEventClickSortByData(): void {
    this.srv.sort.byDate = 'no';
    this.srv.sort.counterDate++;
    if (this.srv.sort.counterDate === 1) this.srv.sort.byDate = 'incr';
    if (this.srv.sort.counterDate === 2) {
      this.srv.sort.byDate = 'decr';
      this.srv.sort.counterDate = 0
    };
    this.srv.setDataSort$(this.srv.sort);
  }

  public sendEventClickSortByViews(): void {
    this.srv.sort.byDate = 'no';
    this.srv.sort.counterViews++;
    if (this.srv.sort.counterViews === 1) this.srv.sort.byViews = 'incr';
    if (this.srv.sort.counterViews === 2) {this.srv.sort.byViews = 'decr'; this.srv.sort.counterViews = 0};
    this.srv.setDataSort$(this.srv.sort);
  }

  public sendInputFilterByString(value: string): void {
    this.srv.sort.inputFilterValue = value;
  }

}
