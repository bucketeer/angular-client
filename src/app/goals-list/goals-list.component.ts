import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { GoalsListAnimations } from './goals-list.animations';
import { GoalsService } from '../shared/services/goals.service';
import { UsersService } from '../shared/services/users.service';
import { IGoal } from '../shared/interfaces/goal.interface';

@Component({
  selector: 'goals-list',
  templateUrl: 'goals-list.component.html',
  styleUrls: ['goals-list.component.scss'],
  animations: GoalsListAnimations
})
export class GoalsListComponent implements OnInit, OnDestroy {
  goalsListState: string = 'loading';
  goalState: string = 'loading';
  goals: IGoal[] = [];
  pageinateOptions: any = {};
  currentUser = {};

  constructor(
    private _goalsService: GoalsService,
    private _usersService: UsersService,
    private _router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.goalsListState = 'loaded';
    }, 800);

    this.currentUser = this._usersService.getCurrentUser();

    this._goalsService.getCommunityGoals()
      .subscribe((data) => {
        this.goals = data.goals;
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
    this.goalsListState = 'destroyed';
  }

  isAdmin() {
    return this._usersService.isAdmin();
  }

  deleteGoal(index) {
    this._goalsService.deleteGoal(this.goals[index])
      .subscribe((data) => {
        if (!data.success) {
          console.error(data.errMsg);
          return;
        }

        this.goals.splice(index, 1);
        window.location.reload();
      });
  }

  selectGoal(goal) {
    localStorage.setItem("b_goal", JSON.stringify(goal));
    this._router.navigate(['goal']);
  }

  addGoalToUser(goal) {
    this._goalsService.createUserGoal(goal)
      .subscribe((data) => {
        if (!data.success) {
          console.error(data.errMsg);
          return;
        }

        this._usersService.addUserGoalById(data.goal._id, goal._id)
          .subscribe((data) => {
            if (!data.success) {
              console.error(data.errMsg);
              return;
            }
          });
      });

    this._usersService.updateCurrentUser();
  }

  isOwnedByUser(goal) {
    return this._usersService.isOwnedByUser(goal);
  }
}
