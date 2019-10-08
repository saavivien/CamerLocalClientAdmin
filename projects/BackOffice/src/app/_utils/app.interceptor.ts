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

const TOKEN_HEADER_KEY = 'Authorization';
const TOKEN_BEARER = 'Authorization';

@Injectable()
export class CamerLocalInterceptor implements HttpInterceptor {

    constructor() { }
    //function which will be called for all http calls
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
            request = request.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem('token')
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

}