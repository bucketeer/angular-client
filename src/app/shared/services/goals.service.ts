import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IGoal } from '../interfaces/goal.interface';
import { Options } from '../config/request.options';
import { AppConfig } from '../config/app.config';

@Injectable()
export class GoalsService {

    constructor(private _http: Http) { }

    getGoals() {
        return this._http.get(`${AppConfig.server}/api/goals`, Options)
            .map((res) => { return res.json() })
            .catch(this.handeError);
    }

    getGoalsByIds(goalIds) {
        let query: string = '';

        for (let id of goalIds) {
            query = `${query}_ids=${id}&`;
        }
        
        return this._http.get(`${AppConfig.server}/api/goals?${query}`, Options)
            .map((res) => { return res.json() })
            .catch(this.handeError);
    }

    createGoal(goal: IGoal) {
        let newGoal: IGoal = {
            name: goal.name,
            description: goal.description,
            hashtags: goal.hashtags,
            category: goal.category,
            isPrivate: goal.isPrivate,
            location: goal.location,
            media: goal.media,
            completed: {
                status: false
            }
        };

        return this._http.post(`${AppConfig.server}/api/goals`, { goal: newGoal }, Options)
            .map((res) => { return res.json() })
            .catch(this.handeError);
    }

    handeError(err: any) {
        console.error(err);
        return Observable.throw(err.json().error || 'Server error');
    }
}