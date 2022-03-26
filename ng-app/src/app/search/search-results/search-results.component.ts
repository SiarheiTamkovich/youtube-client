import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-results',
  template: `
    <p>search-results works!</p>
    <app-search-item></app-search-item>
    <!-- <button (click)="getData()">search</button> -->
  `,
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {

  public videoData = {};

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.getData().subscribe();
  }

}
