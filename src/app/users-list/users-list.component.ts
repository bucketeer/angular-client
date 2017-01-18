import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { UsersListAnimations } from './users-list.animations';
import { UsersService } from '../shared/services/users.service';
import { IUser } from '../shared/interfaces/user.interface';

@Component({
  selector: 'users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss'],
  animations: UsersListAnimations
})
export class UsersListComponent implements OnInit, OnDestroy {
  _usersListState: string = 'loading';
  _userState: string = 'loading';
  _users: IUser[] = [];
  _pageinateOptions: any = {};

  constructor(private _userService: UsersService) { }

  ngOnInit() {
    setTimeout(() => {
      this._usersListState = 'loaded';
    }, 800);
    this._userService.getUsers()
      .subscribe((data) => {
        this._users = data.users;
        this._pageinateOptions = {
          totalResults: data.totalResults,
          pageSize: data.pageSize,
          nextPage: data.nextPage,
          previousPage: data.previousPage,
          page: data.page
        }
      });
  }
  ngOnDestroy() {
    this._usersListState = 'destroyed';
  }
}