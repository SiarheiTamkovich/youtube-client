import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchItemModel } from '../search-item.model';
import { SearchResponseModel } from '../search-response.model';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public videoResponse: SearchResponseModel;
  public videoItems: SearchItemModel[] = [];
  public sortByDate: boolean = true;

  private _dataSubscription: Subscription;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this._dataSubscription = this.searchService.getData$().subscribe((data: SearchResponseModel) => {
      this.videoResponse = data;
      this.videoItems = data.items;
      console.log(this.videoItems[0].snippet.publishedAt)
    });
  }

  ngOnDestroy(): void {
    this._dataSubscription.unsubscribe();
  }

}
