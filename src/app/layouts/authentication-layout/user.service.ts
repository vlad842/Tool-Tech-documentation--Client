import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * User Service - take care of all user's data.
 * Local storage data - email and token.
 * Api data - User devices.
 */

@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly apiUrl:string = environment.api_url;

    //Foretold local storage property names
    private readonly localsorage_title_email = 'email';
    private readonly localsorage_title_token = 'token';

    private usersDevices:object[];

    constructor(private http: HttpClient) { }


    // --- Getters ---

    get email(){
        return this.getFromLocalStorage(this.localsorage_title_email);
    }

    // --- Functions ---
    login(email: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
            .pipe(map(data => {

                // login successful if there's a jwt token in the response
                if (data && data.token) {

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.saveToLocalStorage(this.localsorage_title_token,data.token);
                    this.saveToLocalStorage(this.localsorage_title_email,email);
                }
                
                return data;
            }));
    }

    logout() {

        // remove user from local storage to log user out
        this.removeFromLocalStorage(this.localsorage_title_token);
        this.removeFromLocalStorage(this.localsorage_title_email);
    }


    // --- Private Functions ---
    private saveToLocalStorage(data_title:string,data)
    {
        localStorage.setItem(data_title, JSON.stringify(data));
    }
    private removeFromLocalStorage(data_title:string)
    {
        localStorage.removeItem(data_title);
    }
    private getFromLocalStorage(data_title:string)
    {
        localStorage.getItem(data_title);
    }

}