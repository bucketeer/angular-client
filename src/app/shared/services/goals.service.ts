import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { IGoal } from '../interfaces/goal.interface';
import { AppConfig } from '../config/app.config';

@Injectable()
export class GoalsService {

    constructor(private _http: Http) { }

    getGoals() {
        return this._http.get(`${AppConfig.server}/api/goals/`)
            .map((res) => {return res.json()})
            .catch(this.handeError);
    };

    handeError(err: any) {
        console.error(err);
        return Observable.throw(err.json().error || 'Server error');
    }
}