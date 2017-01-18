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

    _currentUser:IUser = JSON.parse(localStorage.getItem("b_user") || '{}');

    constructor(private _http: Http) { }

    getUsers() {
        return this._http.get(`${AppConfig.server}/api/users/`, Options)
            .map((res) => { return res.json() })
            .catch(this.handeError);
    }

    signin(_user) {
        _user.email = "525@email.com";
        _user.password = "password";
        return this._http.post(`${AppConfig.server}/api/users/signin`, { authenticate: true, user: _user }, Options)
            .map((res) => {
                let _data = res.json()
                if (_data.authenticated) {
                    let _currentUser = _data.user;
                    _currentUser.token = _data.token;
                    localStorage.setItem("b_user", JSON.stringify(_currentUser || {}));
                }
                return _data;
            })
            .catch(this.handeError);
    }

    signout() {
        return this._http.post(`${AppConfig.server}/api/users/signout`, { }, Options)
            .map((res) => {
                let _data = res.json();
                localStorage.removeItem("b_user")
                return _data;
            })
            .catch(this.handeError);
    }

    handeError(err: any) {
        console.error(err);
        return Observable.throw(err.json().error || 'Server error');
    }
}