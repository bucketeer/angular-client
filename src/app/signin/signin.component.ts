import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { SigninAnimations } from './signin.animations';
import { UsersService } from '../shared/services/users.service';
import { IUser } from '../shared/interfaces/user.interface';

@Component({
  selector: 'signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.scss'],
  animations: SigninAnimations
})
export class SigninComponent implements OnInit, OnDestroy {
  _signinState: string = 'loading';
  _user = {};

  constructor(private _userService: UsersService, private _router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this._signinState = 'loaded';
    }, 800);
    this._userService.signin(this._user)
      .subscribe((data) => {
        this._user = data.user;
        this._router.navigate(['home']);
        window.location.reload();
      });
  }
  ngOnDestroy() {
    this._signinState = 'destroyed';
  }
}
