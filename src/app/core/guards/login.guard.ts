import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, CanLoad, Router, } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }



}
