import { SearchItemModel } from './search-item.model';

export interface SearchResponseModel {
  etag: string,
  kind: string,
  items: SearchItemModel[],
  nextPageToken: string,
  pageInfo: {
    resultsPerPage: number,
    totalResults: number,
  }
  regionCode: string,
}
