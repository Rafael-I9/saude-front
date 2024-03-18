import { ComponentRef, Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { PoLoadingOverlayComponent, PoNotificationService, PoLanguageService, PoComponentInjectorService } from '@po-ui/ng-components';
import { map, catchError, throwError } from 'rxjs';
import { LibUtils } from '../utils/lib.utils';

export const errorCatchingDynamicLiterals: { [key: string]: any } = {
  en: {
    errorCode: 'Error Code',
    message: 'Message'
  },
  pt: {
    errorCode: 'Código do erro',
    message: 'Mensagem'
  }
};

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private loadingOverlayComponent: ComponentRef<PoLoadingOverlayComponent> | undefined;
  private language: string;

  constructor (
    private notification: PoNotificationService,
    private languageService: PoLanguageService,
    private poComponentInjector: PoComponentInjectorService,
    private libUtils: LibUtils
  ) {
    this.language = this.languageService.getShortLanguage();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = request.clone({
      setHeaders: {
        'Authorization': this.getToken(),
      }
    });

    return next.handle(request)
      .pipe(
        // map(event => {
        //   return event;
        // }),
        map((event: HttpEvent<any>) => {
          return this.setTitle(event, request);
        }),
        catchError((error: any) => {
          return this.throwErrorAndNotificateIt(error);
        })
      )
  }

  private setTitle(event: HttpEvent<any>, request: HttpRequest<any>) {
    if (event instanceof HttpResponse) {
      if (request.url.includes('procserv-tables/schema'))
        event.body.title = this.libUtils.getResourceValue('maintenance-price-table', 'procServ', 'title');
      else if (request.url.includes('matmed-tables/schema'))
        event.body.title = this.libUtils.getResourceValue('maintenance-price-table', 'matMed', 'title');
    }

    return event;
  }

  private getDefaultErrorMessage(error: HttpErrorResponse) {
    const { errorCode, message } = errorCatchingDynamicLiterals[this.language] || {};
    return `${errorCode}: ${error?.status}, ${message}: ${error?.message}`;
  }

  private getCustomErrorMessage(error: HttpErrorResponse) {
    const { errorCode, message } = errorCatchingDynamicLiterals[this.language] || {};    
    const handledError = this.getNormalizedErrorObject(error.error);
    return `${errorCode}: ${handledError.code || '___'}, ${message || '___'}: ${handledError.message || '___'}`;
  }

  private getNormalizedErrorObject(error: any): {code: string, message: string} {
    return {
      code: error.Code ?? error.code ?? 'COD001',
      message: error.Message ?? error.message ?? error.Error ?? error.error ?? 'Erro desconhecido'
    }
  }

  private getErrorMessage(error: HttpErrorResponse) {
    const handledErrorMessage = !this.isNullOrUndefined(error?.error) && !(error?.error instanceof ProgressEvent)
      ? this.getCustomErrorMessage(error)
      : this.getDefaultErrorMessage(error);

    return handledErrorMessage;
  }

  private isNullOrUndefined(value: any) {
    return value == null || value == undefined
  }

  private throwErrorAndNotificateIt(error: any) {
    let errorMsg = this.getErrorMessage(error)

    this.notification.error(errorMsg);
    this.destroyLoading();

    return throwError(() => errorMsg);
  }

  private destroyLoading() {
    if (this.loadingOverlayComponent) {
      this.poComponentInjector.destroyComponentInApplication(this.loadingOverlayComponent);
    }
  }

  private getToken() {
    return 'Basic ' + btoa('mestre:totvs')
  }
}

export const RequestInterceptorHttp = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  }
];
