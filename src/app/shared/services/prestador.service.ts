import { ConfigService } from 'src/app/core/config/config.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/core/web/base.http.service';
import { WebApiQuery } from 'src/app/core/web/webapi-query.model';
import { Practitioner } from '../model/practitioner.model';

const CONTROLLER = 'practitioners';

@Injectable({
  providedIn: 'root',
})
export class PrestadorService {
  constructor(
    private httpService: BaseHttpService,
    private config: ConfigService
  ) {}

  listaPrestador(oData: string, filterParams: any) {
    const codColigada = this.config.companyId;
    const objWebApiQuery: WebApiQuery = <WebApiQuery>{
      page: filterParams ? filterParams[0] : 1,
      pageSize: filterParams ? filterParams[1] : 30,
      filters: new Map<string, any>([['CompanyId', codColigada]]),
      filtersComplex: oData,
      pathUrl: CONTROLLER,
    };

    return this.httpService.getAll<Practitioner>(objWebApiQuery);
  }

  obterPrestador(chavePrestador: string): Observable<Practitioner> {
    return this.httpService.getById<Practitioner>(CONTROLLER, chavePrestador);
  }
}
