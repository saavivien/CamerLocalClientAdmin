import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { NbAuthService, NbAuthOAuth2JWTToken } from '@nebular/auth';
import { BACKEND_API_AUTHENTICATE_PATH } from './camer.local.utils';

const TOKEN_HEADER_KEY = 'Authorization';
const TOKEN_BEARER = 'Authorization';

@Injectable()
export class CamerLocalInterceptor implements HttpInterceptor {

    constructor(private authService: NbAuthService) { }
    //function which will be called for all http calls
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!request.url.match(BACKEND_API_AUTHENTICATE_PATH)) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + this.getAccessToken().getValue(),
                }
            })
        }
        return next.handle(request).pipe(
            tap(
                event => {
                    //logging the http response to browser's console in case of a success
                    if (event instanceof HttpResponse) {
                        console.log("api call success :", event);
                    }
                },
                err => {
                    //logging the http response to browser's console in case of a failuer
                    if ([401, 403].indexOf(err.status) !== -1) {
                        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                        // this.authService.logout('myAuthStrategy')
                        // location.reload(true);
                    }
                    const error = err.error.message || err.statusText;
                    return throwError(error);
                }
            )
        );
    }

    private getAccessToken(): NbAuthOAuth2JWTToken {
        let accesTokenStringValue = null;
        this.authService.getToken()
            .subscribe((token: NbAuthOAuth2JWTToken) => {
                if (token.isValid()) {
                    return accesTokenStringValue = token;
                }
            })
        return accesTokenStringValue;
    }

}