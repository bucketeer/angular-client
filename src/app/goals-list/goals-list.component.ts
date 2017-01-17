import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { GoalsListAnimations } from './goals-list.animations';
import { GoalsService } from '../shared/services/goals.service';

@Component({
  selector: 'goals-list',
  templateUrl: 'goals-list.component.html',
  styleUrls: ['goals-list.component.scss'],
  animations: GoalsListAnimations
})
export class GoalsListComponent implements OnInit {
  _goalsListState: string = 'loading';
  _goalState: string = 'loading';
  _goals: any[] = [];
  _pageinateOptions: any = {};

  constructor(private _goalService: GoalsService) { }

  ngOnInit() {
    setTimeout(() => {
      this._goalsListState = 'loaded';
    }, 800);
    this._goalService.getGoals()
      .subscribe((data) => {
        console.log(JSON.stringify(data));
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
}