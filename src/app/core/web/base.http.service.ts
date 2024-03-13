import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { WebApiQuery } from './webapi-query.model';
import { WebApiResponseList } from './webapi-response.model';
import { LibUtils } from 'src/app/shared/utils/lib.utils';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  constructor(
    public http: HttpClient,
    private config: ConfigService,
    private libUtils: LibUtils
  ) {
    this.http = http;
  }

  public resolveUrl(controllerName: string, params?: string | number) {
    params = params || '';
    return this.libUtils.concatRoute(this.config.fullApiUrl, controllerName, params as string);
  }

  public get<T>(
    controllerName: string,
    params?: string | number
  ): Observable<T> {
    params = params || '';
    const url = this.resolveUrl(controllerName, params);
    return this.http.get<T>(url);
  }

  public getAllItemsList(
    controllerName: string,
    params: string
  ): Observable<Array<any>> {
    const url = this.resolveUrl(controllerName, params);
    return this.http.get(url).pipe(
      map((obj: any) => {
        return obj.items;
      })
    );
  }

  public getAll<T>(
    objWebApiQuery: WebApiQuery
  ): Observable<WebApiResponseList<T>> {
    return this.http.get<WebApiResponseList<T>>(
      this.resolveUrl(objWebApiQuery.pathUrl),
      {
        params: this.getHttpParams(objWebApiQuery),
      }
    );
  }

  public getById<T>(
    controllerName: string,
    id: string | number
  ): Observable<T> {
    return this.http.get<T>(`${this.resolveUrl(controllerName)}${id}`);
  }

  public getWithOutPermission<T>(
    controllerName: string,
    params?: string | number
  ): Observable<T> {
    const url = this.resolveUrl(controllerName, params);
    return this.http.get<any>(url);
  }

  public post<T>(
    controllerName: string,
    params: string | number,
    body: any
  ): Observable<T> {
    const url = this.resolveUrl(controllerName, params);
    return this.http.post<T>(url, body);
  }

  public postByUrl<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  public getByUrl<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public put<T>(
    controllerName: string,
    id: number | string,
    body: object
  ): Observable<T> {
    const url = this.resolveUrl(controllerName, id);
    return this.http.put<T>(url, body);
  }

  public patch<T>(
    controllerName: string,
    id: number | string,
    body: object
  ): Observable<T> {
    const url = this.resolveUrl(controllerName, id);
    return this.http.patch<T>(url, body);
  }

  public delete(controllerName: string, id: string | number): Observable<any> {
    const url = this.resolveUrl(controllerName, id);
    return this.http.delete(url);
  }

  private getHttpParams(objWebApiQuery: WebApiQuery): HttpParams {
    let objHttpParams: HttpParams = new HttpParams();
    if (objWebApiQuery) {
      objHttpParams = this.addPaginationFilters(objWebApiQuery, objHttpParams);
      objHttpParams = this.addSimpleFilters(objWebApiQuery, objHttpParams);
      objHttpParams = this.addComplexFilters(objWebApiQuery, objHttpParams);
    }
    return objHttpParams;
  }

  private addPaginationFilters(
    objWebApiQuery: WebApiQuery,
    objHttpParams: HttpParams
  ) {
    if (objWebApiQuery.page) {
      objHttpParams = objHttpParams.set('page', objWebApiQuery.page.toString());
    }
    if (objWebApiQuery.pageSize) {
      objHttpParams = objHttpParams.set(
        'pageSize',
        objWebApiQuery.pageSize.toString()
      );
    }
    if (objWebApiQuery.order) {
      objHttpParams = objHttpParams.set(
        'order',
        objWebApiQuery.order.join(',')
      );
    }
    if (objWebApiQuery.fields) {
      objHttpParams = objHttpParams.set(
        'fields',
        objWebApiQuery.fields.join(',')
      );
    }
    return objHttpParams;
  }

  private addComplexFilters(
    objWebApiQuery: WebApiQuery,
    objHttpParams: HttpParams
  ) {
    if (objWebApiQuery.filtersComplex) {
      objHttpParams = objHttpParams.set(
        '$filter',
        objWebApiQuery.filtersComplex
      );
    }
    return objHttpParams;
  }

  private addSimpleFilters(
    objWebApiQuery: WebApiQuery,
    objHttpParams: HttpParams
  ) {
    if (objWebApiQuery.filters) {
      const keys: Array<string> = Array.from(objWebApiQuery.filters.keys());
      for (const key of keys) {
        objHttpParams = objHttpParams.set(key, objWebApiQuery.filters.get(key));
      }
    }
    return objHttpParams;
  }
}
