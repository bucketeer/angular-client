import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { SignupAnimations } from './signup.animations';
import { UsersService } from '../shared/services/users.service';
import { IUser } from '../shared/interfaces/user.interface';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss'],
  animations: SignupAnimations
})
export class SignupComponent implements OnInit, OnDestroy {
  _signupState: string = 'loading';
  _userState: string = 'loading';
  _users: IUser[] = [];
  _pageinateOptions: any = {};

  constructor(private _userService: UsersService, private _router:Router) { }

  ngOnInit() {
    setTimeout(() => {
      this._signupState = 'loaded';
    }, 800);
    // this._userService.signup()
    //   .subscribe((data) => {
    //     this._router.navigate(['home']);
    //     window.location.reload();
    //   });
  }
  ngOnDestroy() {
    this._signupState = 'destroyed';
  }
}