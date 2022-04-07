import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SearchItemModel } from '../../models/search-item.model';
import { SearchResponseModel } from '../../models/search-response.model';
import { SearchService } from '../../../core/services/search.service';
import { YoutubeService } from '../../services/youtube.service';
import { Subscription } from 'rxjs';
import { SortModel } from '../../models/sort.model';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public videoResponse: SearchResponseModel;
  public videoItems: SearchItemModel[] = [];
  public sortNew: SortModel;

  @Input() sort: SortModel;

  private _dataSubscriptionFilm: Subscription;
  private _dataSubscriptionSort: Subscription;

  constructor(private searchService: SearchService, public srv: YoutubeService) {}

  public sortItems() {
//    if (this.sort.byDate === 'incr') {
  if (this.srv.sortNew.byDate === 'incr') {
      this.videoItems.sort(
        (a, b) => new Date(b.snippet.publishedAt).getTime() -
        new Date(a.snippet.publishedAt).getTime()
      );
    }

  //  if (this.sort.byDate === 'decr') {
    if (this.srv.sortNew.byDate === 'decr') {
      this.videoItems.sort(
        (a, b) => new Date(a.snippet.publishedAt).getTime() -
        new Date(b.snippet.publishedAt).getTime()
      );
    }

//    if (this.sort.byViews === 'incr') {
  if (this.srv.sortNew.byViews === 'incr') {
      this.videoItems.sort(
        (a, b) => Number(a.statistics.viewCount) -
        Number(b.statistics.viewCount)
      );
    }

//    if (this.sort.byViews === 'decr') {
  if (this.srv.sortNew.byViews === 'decr') {
      this.videoItems.sort(
        (a, b) => Number(b.statistics.viewCount) -
        Number(a.statistics.viewCount)
      );
    }
  }

  ngOnInit(): void {
    this._dataSubscriptionFilm = this.searchService.getData$().subscribe((data: SearchResponseModel) => {
      this.videoResponse = data;
      this.videoItems = data.items;
      this.sortItems();
      console.log(this.videoItems);
    });
    this._dataSubscriptionSort = this.srv.getDataSort$().subscribe((dataSort: SortModel) => {
      this.sortNew = dataSort;
    });
  }

  ngOnDestroy(): void {
    this._dataSubscriptionFilm.unsubscribe();
  }

}
