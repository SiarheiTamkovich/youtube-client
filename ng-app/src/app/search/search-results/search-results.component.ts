import { Component, OnInit } from '@angular/core';
import { SearchItemModel } from '../search-item.model';
import { SearchResponseModel } from '../search-response.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {

  public videoResponse: SearchResponseModel;
  public videoItems: SearchItemModel[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.getData().subscribe((data: SearchResponseModel) => {
      this.videoResponse = data;
      this.videoItems = data.items;
      console.log(this.videoItems[0].snippet)
    });
  }
}
