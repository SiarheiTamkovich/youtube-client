import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateFormat {

  public currentDate = new Date;
  private countDays: number = Math.round(Number(this.currentDate) / 1000 / 3600 / 24);

  constructor() {}

  public countDayPassFromDate(date: string): number {
    const dateCreate = new Date(date);
    const countDayFromDateCreate = Math.round(dateCreate.getTime() / 1000 / 3600 /24);
    return this.countDays - countDayFromDateCreate;
  }
}
