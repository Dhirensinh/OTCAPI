import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication-service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = this.authenticationService.getToken();
        if (token) {
            req = req.clone({
                setHeaders: {
                    "Authorization": `Bearer ${token}`,
                }
            });
        }
        return next.handle(req);
    }
}
