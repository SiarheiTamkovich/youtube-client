import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, retry } from 'rxjs';
import { SearchItemModel, VideoInfo } from 'src/app/youtube/models/search-item.model';
import { SearchResponseModel } from 'src/app/youtube/models/search-response.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeHttpService {

  private readonly SEARCH_URL = 'search'; //'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=10&q=react';
  private readonly VIDEO_INFO_URL = 'videos'; // 'https://www.googleapis.com/youtube/v3/videos?&part=snippet,statistics';
  private readonly LIMIT = 1;

  constructor(private http: HttpClient ) { }

  public getVideo$(page: number = 0, searchCriteria?: string): Observable<any> {

    const params = new HttpParams()
      .set('type', 'video')
      .set('part', 'snippet')
      .set('maxResults', (this.LIMIT).toString())
      .set('q', 'rocky')
  //    .set('q', searchCriteria || '');
  //    .set('start', (page * this.LIMIT).toString())



  const result = this.http.get<SearchResponseModel>(this.SEARCH_URL, { params })
    .pipe(
      retry(4),
      map((data: SearchResponseModel) => {
        const response = data;
        response.items.map((item: SearchItemModel) => {
          this.getVideoInfoById(item.id.videoId).subscribe((info) => {
            item['statistics'] = info.statistics;
          });

        })
        return response
      }),
      catchError(error => {
        console.log('[ERROR]', error);
        return EMPTY;
      })
    )
//    result.subscribe((data) => console.log(data))
    return result;
  }

  public getVideoInfoById(id: string): Observable<VideoInfo> {
    return this.http
      .get(this.VIDEO_INFO_URL, {
        params: {
          id,
          part: 'snippet,statistics',
        },
      })
      .pipe(
        map((data: any) => {
          const response = data.items[0];
//          console.log(response);
          return response;
        })
      );
  }
}

