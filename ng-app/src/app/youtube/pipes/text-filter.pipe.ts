import { Pipe, PipeTransform } from '@angular/core';
import { SearchItemModel } from '../models/search-item.model';
import { SortModel } from '../models/sort.model';

@Pipe({
  name: 'textFilter',
  pure: false,
})
export class TextFilterPipe implements PipeTransform {

  transform(items: SearchItemModel[], filter: SortModel): SearchItemModel[] {
    if (!filter.inputFilterValue) return items;

    return items.filter((item: SearchItemModel) =>
      item.snippet.title.toUpperCase()
        .indexOf(filter.inputFilterValue.toUpperCase()) !== -1)
  }
}
