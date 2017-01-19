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
  navState: string = 'loading';
  showNavBg: boolean = true;
  currentUser: any = {};

  constructor(private _userService: UsersService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.navState = 'loaded';
    }, 500);
    this.currentUser = this._userService.currentUser;
  }

  signout() {
    this._userService.signout()
      .subscribe((data) => {
        this.router.navigate(['home']);
        window.location.reload();
      });
  }
}