import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface intDataFilms {
    kind: String;
    etag: String;
    pageInfo: {
      totalResults: Number;
      resultsPerPage: Number;
    }
    items: [{
      kind: String;
      etag: String;
    }]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: String = 'ng-app';
  data: object = {};

  constructor(private http: HttpClient) {}

  getData() {
    const url = '../assets/response.json';
    this.http.get(url).subscribe((res) => {
      this.data = res;
      console.log(this.data);
    });
  }

  ngOnInit() {
    this.getData();
  }
}
