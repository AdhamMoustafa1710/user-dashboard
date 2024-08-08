import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class DebugInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   return next.handle(request).pipe(
  //     tap(evt => {
  //       if (evt instanceof HttpResponse) {
  //         // console.log('Successful response from:', request.url);
  //         // console.log('Response Body:', evt.body);
  //       }
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       // console.error('Error from:', request.url, 'Status:', error.status, 'Error:', error.error);
  //       return throwError(() => error);
  //     })
  //   );
  // }
}
