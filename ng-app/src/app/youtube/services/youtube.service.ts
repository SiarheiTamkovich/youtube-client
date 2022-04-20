import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortModel } from '../models/sort.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  public sort$: BehaviorSubject<SortModel> = new BehaviorSubject({
    byDate: 'no',
    byViews: 'no',
    counterDate: 0,
    counterViews: 0,
    inputFilterValue: '',
  });

  constructor() { }

}
