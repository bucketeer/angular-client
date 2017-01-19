import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import { SigninAnimations } from './signin.animations';
import { UsersService } from '../shared/services/users.service';
import { IUser } from '../shared/interfaces/user.interface';

@Component({
  selector: 'sign-in',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.scss'],
  animations: SigninAnimations
})
export class SigninComponent implements OnInit, OnDestroy {
  signinState: string = 'loading';
  isSigningIn: boolean = false;
  userForm: FormGroup;
  signinError: String;

  constructor(
    private _userService: UsersService,
    private router: Router,
    private _formBuilder: FormBuilder) {
    this.userForm = _formBuilder.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.signinState = 'loaded';
    }, 800);
  }

  ngOnDestroy() {
    this.signinState = 'destroyed';
  }

  submitForm(user: any): void {
    this.isSigningIn = true
    this._userService.signin(user)
      .subscribe((data) => {
        this.isSigningIn = false;
        if (!data.success) {
          this.signinError = data.errMsg;
          return;
        }
        this.userForm.reset();
        this.router.navigate(['home']);
        window.location.reload();
      },
      (err) => {
        this.isSigningIn = false;
        this.signinError = err;
      });
  }
}
