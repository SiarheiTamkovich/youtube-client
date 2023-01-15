import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value = 50;
  
  constructor() { }
}
