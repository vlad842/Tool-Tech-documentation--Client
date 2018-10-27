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
export class AuthGuard implements CanActivate, CanActivateChild {


    readonly jwtHelper = new JwtHelperService();
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

         if (this.isAuthenticated()) {

             // logged in so return true
             return true;
         }

         // not logged in so redirect to login page with the return url
         this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
         return false;

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        return this.canActivate(route,state);
     }

    public isAuthenticated(): boolean {

        const token = localStorage.getItem('token');
        //console.log(token);
        //console.log(this.jwtHelper.isTokenExpired(token));
        // Check whether the token is expired and return
        //return !this.jwtHelper.isTokenExpired(token);
        return token != null;
      }
}