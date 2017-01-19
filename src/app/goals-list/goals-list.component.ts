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
  goalsListState: string = 'loading';
  goalState: string = 'loading';
  goals: IGoal[] = [];
  pageinateOptions: any = {};

  constructor(private _goalService: GoalsService) { }

  ngOnInit() {
    setTimeout(() => {
      this.goalsListState = 'loaded';
    }, 800);
    this._goalService.getGoals()
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
}