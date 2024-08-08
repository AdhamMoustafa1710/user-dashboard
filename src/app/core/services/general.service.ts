
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {
    constructor(private router: Router, private http: HttpService) { }


    getAllUsers(page: number): Observable<any> {
        const url = `/api/users?page=${page}`;
        return this.http.getReq(url);
    }

    getUser(id: any): Observable<any> {
        const url = `/api/users/${id}`;
        return this.http.getReq(url);
    }


}
