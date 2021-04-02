import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const useSpinner = !(request.url?.includes('api/v1/managraph') && request.method === 'GET');

    if (useSpinner)
      this.spinnerService.show();

    return next
      .handle(request)
      .pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              if (useSpinner)
                this.spinnerService.hide();
            }
          },
          _ => {
            if (useSpinner)
              this.spinnerService.hide();
          }
        )
      );
  }
}
