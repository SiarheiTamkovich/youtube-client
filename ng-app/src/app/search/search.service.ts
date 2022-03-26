import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchItemModel } from './search-item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url: string = '../assets/response.json';

  constructor(private http: HttpClient) {
    this.getData();
  }

  getData(): Observable<SearchItemModel> {
    return this.http.get<SearchItemModel>(this.url);
    // const url = '../assets/response.json';
    // this.http.get(url).subscribe((res) => {
    //   this.data = res;
    //   console.log(this.data);
    // });
  }
}
