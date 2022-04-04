import { Directive, ElementRef, Renderer2  } from '@angular/core';

@Directive({
  selector: '[appGetColorFromDate]'
})
export class GetColorFromDateDirective {

  private currentDate = new Date;
  private countDays: number = Math.round(Number(this.currentDate) / 1000 / 3600 / 24);

  constructor(private elementRef: ElementRef, private render2: Renderer2) {
// console.log(this.elementRef)
// console.log(this.countDays)
  }
  
  ngAfterViewInit() {
    const dateCreate = new Date(this.elementRef.nativeElement.dataset.datePublish);
    const countDayFromDateCreate = Math.round(dateCreate.getTime() / 1000 / 3600 /24);
    const daysPass = this.countDays - countDayFromDateCreate;

    const setColor = (color:string) =>
      this.render2.setStyle(
        this.elementRef.nativeElement, 'border-bottom', `solid 8px ${color}`
      );

    if (daysPass <= 7) setColor('#2F80ED');
    if (daysPass > 7 && daysPass <= 30) setColor('#27AE60');
    if (daysPass > 30 && daysPass <= 180) setColor('#F2C94C');
    if (daysPass > 180) setColor('#EB5757');
  }
}


