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
export class UserManagementService {

    private readonly apiUrl:string = environment.api_url;

    constructor(private http: HttpClient) { }

    // --- Functions ---
    getAllUsers() {
        return this.http.get<any>(`${this.apiUrl}/users/allUsers`)
            .pipe(map(data => {
                return data;
            }));
    }

    signup(full_name: string, email: string, password: string,user_role:string) {
        const is_admin = user_role === 'admin';
        return this.http.post<any>(`${this.apiUrl}/users/signup`, { full_name, email, password, is_admin})
            .pipe(map(data => {
                
                return data;
            }));
    }

    deleteUser(user_id){

        return this.http.delete<any>(`${this.apiUrl}/users/${user_id}`)
            .pipe(map(data => {
                return data;
            }));
    }


}