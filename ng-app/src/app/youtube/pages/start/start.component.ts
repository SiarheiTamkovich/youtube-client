import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectVideo, VideoState } from '../../../core/store/reducers/youtube.reducer';
import { SearchResponseModel } from '../../models/search-response.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public getVideo$: Observable<SearchResponseModel | null> =  this.store.pipe(select(selectVideo));

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

}
