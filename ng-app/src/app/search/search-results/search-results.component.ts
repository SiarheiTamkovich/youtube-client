import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  data: object = {};

  constructor(private http: HttpClient) {}

  getData() {
    const url = '../assets/response.json';
    this.http.get(url).subscribe((res) => {
      this.data = res;
      console.log(this.data);
    });
  }

  ngOnInit(): void {
    this.getData();
  }

}
