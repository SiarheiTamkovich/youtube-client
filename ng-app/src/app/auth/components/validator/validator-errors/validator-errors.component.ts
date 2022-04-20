import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validator-errors',
  templateUrl: './validator-errors.component.html',
  styleUrls: ['./validator-errors.component.scss']
})
export class ValidatorErrorsComponent {

  @Input() message: string;

  constructor() { }

}
