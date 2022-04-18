import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.userForm = new FormGroup ({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'mail': new FormControl('', [Validators.required,Validators.email]),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-])[a-zA-Z0-9].{7,}$'
        ),
      ]),
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
  get password() {
    return this.userForm.get('password');
  }

  public submit() {
    console.log(this.userForm);
    alert('Registration successfully completed! Go to login page');
    this.router.navigate(['/home/auth/login']);
  }
}
