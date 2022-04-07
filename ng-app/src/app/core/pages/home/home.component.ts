import { Component, OnInit } from '@angular/core';
import { SortModel } from '../../../youtube/models/sort.model';
import { ActivatedRoute, Router } from '@angular/router';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
//import 'rxjs/add/operator/filter';
//import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

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
    if (params != '') {
      this.isSearchON = true;
      this.router.navigate(['home/search'], {queryParams: {order: params}});
     // console.log(params);
    }
  }

  public sendEventClickSortByData() {
    this.srv.sort.byDate = 'no';
    this.srv.sort.counterDate++;
    if (this.srv.sort.counterDate === 1) this.srv.sort.byDate = 'incr';
    if (this.srv.sort.counterDate === 2) {this.srv.sort.byDate = 'decr'; this.srv.sort.counterDate = 0};
    this.srv.setDataSort$(this.srv.sort);
  }

  public sendEventClickSortByViews() {
    this.srv.sort.byDate = 'no';
    this.srv.sort.counterViews++;
    if (this.srv.sort.counterViews === 1) this.srv.sort.byViews = 'incr';
    if (this.srv.sort.counterViews === 2) {this.srv.sort.byViews = 'decr'; this.srv.sort.counterViews = 0};
    this.srv.setDataSort$(this.srv.sort);
  }

  public sendInputFilterByString(value: string) {
    this.srv.sort.inputFilterValue = value;
  }

}
