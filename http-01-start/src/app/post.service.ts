import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Post } from "./post.model";

@Injectable({ providedIn: 'root' })
export class PostService {
    private urlBase = 'https://curso-angular-36237-default-rtdb.firebaseio.com/';
    constructor(private http: HttpClient) { }

    creteNewPost(data: Post) {
        return this.http.post<{ name: string }>(`${this.urlBase}posts.json`, data);
    }

    getPosts() {
        return this.http.get<{ [key: string]: Post }>(`${this.urlBase}posts.json`).pipe(map(respData => {
            const postsArray: Post[] = [];
            for (const key in respData) {
                if (respData.hasOwnProperty(key))
                    postsArray.push({ ...respData[key], id: key });
            }
            return postsArray;
        }))
    }

    deletePosts() {
        return this.http.delete(`${this.urlBase}posts.json`);
    }
}