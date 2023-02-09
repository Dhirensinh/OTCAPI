import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from './../app.component';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication-service';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthenticationService,
        private dialogRef: MatDialog,
        private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap({
                next: (event: HttpEvent<any>) => {
                    if (event && event instanceof HttpResponse) {
                        if (event.status == 200) {
                            //this.commonser.openSnackBarSuccess((event.body.Message ? event.body.Message : "Success"), 'X');
                        }
                    }
                },
            }),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    try {
                        console.error(err)
                        if (err.status === 503) {
                            console.log('Service Temporarily Unavailable', '');
                        }
                        else if (err.status === 500) {
                            // tslint:disable-next-line: max-line-length
                            console.log('There is some temporary error on the server. Please try again or let us know if the error persist.', 'X');
                        } else if (err.status === 404) {
                            // tslint:disable-next-line: max-line-length
                            console.log('The resource you are looking for is not available on the server. Please try again or let us know if the error persist.', 'X');
                        } else if (err.status === 400) {
                            let msg = 'Bad Request';
                            if (err.error && err.error.message) {
                                msg = err.error.message;
                            }
                            console.log(msg);
                        } else if (err.status === 502) {
                            console.log('Bad Gateway.');
                        } else if (err.status === 403) {
                            let msg = 'This Action is not allowed.';
                            if (err.error && err.error.message) {
                                msg = err.error.message;
                            }
                            console.log(msg);
                        } else if (err.status === 401) {
                            this.dialogRef.closeAll();

                            this.authService.removeUser();
                            this.router.navigate(['login']);
                        }
                    } catch (e) {
                        console.error(e);

                    }
                }
                return of(err);
            })
        );

    }
}

