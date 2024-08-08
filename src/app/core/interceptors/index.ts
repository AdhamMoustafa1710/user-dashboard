import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { DebugInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';

export const InterceptorsProvider = [
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: DebugInterceptor,
  //   multi: true,
  // },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: ErrorInterceptor,
  //   multi: true,
  // },
];
