import { Headers } from '@angular/http';

export const RequestHeaders = new Headers();
RequestHeaders.append('Accept', 'application/json');
RequestHeaders.append('Content-Type', 'application/json');
RequestHeaders.append('b_token', JSON.parse(localStorage.getItem('b_user') || '{}').b_token);
