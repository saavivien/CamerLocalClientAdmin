import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
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
                error => {
                    //logging the http response to browser's console in case of a failuer
                    if (event instanceof HttpResponse) {
                        console.log("api call error :", event);
                    }
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