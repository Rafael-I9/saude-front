import { ComponentRef, Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { PoLoadingOverlayComponent, PoNotificationService, PoLanguageService, PoComponentInjectorService } from '@po-ui/ng-components';
import { map, catchError, throwError } from 'rxjs';

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
    private poComponentInjector: PoComponentInjectorService
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
        map(res => {
          return res
        }),
        catchError((error: any) => {
          return this.throwErrorAndNotificateIt(error);
        })
      )
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
