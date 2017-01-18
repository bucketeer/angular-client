import { Headers, RequestOptions } from '@angular/http';

let _headers = new Headers();
_headers.append('Accept', 'application/json');
_headers.append('Content-Type', 'application/json');
if (localStorage.getItem('b_user')) {
    // _headers.append('b_token', JSON.parse(localStorage.getItem('b_user') || '{}').b_token);
}

export const Options = new RequestOptions({ headers: _headers });