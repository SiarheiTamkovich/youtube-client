import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, EMPTY, map, Observable, retry } from 'rxjs';
import { SearchItemModel, VideoInfo } from 'src/app/youtube/models/search-item.model';
import { SearchResponseModel } from 'src/app/youtube/models/search-response.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeHttpService {

  private readonly SEARCH_URL = 'search'; //'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=10&q=react';
  private readonly VIDEO_INFO_URL = 'videos'; // 'https://www.googleapis.com/youtube/v3/videos?&part=snippet,statistics';
  private readonly LIMIT = 20;
  private searchString: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  public getSearchParams(){
    this.route.queryParams.subscribe((params) => {
      this.searchString = params['order'];
      console.log(this.searchString);
      return this.searchString;
    })
  }

//   .subscribe(value => {
//     this.router.navigate(['home/search'], {queryParams: {order: value}});
// //      console.log(value);
//   })

  public getVideo$(): Observable<any> {

    const searchString = this.getSearchParams();
    
      const params = new HttpParams()
      .set('type', 'video')
      .set('part', 'snippet')
      .set('maxResults', (this.LIMIT).toString())
      .set('q', this.searchString )
  //    .set('start', (page * this.LIMIT).toString())

  console.log(this.searchString)

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




