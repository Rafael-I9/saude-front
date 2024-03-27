import { EventEmitter, Injectable, Output } from '@angular/core';
import { PoComboFilter, PoComboOption } from '@po-ui/ng-components';
import { map, Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/core/web/base.http.service';
import { WebApiQuery } from 'src/app/core/web/webapi-query.model';
import { Insurance } from '../../model/insurance.model';

@Injectable({
  providedIn: 'root',
})
export class ConvenioComboService implements PoComboFilter {
  @Output() unidadeChanged = new EventEmitter<string>();

  constructor(private httpService: BaseHttpService) {}

  getFilteredData(
    params: any,
    filterParams?: any
  ): Observable<PoComboOption[]> {
    const objWebApiQuery: WebApiQuery = <WebApiQuery>{
      page: filterParams ? filterParams[0] : 1,
      pageSize: filterParams ? filterParams[1] : 10,
      order: ['description'],
      filtersComplex: this._getOdataFilter(params),
      pathUrl: 'insuranceCompanies',
    };

    return this.httpService.getAll<Insurance>(objWebApiQuery).pipe(
      map((response) => {
        return response.items.map(
          (item) =>
            <PoComboOption>{
              value: `${item.insuranceId}`,
              label: item.description,
            }
        );
      })
    );
  }

  getObjectByValue(
    value: string | number,
    filterParams?: any
  ): Observable<PoComboOption> {
    return this.httpService.get<Array<Insurance>>('insuranceCompanies').pipe(
      map(
        (convenio: Array<Insurance>) =>
          <PoComboOption>{
            value: `${convenio[0].insuranceId}`,
            label: convenio[0].description,
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
    return ` contains(description,'${value.toUpperCase()}')`;
  }
}
