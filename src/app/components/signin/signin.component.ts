import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  message: string;
  constructor(
    private fb: FormBuilder,
    private as: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      userid: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]/), Validators.minLength(4), Validators.maxLength(10)]]
    });
  }

  signin() {
    console.log('[payload]', this.signinForm.value);
    this.as.signin(this.signinForm.value)
      .subscribe(
        () => this.router.navigate(['dashboard']),
        ({error}) => {
        console.log(error.message);
        this.message = error.message;
        });
  }

  get userid() {
    return this.signinForm.get('userid');
  }

  get password() {
    return this.signinForm.get('password');
  }

}
