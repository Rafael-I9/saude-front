import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TotvsTokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = request.clone({
      setHeaders: {
        Authorization: this.getToken(),
      },
    });

    return next.handle(request);
  }

  private getToken() {
    return 'Basic ' + btoa('mestre:totvs');
  }
}

export const TotvsTokenInterceptorHttp = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TotvsTokenInterceptor,
    multi: true,
  },
];
