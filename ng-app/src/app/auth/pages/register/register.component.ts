import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.userForm = new FormGroup ({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('',  [Validators.required]),
      mail: new FormControl('', [
        Validators.required,
        Validators.email,
      ])
    });

  }

  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get mail() {
    return this.userForm.get('mail');
  }

  public submit() {
    console.log(this.userForm)
  }

}
