import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


/**
 * Http Interceptor for adding token to the header.
 * Checkes for any http request if there is token stored in the local storage.
 * if there is, adding it to the header. 
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // taking the token from the local storage.
        let token  = localStorage.getItem('token');
        // checking if there is token.
        if (token) {
            token = token.substring(1, token.length-1);
            
            // adding it to the header.
            request = request.clone({
                setHeaders: {
                    'x-auth': `${token}`
                }
            });
        }

        // passing on the request.
        return next.handle(request);
    }
}