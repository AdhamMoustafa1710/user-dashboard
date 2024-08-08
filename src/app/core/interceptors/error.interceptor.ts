import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

// import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, retry } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  handled401Error = false;
  handled403Error = false
  constructor(
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      retry(1),
      // finalize(() =>  this.ngxService.stop()),
      catchError((error: HttpErrorResponse) => {
        if (error?.error && error?.error?.status_code != 401 && error?.error?.status_code != 403) {
          let errorMessage = `${error.error.message}`;
        }
        else if (error?.error?.status_code == 401 && this.handled401Error == false) {
          alert('log out user')
          this.handled401Error = true
        }
        if (error?.error?.status_code == 403 && this.handled403Error == false) {
          window.history.back();
          this.handled403Error = true
          console.log('error', error)

        }
        if (error.error.code == 401 || error.message.includes('Unauthenticated') || error.message.includes('Unauthenticated') || error.error.message.includes('Unauthenticated')
          || error.status == 401 || error.statusText.includes('Unauthenticated')) {
          alert('log out user')
        }

        return throwError(() => error.error);
      })
    );







    // return next.handle(req).pipe(
    //   tap({
    //     error: (error: any) => {
    //       let errorMessage = '';
    //       if (error instanceof ErrorEvent) {
    //         errorMessage = `Error: ${error.error.message}`;
    //       } else {
    //         errorMessage = `Error Code: ${error.error.status_code}\n Message: ${error.error.message}`;
    //       }
    //       this._notification.error(errorMessage);
    //     }
    //   })
    // );


    // return next.handle(req).pipe(
    //   retry(1),
    //   finalize(() =>  {}),
    //   catchError((error:HttpErrorResponse)=>{
    //     let errorMessage = '';
    //     if(error.error instanceof ErrorEvent){
    //       errorMessage = `Error: ${error.message}`;
    //     }else{
    //       errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    //     }
    //     this._notification.error(errorMessage);
    //     return throwError(errorMessage);
    //   })
    // );










  }


}
