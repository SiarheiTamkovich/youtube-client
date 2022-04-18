import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public createCardForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.createCardForm = this.formBuilder.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(20),
      ]],
      description: [''],
      img: [''],
      linkVideo: [''],
      creationDate: [''],
    })
  }
  get title(){
    return this.createCardForm.get('title')
  }

  getTitle(){
    console.log((this.title?.errors))
  }

  public submit() {
  //  console.log(this.createCardForm);
  //  alert('Card creation successfully completed!');
  }
}
