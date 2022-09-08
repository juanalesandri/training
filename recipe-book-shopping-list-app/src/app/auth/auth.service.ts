import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AutResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    apiKey = 'AIzaSyB4yDI0ejpT6PI57X4GylxW3GxRjWvjyMk'
    urlBase: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        const registerInfo = {
            email,
            password,
            returnSecureToken: true
        }
        return this.http.post<AutResponseData>(this.urlBase, registerInfo)
    }
}