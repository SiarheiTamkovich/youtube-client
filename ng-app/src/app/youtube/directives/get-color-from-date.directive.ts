import { Directive, ElementRef, Renderer2  } from '@angular/core';
import { DateFormat } from './date-format';

@Directive({
  selector: '[appGetColorFromDate]'
})
export class GetColorFromDateDirective {

  constructor(
    private elementRef: ElementRef,
    private render2: Renderer2,
    private dateFormat: DateFormat) {
// console.log(this.elementRef)
  }

  ngAfterViewInit() {

    const daysPass = this.dateFormat.countDayPassFromDate(
      this.elementRef.nativeElement.dataset.datePublish
    );
  
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


