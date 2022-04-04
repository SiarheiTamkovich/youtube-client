import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SearchItemModel } from '../../models/search-item.model';
import { SearchResponseModel } from '../../models/search-response.model';
import { SearchService } from '../../../core/services/search.service';
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

  @Input() sort: SortModel;

  private _dataSubscription: Subscription;

  constructor(private searchService: SearchService) {}

  public sortItems() {
    if (this.sort.byDate === 'incr') {
      this.videoItems.sort(
        (a, b) => new Date(b.snippet.publishedAt).getTime() -
        new Date(a.snippet.publishedAt).getTime()
      );
    }

    if (this.sort.byDate === 'decr') {
      this.videoItems.sort(
        (a, b) => new Date(a.snippet.publishedAt).getTime() -
        new Date(b.snippet.publishedAt).getTime()
      );
    }

    if (this.sort.byViews === 'incr') {
      this.videoItems.sort(
        (a, b) => Number(a.statistics.viewCount) -
        Number(b.statistics.viewCount)
      );
    }

    if (this.sort.byViews === 'decr') {
      this.videoItems.sort(
        (a, b) => Number(b.statistics.viewCount) -
        Number(a.statistics.viewCount)
      );
    }
  }

  ngOnInit(): void {
    this._dataSubscription = this.searchService.getData$().subscribe((data: SearchResponseModel) => {
      this.videoResponse = data;
      this.videoItems = data.items;
      this.sortItems();
      console.log(this.videoItems);
    });
  }

  ngOnDestroy(): void {
    this._dataSubscription.unsubscribe();
  }

}
