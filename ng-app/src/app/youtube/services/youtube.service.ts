import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SortModel } from '../models/sort.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  public sort: SortModel = {
    byDate: 'no',
    byViews: 'no',
    counterDate: 0,
    counterViews: 0,
    inputFilterValue: '',
  }

  constructor() { }

  public getDataSort$(): Observable <SortModel>{
//    console.log(this.sortNew)
    return of(this.sort);
  }

  public setDataSort$(sort: SortModel): void {
  //  console.log(this.sortNew)
    this.sort = sort;
  }
}
