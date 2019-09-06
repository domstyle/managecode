import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private as: AuthService) { }

  canActivate() {
    if ( !this.as.isAuthenticated() ) {
      console.log('invalid token!');
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }

}
