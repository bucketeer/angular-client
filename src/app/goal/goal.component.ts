import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import { GoalAnimations } from './goal.animations';
import { UsersService } from '../shared/services/users.service';
import { GoalsService } from '../shared/services/goals.service';
import { IUser } from '../shared/interfaces/user.interface';
import { IGoal } from '../shared/interfaces/goal.interface';

@Component({
    selector: 'goal',
    templateUrl: 'goal.component.html',
    styleUrls: ['goal.component.scss'],
    animations: GoalAnimations
})
export class GoalComponent implements OnInit, OnDestroy {
    goalState: string = 'loading';
    currentUser: any = {};
    currentGoal: any = {};
    isUpdatingGoal: boolean = false;
    updateGoalErrors = [];

    constructor(
        private _usersService: UsersService,
        private _goalsService: GoalsService,
        private _router: Router) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.goalState = 'loaded';
        }, 800);

        this.currentUser = this._usersService.getCurrentUser();
        this.currentGoal = this._goalsService.getCurrentGoal();
    }

    ngOnDestroy() {
        this.goalState = 'destroyed';
        this._goalsService.removeCurrentGoal();
    }

    isEditable() {
        if (this.currentUser.goals.indexOf(this.currentGoal._id) > -1 || this._usersService.isAdmin()) {
            return true;
        }
        return false;
    }

    submitForm(): void {
        if (typeof this.currentGoal.hashtags === "string") {
            this.currentGoal.hashtags = this.currentGoal.hashtags.split(',');
        }
        console.log(JSON.stringify(this.currentGoal));

        this._goalsService.updateCurrentGoal(this.currentGoal);
        // this.isUpdatingGoal = true
        // this._goalsService.updateGoal(goal)
        //     .subscribe((data) => {
        //         this.isUpdatingGoal = false;
        //         if (!data.success) {
        //             this.updateGoalErrors.push(data.errMsg)
        //             return;
        //         }
        //         this.goalForm.reset();
        //         this._router.navigate(['user-profile']);
        //     },
        //     (err) => {
        //         this.isUpdatingGoal = false;
        //         this.updateGoalErrors.push(err)
        //     });
    }
}
