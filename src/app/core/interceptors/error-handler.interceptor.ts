import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/layouts/toast/toast-service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private translateService: TranslateService, private toastService: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          let clonedError = { ...error } 
          if (error.error instanceof ArrayBuffer) {
            const decoder = new TextDecoder('utf-8'); 
            clonedError.error = JSON.parse(decoder.decode(error.error));
          }
          const errorCode = clonedError?.error?.code ?? 'INTERNAL_SERVER_ERROR';
          const errorMessage = this.translateService.instant('global.error.' + errorCode);
          this.toastService.showError(errorMessage);
      
         // this.toastService.showError(this.translateService.instant('global.error.'+ (clonedError?.error?.code ?? 'INTERNAL_SERVER_ERROR')));
        },
      })
    );
  }
}
