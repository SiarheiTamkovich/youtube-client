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
    this.sortByField(this.sortParams.byDate, 'snippet', 'publishTime');
    this.sortByField(this.sortParams.byViews, 'statistics', 'viewCount');
  }

  private sortByField(sortDirection: string, category: string, field: string): void{
    if (sortDirection === 'incr') {
      this.videoItems.sort((a: any, b: any) =>
        Number(a[category][field]) < Number((b[category])[field]) ? 1 : -1
      );
    }
    if (sortDirection === 'decr') {
      this.videoItems.sort((a: any, b: any) =>
        Number(a[category][field]) > Number(b[category][field]) ? 1 : -1
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
                item.snippet.title = item.snippet.title.substring(0, 60) + '...'
              }
              item.snippet.publishTime = String(new Date(item.snippet.publishTime).getTime());
            });
            this.sortItems();
        });
    })

    this.srv.sort$.subscribe((value: SortModel) => {
      this.sortParams = value;
      this.sortItems();
      //console.log(value);
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

