import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, pipe, Subject } from 'rxjs';
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
  public searchString$: Subject<string> = new Subject();

  ngOnInit(): void {}

  public displayFilters(): void {
    this.isFiltersON = !this.isFiltersON;
  }

  public getSearchParams(params: string): void {
    if (params.length < 3) return;
    this.searchString$
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
    )
    .subscribe(value => {
      this.router.navigate(['home/search'], {queryParams: {order: value}});
//      console.log(value);
    })
    this.searchString$.next(params)
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
function subscribe(arg0: (val: string) => void) {
  throw new Error('Function not implemented.');
}

