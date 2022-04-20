import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponseItemInfoModel, SearchItemModel } from '../../models/search-item.model';
import { Location } from '@angular/common';
import { YoutubeHttpService } from 'src/app/core/services/youtube-http.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {

  public itemId: string;
  public video: ResponseItemInfoModel;
  private dataSubscriptionFilm$: Subscription;
  public spinner: boolean = true;

  constructor(
    public route: ActivatedRoute,
    private youtubeHttpService: YoutubeHttpService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['id'];

    this.dataSubscriptionFilm$ = this.youtubeHttpService
      .getVideoInfoById$( this.itemId).subscribe((data: ResponseItemInfoModel) => {
        this.video = data;
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
