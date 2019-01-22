import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/common/http'

@Injectable()
export class IsLoggedInService implements CanActivate {
  loggedIn: boolean = false;
  redirectUrl: string;

  constructor(private router: Router)
  {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.redirectUrl = state.url;
    return this.checkLogin(this.redirectUrl)
    return true;
  }

  checkLogin(url: string):boolean {
    if (this.loggedIn){
      return true;
    }
    else {
      
    }
  }

}
