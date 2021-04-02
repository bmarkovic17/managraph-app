import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ErrorComponent } from '../error/error.component';

@Injectable()
export class HttpErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private bottomSheet: MatBottomSheet) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error?.error ?? error.error?.message ?? error.message;

          if (!(error.url?.endsWith('api/v1/managraph') && request.method === 'GET')) {
            this.openErrorSheet(errorMessage);
          }

          return throwError(errorMessage);
        })
      );
  }

  private openErrorSheet = (errorMessage: string) =>
    this.bottomSheet.open(ErrorComponent, { data: { errorMessage: errorMessage } });
}
