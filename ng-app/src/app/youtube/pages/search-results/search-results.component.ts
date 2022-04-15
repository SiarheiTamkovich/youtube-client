import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchItemModel } from '../../models/search-item.model';
import { SearchResponseModel } from '../../models/search-response.model';
import { YoutubeHttpService } from 'src/app/core/services/youtube-http.service';
import { SearchService } from '../../../core/services/search.service';
import { YoutubeService } from '../../services/youtube.service';
import { Subscription } from 'rxjs';
import { SortModel } from '../../models/sort.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public videoResponse: SearchResponseModel;
  public videoItems: SearchItemModel[] = [];
  public sortNew: SortModel;

  private dataSubscriptionFilm$: Subscription;
  private dataSubscriptionSort$: Subscription;

  constructor(
    private searchService: SearchService,
    private youtubeHttpService: YoutubeHttpService,
    public srv: YoutubeService,
    private router: Router,
  ) {}

  public sortItems() {

  if (this.sortNew.byDate === 'incr') {
    this.videoItems.sort(
      (a, b) => new Date(b.snippet.publishedAt).getTime() -
      new Date(a.snippet.publishedAt).getTime()
    );
  }

  if (this.sortNew.byDate === 'decr') {
    this.videoItems.sort(
      (a, b) => new Date(a.snippet.publishedAt).getTime() -
      new Date(b.snippet.publishedAt).getTime()
    );
  }

  if (this.sortNew.byViews === 'incr') {
      this.videoItems.sort(
        (a, b) => Number(a.statistics.viewCount) -
        Number(b.statistics.viewCount)
      );
    }

  if (this.sortNew.byViews === 'decr') {
      this.videoItems.sort(
        (a, b) => Number(b.statistics.viewCount) -
        Number(a.statistics.viewCount)
      );
    }
  }

  ngOnInit(): void {
    //
    // this.dataSubscriptionFilm$ = this.searchService.getData$().subscribe((data: SearchResponseModel) => {
    //   this.videoResponse = data;
    //   this.videoItems = data.items;
    //   this.sortItems();
    //   console.log(this.videoItems);
    // });

    this.dataSubscriptionFilm$ = this.youtubeHttpService.getVideo$().subscribe((data: SearchResponseModel) => {
      this.videoResponse = data;
      this.videoItems = data.items;
      this.sortItems();
//      console.log(this.videoItems[0]);
    });

    this.dataSubscriptionSort$ = this.srv.getDataSort$().subscribe((dataSort: SortModel) => {
      this.sortNew = dataSort;
    });
  }

  ngDoCheck(){
    this.sortItems();
//    console.log(this.sortNew);
  }

  ngOnDestroy(): void {
    this.dataSubscriptionFilm$.unsubscribe();
    this.dataSubscriptionSort$.unsubscribe();
  }

  public viewItem(id: string): void {
    this.router.navigate([`home/video/${id}`])
  }

}
