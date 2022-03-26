import { searchItemModel } from "./search-item.model";

export interface searchResponseModel {
  kind: String;
  etag: String;
  pageInfo: {
    totalResults: Number;
    resultsPerPage: Number;
  }
  items: searchItemModel[];
}
