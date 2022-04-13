import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, retry } from 'rxjs';
import { SearchResponseModel } from 'src/app/youtube/models/search-response.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeHttpService {

  private readonly SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=20&q=angular';
//  private readonly VIDEO_INFO_URL = '';
  private readonly API_KEY = `AIzaSyD1yEKcZkeeEIYVD59ks8Cj1pFa8oaW6sE`;
  private readonly LIMIT = 20;

  constructor(private http: HttpClient) { }

  public getVideo$(page: number = 0, searchCriteria?: string): Observable<SearchResponseModel> {

    const params = new HttpParams()
      .set('key', this.API_KEY)
  //    .set('start', (page * this.LIMIT).toString())
  //    .set('count', (this.LIMIT).toString())
  //   .set('textFragment', searchCriteria || '');

  return this.http.get<SearchResponseModel>(this.SEARCH_URL, { params })
    .pipe(
      retry(4),
      map((data: SearchResponseModel) => data),
      catchError(error => {
        console.log('[ERROR]', error);
        return EMPTY;
      })
    )
  }
}
