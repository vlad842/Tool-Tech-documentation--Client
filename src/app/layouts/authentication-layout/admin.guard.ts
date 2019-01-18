import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


/**
 * A guard for authentication check.
 * Use the token saved in the local storage.
 * Use CanActivate & CanActivateChild for checking also the children's of the guarded component.
 * Use JwtHelperService to check the
 * */

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanActivateChild {


    readonly jwtHelper = new JwtHelperService();
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

         if (this.isAdmin()) {

             // logged in so return true
             return true;
         }

         // not logged in so redirect to login page with the return url
         this.router.navigate(['/dashboard']);
         return false;

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        return this.canActivate(route,state);
     }

    public isAdmin(): boolean {

        const token = localStorage.getItem('token');
        const decode_token = this.jwtHelper.decodeToken(token);

        return decode_token.isAdmin;
      }
}