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
export class ToolsManagementService {

    private readonly apiUrl:string = environment.api_url;

    constructor(private http: HttpClient) { }

    // --- Functions ---
    getAllTools() {
        return this.http.get<any>(`${this.apiUrl}/tools/getAllTools`)
            .pipe(map(data => {
                return data;
            }));
    }

    getAllChambersKindes(){
        return this.http.get<any>(`${this.apiUrl}/chambers/chamberKinds`)
        .pipe(map(data => {
            
            return data;
        }));
    }

    addTool(serialNumber:string,chambers:any[]){
        chambers.forEach((chamber) => {
            chamber.index = chamber.serialNumber - 1;
        });
        return this.http.post<any>(`${this.apiUrl}/tools/addTool`,{serialNumber,chambers})
        .pipe(map(data => {
            
            return data;
        }));
    }

    deleteTool(tool_id){

        return this.http.delete<any>(`${this.apiUrl}/tools/${tool_id}`)
            .pipe(map(data => {
                return data;
            }));
    }


}