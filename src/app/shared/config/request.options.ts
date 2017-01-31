import { Headers, RequestOptions } from '@angular/http';

let headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');
if (localStorage.getItem('b_user')) {
    headers.append('jwt_token', JSON.parse(localStorage.getItem('b_user') || '{}').token);
}

export const Options = new RequestOptions({ headers: headers });