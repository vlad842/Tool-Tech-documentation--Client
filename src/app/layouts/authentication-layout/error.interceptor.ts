import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from './user.service';

/**
 * Http Interceptor for 401 Unauthorized code status.
 * commit Logout - there for kick out to login page. 
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    //user userService for case of logout.
    constructor(private userService: UserService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 - Unauthorized error response.
                this.userService.logout();
                location.reload(true);
            }
            
            //const error = err.error.message || err.statusText;
            return throwError(err);
        }))
    }
}