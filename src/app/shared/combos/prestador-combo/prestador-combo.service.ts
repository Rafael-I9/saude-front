import { Injectable } from '@angular/core';
import { PoComboFilter, PoComboOption } from '@po-ui/ng-components';
import { map, Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/core/web/base.http.service';
import { WebApiQuery } from 'src/app/core/web/webapi-query.model';
import { Prestador } from '../../model/prestador.model';

const PATHURL = 'practitioners';

@Injectable({
  providedIn: 'root',
})
export class PrestadorComboService implements PoComboFilter {
  constructor(private httpService: BaseHttpService) {}

  getFilteredData(
    params: any,
    filterParams?: any
  ): Observable<PoComboOption[]> {
    const objWebApiQuery: WebApiQuery = <WebApiQuery>{
      page: filterParams ? filterParams[0] : 1,
      pageSize: filterParams ? filterParams[1] : 10,
      filtersComplex: this._getOdataFilter(params),
      pathUrl: PATHURL,
    };

    return this.httpService.getAll<Prestador>(objWebApiQuery).pipe(
      map((response) => {
        return response.items.map(
          (item) =>
            <PoComboOption>{
              value: item.practitionerId,
              label: `${item.socialName}  ${
                item.professionalId ? '- ' + item.professionalId : ''
              }`,
            }
        );
      })
    );
  }

  getObjectByValue(
    value: string | number,
    filterParams?: any
  ): Observable<PoComboOption> {
    return this.httpService.get<Array<Prestador>>(PATHURL).pipe(
      map(
        (prestador: Array<Prestador>) =>
          <PoComboOption>{
            value: prestador[0].practitionerId,
            label: `${prestador[0].socialName} - ${prestador[0].professionalId}`,
          }
      )
    );
  }

  private _getOdataFilter(params: any): string {
    if (!!params && !!params.value) {
      return this.createFilterOData(params.value);
    }
    return '';
  }

  private createFilterOData(value: string) {
    return ` contains(socialName,'${value.toUpperCase()}') or contains(professionalId,'${value.toUpperCase()}')`;
  }
}
