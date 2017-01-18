import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { GoalsListAnimations } from './goals-list.animations';
import { GoalsService } from '../shared/services/goals.service';
import { IGoal } from '../shared/interfaces/goal.interface';

@Component({
  selector: 'goals-list',
  templateUrl: 'goals-list.component.html',
  styleUrls: ['goals-list.component.scss'],
  animations: GoalsListAnimations
})
export class GoalsListComponent implements OnInit, OnDestroy {
  _goalsListState: string = 'loading';
  _goalState: string = 'loading';
  _goals: IGoal[] = [];
  _pageinateOptions: any = {};

  constructor(private _goalService: GoalsService) { }

  ngOnInit() {
    setTimeout(() => {
      this._goalsListState = 'loaded';
    }, 800);
    this._goalService.getGoals()
      .subscribe((data) => {
        this._goals = data.goals;
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
    this._goalsListState = 'destroyed';
  }
}