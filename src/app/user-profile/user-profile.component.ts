import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import { UserProfileAnimations } from './user-profile.animations';
import { UsersService } from '../shared/services/users.service';
import { GoalsService } from '../shared/services/goals.service';
import { IUser } from '../shared/interfaces/user.interface';
import { IGoal } from '../shared/interfaces/goal.interface';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['user-profile.component.scss'],
    animations: UserProfileAnimations
})
export class UserProfileComponent implements OnInit, OnDestroy {
    userProfileState: string = 'loading';
    currentUser: any = {};
    userGoals: any = [];
    pageinateOptions: any = {};

    constructor(
        private _userService: UsersService,
        private _goalsService: GoalsService,
        private router: Router) { }

    ngOnInit() {
        setTimeout(() => {
            this.userProfileState = 'loaded';
        }, 800);

        this.currentUser = this._userService.getCurrentUser();
        
        this._userService.getUser(this.currentUser._id)
            .subscribe((data) => {
                if (!data.success) {
                  console.error(data.errMsg);  
                } 

                this.currentUser = data.users[0];                    
                this.getUserGoals();
            });
    }

    ngOnDestroy() {
        this.userProfileState = 'destroyed';
    }

    getUserGoals() {
        let user = this._userService.getCurrentUser();

        if (!(user && user.goals.length > 0)) {
            return;
        }

        this._goalsService.getGoalsByIds(user.goals)
            .subscribe((data) => {                                
                this.userGoals = data.goals;
                this.pageinateOptions = {
                    totalResults: data.totalResults,
                    pageSize: data.pageSize,
                    nextPage: data.nextPage,
                    previousPage: data.previousPage,
                    page: data.page
                }
            });
    }
}
