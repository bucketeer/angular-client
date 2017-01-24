import { Component, OnInit, OnDestroy } from '@angular/core';
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
    private _usersService: UsersService) { }

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

    this.currentUser = this._usersService.updateCurrentUser();
  }
}