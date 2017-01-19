import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import { SignupAnimations } from './signup.animations';
import { UsersService } from '../shared/services/users.service';
import { IUser } from '../shared/interfaces/user.interface';

@Component({
  selector: 'sign-up',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss'],
  animations: SignupAnimations
})
export class SignupComponent implements OnInit, OnDestroy {
  signupState: string = 'loading';  
  isSigningUp: boolean = false;
  userForm: FormGroup;
  signupError: String;

  constructor(
    private _userService: UsersService,
    private router: Router,
    private _formBuilder: FormBuilder) {
    this.userForm = _formBuilder.group({
      'name': [null, Validators.required],
      'username': [null, Validators.required],
      'gender': ['male', Validators.required],
      'location': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
      'passwordConfirm': [null, Validators.required]            
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this.signupState = 'loaded';
    }, 800);
  }

  ngOnDestroy() {
    this.signupState = 'destroyed';
  }

  submitForm(formData: any): void {
    this.isSigningUp = true
    let user = this.mapFormData(formData);
    this._userService.signup(user)
      .subscribe((data) => {
        this.isSigningUp = false;
        if (!data.success) {
          this.signupError = data.errMsg;
          return;
        }
        this.userForm.reset();
        this.router.navigate(['home']);
        window.location.reload();
      },
      (err) => {
        this.isSigningUp = false;
        this.signupError = err;
      });
  }

  mapFormData(formData) {
    return {
      email: formData.email,
      password: formData.password,
      profile: {
        username: formData.username,
        name: formData.name,
        gender: formData.gender,
        location: formData.location
      }
    }
  }
}