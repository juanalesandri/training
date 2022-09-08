import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registerd?: boolean,
}

const errorsType = {
    'EMAIL_EXISTS': 'This email exists already',
    'INVALID_PASSWORD': 'Invalid username or password',
    'EMAIL_NOT_FOUND': 'Invalid username or password',
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    apiKey = 'AIzaSyB4yDI0ejpT6PI57X4GylxW3GxRjWvjyMk';
    loginStr = 'signInWithPassword';
    signUpStr = 'signUp';
    urlBase: string = 'https://identitytoolkit.googleapis.com/v1/accounts'
    user = new Subject<User>();



    // errorsType = {
    //     'EMAIL_EXISTS': 'This email exists already'
    //     //'INVALID_PASSWORD': 'Invalid username or password',
    //     //'EMAIL_NOT_FOUND': 'Invalid username or password',
    // }


    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        const registerInfo = {
            email,
            password,
            returnSecureToken: true
        };
        const url = `${this.urlBase}:${this.signUpStr}?key=${this.apiKey}`;

        return this.http.post<AuthResponseData>(url, registerInfo)
            .pipe(catchError(this.handleError), tap(respData => this.handleAuthentication(respData.email, respData.localId, respData.idToken, parseInt(respData.expiresIn))))
    }

    login(email: string, password: string) {
        const loginInfo = {
            email,
            password,
            returnSecureToken: true
        };

        console.log('ERRORS-type', errorsType);

        const url = `${this.urlBase}:${this.loginStr}?key=${this.apiKey}`;
        return this.http.post<AuthResponseData>(url, loginInfo)
            .pipe(catchError(this.handleError), tap(respData => this.handleAuthentication(respData.email, respData.localId, respData.idToken, parseInt(respData.expiresIn))));
    }

    private handleAuthentication(email: string, localId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, localId, token, expirationDate);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.log('ERROR-RES', errorRes.error.error.message);
        console.log('ERRORS-type', errorsType);
        let errorMessage = 'An unknown error occurred';
        errorMessage = errorsType[errorRes.error.error.message] || errorMessage;
        return throwError(errorMessage);
    }
}