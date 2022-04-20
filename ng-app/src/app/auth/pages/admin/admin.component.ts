import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { urlValidatorRegex } from '../../components/validator/pattern-regex';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public createCardForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.createCardForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]],
      description: ['',[
        Validators.required,
        Validators.maxLength(255),
      ]],
      linkImage: ['', [
        Validators.required,
        Validators.pattern(urlValidatorRegex),
      ]],
      linkVideo: ['', [
        Validators.required,
        Validators.pattern(urlValidatorRegex),
      ]],
      creationDate: ['', [
        Validators.required,
        dateValidator(),
      ]],
    })
  }
  get title(){
    return this.createCardForm.get('title');
  }
  get description(){
    return this.createCardForm.get('description');
  }
  get linkImage(){
    return this.createCardForm.get('linkImage');
  }
  get linkVideo(){
    return this.createCardForm.get('linkVideo');
  }
  get creationDate(){
    return this.createCardForm.get('creationDate');
  }

  public submit() {
    console.log(this.createCardForm);
    alert('Card creation successfully completed!');
  }
}

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = new Date(control.value) >= new Date()
    return result ? {isDataFuture: true} : null;
  };
}
