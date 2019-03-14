import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';


@Injectable({ providedIn: 'root' })
export class TagsService {

    private readonly apiUrl: string = environment.api_url;


    constructor(private http: HttpClient) { }

    addTag(record_id, tag_ids, content) {
        return this.http.post<any>(`${this.apiUrl}/comments/addComment`, { record_id, tag_ids , content })
            .pipe(map(data => {
                return data;
            }));
    }

    getTags() {

        return this.http.get<any>(`${this.apiUrl}/tags`)
            .pipe(map(data => {
                return data;
            }));
    }


}