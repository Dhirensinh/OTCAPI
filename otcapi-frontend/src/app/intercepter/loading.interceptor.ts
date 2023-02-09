import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  activeRequests = 0;
  constructor(private spinnerService: NgxSpinnerService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //if (this.activeRequests === 0 && !request.url.includes('/getReports')) {
    if (this.activeRequests === 0) {
      this.spinnerService.show();
    }
    this.activeRequests++;
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.spinnerService.hide();
        }
      })
    )
  };
}
