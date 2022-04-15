import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchItemModel } from '../../models/search-item.model';
import { SearchResponseModel } from '../../models/search-response.model';
import { Location } from '@angular/common';
import { YoutubeHttpService } from 'src/app/core/services/youtube-http.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {

  public itemId: string;
  public video: SearchItemModel;
  private dataSubscriptionFilm$: Subscription;
  public spinner: boolean = true;

  constructor(
    public route: ActivatedRoute,
    private youtubeHttpService: YoutubeHttpService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['id'];

    // this.dataSubscriptionFilm$ = this.youtubeHttpService.getVideo$().subscribe((data: SearchResponseModel) => {
    //   this.videoResponse = data;
    //   this.videoItems = data.items;
    //   this.sortItems();
//      console.log(this.videoItems[0]);
    // });

    this.dataSubscriptionFilm$ = this.youtubeHttpService.getVideo$().subscribe((data: SearchResponseModel) => {
      data.items.map(item => {
        if (item.id.videoId === this.itemId) this.video = item;
      });
      this.spinner = false;
      console.log(this.video)
    });
  }

  ngOnDestroy(): void {
    this.dataSubscriptionFilm$.unsubscribe();
  }

  public goBack(): void {
    this.location.back();
  }
}
