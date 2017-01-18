import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarAnimations } from './navbar.animations';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  animations: NavbarAnimations
})
export class NavbarComponent implements OnInit {
  _navState: string = 'loading';
  _showNavBg: boolean = true;
  _currentUser:any = {};
  constructor(private _userService: UsersService, private _router:Router) { }

  ngOnInit() {
    setTimeout(() => {
      this._navState = 'loaded';
    }, 500);
    this._currentUser = this._userService._currentUser;
  }

  signout() {
    this._userService.signout()
      .subscribe((data) => {
        this._router.navigate(['home']);
        window.location.reload();
      });
  }
}