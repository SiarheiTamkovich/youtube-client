import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { SortDirections } from 'src/app/shared/constants/setting';
import { SearchResponseModel } from 'src/app/youtube/models/search-response.model';
import { SortModel } from 'src/app/youtube/models/sort.model';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import { YoutubeHttpService } from '../../services/youtube-http.service';

import * as VideoAction from '../../store/actions/youtube.actions';
import { selectError, selectVideo, VideoState } from '../../store/reducers/youtube.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public selectError$: Observable<Error | null> =  this.store.pipe(select(selectError));

  constructor(
    private router: Router,
    private youtubeService: YoutubeService,
    private youtubeHttpService: YoutubeHttpService,
    private store: Store<VideoState>,
    ) {}

  public isFiltersON: boolean = false;
  public isSearchON: boolean = false;
  public inputValue: string;
  public searchString$: Subject<string> = new Subject();
  public sortParams: SortModel;

  ngOnInit(): void {
  
    this.store.dispatch(VideoAction.FetchVideo());
//    this.selectError$.subscribe(error => console.log(error))

    this.searchString$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    )
    .subscribe(value => {
      this.getSearchVideo(value);
    });

    this.youtubeService.sort$.subscribe(value => {
      this.sortParams = value;
  //    console.log(value)
    })

    this.router.navigate(['home/start']);
  }
  ngOnDestroy(): void {
    this.searchString$.unsubscribe();
    this.youtubeService.sort$.unsubscribe();
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
    this.sortParams.byViews = SortDirections.No;
    this.sortParams.counterDate++;
    if (this.sortParams.counterDate === 1) this.sortParams.byDate = SortDirections.Increase;
    if (this.sortParams.counterDate === 2) {
      this.sortParams.byDate = SortDirections.Decrease;
      this.sortParams.counterDate = 0
    };
    this.youtubeService.sort$.next(this.sortParams);
  }

  public sendEventClickSortByViews(): void {
    this.sortParams.byDate = SortDirections.No;
    this.sortParams.counterViews++;
    if (this.sortParams.counterViews === 1) this.sortParams.byViews = SortDirections.Increase;

    if (this.sortParams.counterViews === 2) {
      this.sortParams.byViews = SortDirections.Decrease;
      this.sortParams.counterViews = 0
    };
    this.youtubeService.sort$.next(this.sortParams);
  }

  public sendInputFilterByString(value: string): void {
    this.sortParams.inputFilterValue = value;
  }
}

