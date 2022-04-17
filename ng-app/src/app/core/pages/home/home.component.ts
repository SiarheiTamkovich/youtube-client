import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, pipe, Subject } from 'rxjs';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import { YoutubeHttpService } from '../../services/youtube-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private youtubeService: YoutubeService,
    private youtubeHttpService: YoutubeHttpService,
    ) {}

  public isFiltersON: boolean = false;
  public isSearchON: boolean = false;
  public inputValue: string;
  public searchString$: Subject<string> = new Subject();

  ngOnInit(): void {
    this.searchString$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    )
    .subscribe(value => {
      this.getSearchVideo(value);
    });
  }
  ngOnDestroy(): void {
    this.searchString$.unsubscribe();
  }

  public displayFilters(): void {
    this.isFiltersON = !this.isFiltersON;
  }

  public getSearchParams(params: string): void {
    if (params === '') this.router.navigate(['home/'])
    if (params.length < 3) return;
    this.searchString$.next(params);
  }

  public getSearchVideo(value: string){
    this.router.navigate(['home/search'], {queryParams: {order: value}});
  }

  public sendEventClickSortByData(): void {
    this.youtubeService.sort.byDate = 'no';
    this.youtubeService.sort.counterDate++;
    if (this.youtubeService.sort.counterDate === 1) this.youtubeService.sort.byDate = 'incr';
    if (this.youtubeService.sort.counterDate === 2) {
      this.youtubeService.sort.byDate = 'decr';
      this.youtubeService.sort.counterDate = 0
    };
    this.youtubeService.setDataSort$(this.youtubeService.sort);
  }

  public sendEventClickSortByViews(): void {
    this.youtubeService.sort.byDate = 'no';
    this.youtubeService.sort.counterViews++;
    if (this.youtubeService.sort.counterViews === 1) this.youtubeService.sort.byViews = 'incr';
    if (this.youtubeService.sort.counterViews === 2) {
      this.youtubeService.sort.byViews = 'decr';
      this.youtubeService.sort.counterViews = 0
    };
    this.youtubeService.setDataSort$(this.youtubeService.sort);
  }

  public sendInputFilterByString(value: string): void {
    this.youtubeService.sort.inputFilterValue = value;
  }
}

