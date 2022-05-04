import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of, retry } from 'rxjs';
import { ResponseItemInfoModel, SearchItemModel } from 'src/app/youtube/models/search-item.model';
import { SearchResponseModel } from 'src/app/youtube/models/search-response.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeHttpService {

  private readonly SEARCH_URL = 'search'; //'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=10&q=react';
  private readonly VIDEO_INFO_URL = 'videos'; // 'https://www.googleapis.com/youtube/v3/videos?&part=snippet,statistics';
  private readonly LIMIT = 10;

  private isStatHave: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  public getVideo$(searchString: string | number | undefined): Observable<any> {

      const params = new HttpParams()
      .set('type', 'video')
      .set('part', 'snippet')
      .set('maxResults', (this.LIMIT).toString())
      .set('q', searchString || '')
  //    .set('start', (page * this.LIMIT).toString())

  const result = this.http.get<SearchResponseModel>(this.SEARCH_URL, { params })
    .pipe(
      retry(4),
      map((data: SearchResponseModel) => {
        const response = data;
        response.items.map((item: SearchItemModel) => {
          this.getVideoInfoById$(item.id.videoId).subscribe((info) => {
            item['statistics'] = info.statistics;
          });
        })
        return response
      }),
      catchError(error => {
        console.log('[ERROR]', error);
        return error;
      })
    )
    result.subscribe((data) => {
      if(!!(data as SearchResponseModel).items[0].statistics) {
        this.isStatHave = true;
      }
    })
    return result
  }

  public getVideoInfoById$(id: string): Observable<ResponseItemInfoModel> {
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
          //console.log(response);
          return response;
        })
      );
  }
}
