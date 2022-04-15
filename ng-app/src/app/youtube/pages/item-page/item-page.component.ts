import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/services/search.service';
import { SearchItemModel } from '../../models/search-item.model';
import { SearchResponseModel } from '../../models/search-response.model';
import { Location } from '@angular/common';

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
    private searchService: SearchService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['id'];

    this.dataSubscriptionFilm$ = this.searchService.getData$().subscribe((data: SearchResponseModel) => {
      data.items.map(item => {
        if (item.id.videoId === this.itemId) this.video = item;
      });
      this.spinner = false;
//      console.log(this.video)
    });
  }

  ngOnDestroy(): void {
    this.dataSubscriptionFilm$.unsubscribe();
  }

  public goBack(): void {
    this.location.back();
  }
}
