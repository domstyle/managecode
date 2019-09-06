import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private as: AuthService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async register(userid, password) {
    await this.as.signup(userid, password);
    this.router.navigate(['signin']);
  }

  ngOnInit() {
  }

}
