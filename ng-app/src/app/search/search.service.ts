import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResponseModel } from './search-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url: string = '../assets/response.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<SearchResponseModel> {
    return this.http.get<SearchResponseModel>(this.url);
  }
}
