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
  usersListState: string = 'loading';
  userState: string = 'loading';
  users: IUser[] = [];
  pageinateOptions: any = {};

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    setTimeout(() => {
      this.usersListState = 'loaded';
    }, 800);
    this._usersService.getUsers()
      .subscribe((data) => {
        this.users = data.users;
        this.pageinateOptions = {
          totalResults: data.totalResults,
          pageSize: data.pageSize,
          nextPage: data.nextPage,
          previousPage: data.previousPage,
          page: data.page
        }
      });
  }
  ngOnDestroy() {
    this.usersListState = 'destroyed';
  }
}