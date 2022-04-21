import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchItemModel } from '../../models/search-item.model';
import { SearchResponseModel } from '../../models/search-response.model';
import { YoutubeHttpService } from 'src/app/core/services/youtube-http.service';
import { YoutubeService } from '../../services/youtube.service';
import { Subscription } from 'rxjs';
import { SortModel } from '../../models/sort.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public videoResponse: SearchResponseModel;
  public videoItems: SearchItemModel[] = [];
  public sortParams: SortModel;
  private searchString: string;

  private dataSubscriptionFilm$: Subscription;

  constructor(
    private youtubeHttpService: YoutubeHttpService,
    public srv: YoutubeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public sortItems(): void {
    this.sortByField(this.sortParams.byDate);
    this.sortByViews(this.sortParams.byViews);
  }

  private sortByField(sortDirection: string): void {
    if (sortDirection === 'incr'){
      this.videoItems.sort((a, b) =>
        a.snippet.publishedAt < b.snippet.publishedAt ? 1 : -1
      );
    }
    if (sortDirection === 'decr') {
      this.videoItems.sort((a, b) =>
        a.snippet.publishedAt > b.snippet.publishedAt ? 1 : -1
      );
    }
  }
  private sortByViews(sortDirection: string): void {
    if (sortDirection === 'incr') {
      this.videoItems.sort((a, b) =>
        Number(a.statistics.viewCount) > Number(b.statistics.viewCount) ? 1 : -1
      );
    }
  if (sortDirection === 'decr') {
      this.videoItems.sort((a, b) =>
        Number(a.statistics.viewCount) < Number(b.statistics.viewCount) ? 1 : -1
      );
    }
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {

      this.searchString = params['order'];

      this.dataSubscriptionFilm$ = this.youtubeHttpService
          .getVideo$(this.searchString).subscribe((data: SearchResponseModel) => {
            this.videoResponse = data;
            this.videoItems = data.items;
            this.videoItems.map(item => {
              if (item.snippet.title.length > 60) {
                item.snippet.title = item.snippet.title.substring(0, 60) + '...';
              }
            });
            this.sortItems();
            //console.log(this.videoItems[0]);
        });
    })

    this.srv.sort$.subscribe((value: SortModel) => {
        this.sortParams = value;
        // console.log(value);
        this.sortItems();
    });
  }
  ngOnDestroy(): void {
    this.dataSubscriptionFilm$.unsubscribe();
    this.srv.sort$.unsubscribe();
  }

  public viewItem(id: string): void {
    this.router.navigate([`home/video/${id}`])
  }
}
