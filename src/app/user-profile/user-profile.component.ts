import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import { UserProfileAnimations } from './user-profile.animations';
import { UsersService } from '../shared/services/users.service';
import { IUser } from '../shared/interfaces/user.interface';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['user-profile.component.scss'],
    animations: UserProfileAnimations
})
export class UserProfileComponent implements OnInit, OnDestroy {
    userProfileState: string = 'loading';
    currentUser: any = {};

    constructor(
        private _userService: UsersService,
        private router: Router) { }

    ngOnInit() {
        setTimeout(() => {
            this.userProfileState = 'loaded';
        }, 800);
        this.currentUser = this._userService.currentUser;
        console.log(JSON.stringify(this.currentUser ));
    }

    ngOnDestroy() {
        this.userProfileState = 'destroyed';
    }
}
