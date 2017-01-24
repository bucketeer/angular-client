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
  signupErrors = [];

  constructor(
    private _usersService: UsersService,
    private router: Router,
    private _formBuilder: FormBuilder) {
    this.userForm = _formBuilder.group({
      'name': [null, Validators.required],
      'username': [null, Validators.required],
      'gender': [null, Validators.required],
      'location': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
      'passwordConfirm': [null, Validators.required],
      'profileImg': [null]
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
    this._usersService.signup(user)
      .subscribe((data) => {
        this.isSigningUp = false;
        if (!data.success) {
          if (data.isValidationError) {
            let errors = JSON.parse(data.msg);
            let errorKeys = Object.keys(errors);
            for (let i = 0; i < errorKeys.length; i++) {
              let field = errorKeys[i].split('.')[0];
              this.signupErrors.push(`${field.charAt(0).toUpperCase()}${field.slice(1)}: ${errors[errorKeys[i]].message}`);
            }
          } else {
            this.signupErrors.push(data.errMsg);
          }
          return;
        }
        this.userForm.reset();
        this.router.navigate(['home']);
        window.location.reload();
      },
      (err) => {
        this.isSigningUp = false;
        this.signupErrors = [err];
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