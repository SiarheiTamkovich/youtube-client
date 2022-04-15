import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResponseModel } from '../../youtube/models/search-response.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

//  private url: string = '../../../assets/search-new.json';
  private url: string = '../../../assets/response.json';

  constructor(private http: HttpClient) {}

  public getData$(): Observable<SearchResponseModel> {
    return this.http.get<SearchResponseModel>(this.url).pipe(
      map((data: SearchResponseModel) => data),
    );
  }
}
