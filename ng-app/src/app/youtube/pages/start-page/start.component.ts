import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectVideo } from '../../../core/store/reducers/youtube.reducer';
import { SearchResponseModel } from '../../models/search-response.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  constructor(private store: Store, private router: Router) { }

  public selectVideos$: Observable<SearchResponseModel | null> = this.store.pipe(select(selectVideo));

  public viewItem(id: string): void {
    this.router.navigate([`home/video/${id}`])
  }
}
