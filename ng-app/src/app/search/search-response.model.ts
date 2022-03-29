import { SearchItemModel } from "./search-item.model";

export interface SearchResponseModel {
  kind: string,
  etag: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  }
  items: SearchItemModel[],
}
