import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Filter, FilterStorage } from '../filter.storage';
import { addFilterToRequest, getFilter } from '../utils/filter.utils';

@Injectable()
export class FilterInterceptor implements HttpInterceptor {
  private filter: Filter | undefined = undefined;

  constructor(private filterStorage: FilterStorage) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.filter = getFilter(this.filterStorage);
    const valorFilter = this.filter?.value ?? '';

    if (this.requisicaoTemFiltro(this.filter?.key, request)) {
      const newReq = addFilterToRequest(request, valorFilter, request.url);
      return next.handle(newReq);
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (this.requisicaoTemFiltro(this.filter?.key, request))
          this.filterStorage.clearFilter(request.url.split('/').pop());
      })
    );
  }

  private requisicaoTemFiltro(
    keyFilter: string | undefined,
    request: HttpRequest<any>
  ) {
    return (
      keyFilter &&
      request.url.split('/').pop() == keyFilter &&
      request.method === 'GET'
    );
  }
}

export const FilterInterceptorHttp = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: FilterInterceptor,
    multi: true,
  },
];
