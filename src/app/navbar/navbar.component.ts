import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarAnimations } from './navbar.animations';
import { UsersService } from '../shared/services/users.service';
import { GoalsService } from '../shared/services/goals.service';

@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  animations: NavbarAnimations
})
export class NavbarComponent implements OnInit {
  navState: string = 'loading';
  searchResultState: string = 'empty';
  showNavBg: boolean = true;
  currentUser: any = {};
  searchSelected: boolean = false;
  searchResults: any = [];
  queryString: string = '';

  constructor(
    private _usersService: UsersService,
    private _goalsService: GoalsService,
    private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.navState = 'loaded';
    }, 500);
    this.currentUser = this._usersService.currentUser;
  }

  signout() {
    this._usersService.signout()
      .subscribe((data) => {
        this.router.navigate(['home']);
        window.location.reload();
      });
  }

  search() {
    if (!this.queryString || (this.queryString && this.queryString.length < 3)) {
      this.searchResultState = 'empty';
      return;
    }
    setTimeout(() => {
      if (this.queryString) {
        this._goalsService.searchGoals(this.queryString)
          .subscribe((data) => {
            this.searchResults = data.goals;
            if (this.searchResults.length > 0) {
              this.searchResultState = 'results';
            } else {
              this.searchResultState = 'empty';
            }
          });
      }
    }, 1000);
  }

  selectGoal(goal) {
    localStorage.setItem("b_goal", JSON.stringify(goal));
    this.router.navigate(['goal']);
  }

  handleShowSearch() {
    this.searchSelected = !this.searchSelected;
    if (this.searchSelected) {
      this.searchResults = [];
      this.queryString = '';
    }

  }
}