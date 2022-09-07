import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { Post } from "./post.model";

@Injectable({ providedIn: 'root' })
export class PostService {
    private urlBase = 'https://curso-angular-36237-default-rtdb.firebaseio.com/';
    error = new Subject<string>();
    headers = {
        headers: new HttpHeaders({
            'Custom-Header': 'hola'
        })
    };

    constructor(private http: HttpClient) { }

    // creteNewPost(data: Post) {
    //     return this.http.post<{ name: string }>(`${this.urlBase}posts.json`, data);
    // }

    creteNewPost(data: Post) {
        this.http.post<{ name: string }>(`${this.urlBase}posts.json`, data).subscribe(resp => {
            return resp;
        }, error => this.error.next(error.error.error));
    }

    getPosts() {
        return this.http.get<{ [key: string]: Post }>(`${this.urlBase}posts.json`, this.headers)
            .pipe(
                map(respData => {
                    const postsArray: Post[] = [];
                    for (const key in respData) {
                        if (respData.hasOwnProperty(key))
                            postsArray.push({ ...respData[key], id: key });
                    }
                    return postsArray;
                }),
                catchError(errorResp => {
                    return throwError(errorResp);
                })
            );
    }

    deletePosts() {
        return this.http.delete(`${this.urlBase}posts.json`);
    }
}