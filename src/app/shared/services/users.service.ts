import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { IUser } from '../interfaces/user.interface';
import { Options } from '../config/request.options';
import { AppConfig } from '../config/app.config';

@Injectable()
export class UsersService {

    currentUser: IUser = JSON.parse(localStorage.getItem("b_user") || '{}');

    constructor(private _http: Http) { }

    getCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem("b_user") || '{}');
        return this.currentUser;
    }
    
    getUsers() {
        return this._http.get(`${AppConfig.server}/api/users/`, Options)
            .map((res) => { 
                return res.json(); 
            })
            .catch(this.handeError);
    }

    getUser(id) {
        return this._http.get(`${AppConfig.server}/api/users?_id=${id}`, Options)
            .map((res) => { 
                let data = res.json();                 
                
                if(data.success){                    
                    this.currentUser = data.users[0];
                    localStorage.setItem("b_user", JSON.stringify(this.currentUser || {}));                    
                } 
                return data;               
            })
            .catch(this.handeError);
    }

    addUserGoalById(goalId) {
        this.currentUser.goals.push(goalId);
        return this._http.put(`${AppConfig.server}/api/users/${this.currentUser._id}`, { user: this.currentUser }, Options)
            .map((res) => {
                return res.json();
            })
            .catch(this.handeError);
    }

    signin(user) {
        return this._http.post(`${AppConfig.server}/api/users/signin`, { authenticate: true, user: user }, Options)
            .map((res) => {
                let data = res.json()
                
                if (data.authenticated && data.success) {
                    this.currentUser = data.user;
                    this.currentUser.token = data.token;
                    localStorage.setItem("b_user", JSON.stringify(this.currentUser || {}));
                }
                return data;
            })
            .catch(this.handeError);
    }

    signup(user) {
        return this._http.post(`${AppConfig.server}/api/users/signup`, { user: user }, Options)
            .map((res) => {
                let data = res.json()
               
                if (data.success) {
                    this.currentUser = data.user;
                    this.currentUser.token = data.token;
                    localStorage.setItem("b_user", JSON.stringify(this.currentUser || {}));
                }
                return data;
            })
            .catch(this.handeError);
    }

    signout() {
        return this._http.post(`${AppConfig.server}/api/users/signout`, {}, Options)
            .map((res) => {
                let data = res.json();
                localStorage.removeItem("b_user");
                return data;
            })
            .catch(this.handeError);
    }

    handeError(err: any) {
        console.error(err);
        return Observable.throw(err.json().error || 'Server error');
    }
}