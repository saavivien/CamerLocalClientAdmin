import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import *as utils from '../_utils/camer.local.utils';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private httpClient: HttpClient
    ) { }
    authenticate(email: string, password: string) {
        return this.httpClient.post<any>(utils.BACKEND_API_AUTHENTICATE_PATH, { email, password }, httpOptions).pipe(
            map(
                userData => {
                    sessionStorage.setItem('username', userData.username);
                    let tokenStr = utils.TOKEN_BEARER + userData.token;
                    sessionStorage.setItem('token', tokenStr);
                    return userData;
                }
            )
        );
    }
    isUserLoggedIn() {
        let user = sessionStorage.getItem('username');
        let token = sessionStorage.getItem('token');
        //console.log(!(user === null))
        return !(user === null || token === null)
    }
    logOut() {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
    }
}
