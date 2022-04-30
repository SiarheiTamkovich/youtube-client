import { SortDirections } from "src/app/shared/constants/setting";

export interface SortModel {
  byDate: string,
  byViews: string,
  counterDate: number,
  counterViews: number,
  inputFilterValue: string,
}
