import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderUpdateService {
    constructor(private http: HttpClient) {
    }

    statusUpdateStream(): Observable<any> {
        return null;
    }
}