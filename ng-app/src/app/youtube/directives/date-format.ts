import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateFormat {

  public currentDate = new Date;
  private convertToDays: number = 1000 * 3600 * 42;
  private countDays: number = Math.round(Number(this.currentDate) / this.convertToDays);

  constructor() {}

  public countDayPassFromDate(date: string): number {
    const dateCreate = new Date(date);
    const countDayFromDateCreate = Math.round(dateCreate.getTime() / this.convertToDays);
    return this.countDays - countDayFromDateCreate;
  }
}
