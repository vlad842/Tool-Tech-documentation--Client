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
export class RecordesService {

    private readonly apiUrl: string = environment.api_url;


    constructor(private http: HttpClient) { }

    addRecord(tool_id, chamber_num,headline, description,tags,status,event) {
        console.log("tags",tags);
        console.log("status",status);
        console.log({tool_id, chamber_num,headline, description,tags,status,event});
        return this.http.post<any>(`${this.apiUrl}/records/addRecord`, { headline,event,tool_id, chamber_num, description,tags,status})
            .pipe(map(data => {
                return data;
            }));
    }

    getRecords(tag_id:string, tool_id:string, chamber_num:string,status:string) {
        const url = `${this.apiUrl}/records/${tag_id}/${tool_id}/${chamber_num}/${status}`;
        console.log('url',url);
        return this.http.get<any>(url)
            .pipe(map(data => {
                return data;
            }));
    }



    // --- Functions ---
    /*login(email: string, password: string) {
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
    }*/

}