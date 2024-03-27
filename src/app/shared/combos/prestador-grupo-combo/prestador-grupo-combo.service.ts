import { Injectable } from '@angular/core';
import { PoComboFilter, PoComboOption } from '@po-ui/ng-components';
import { map, Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.service';
import { BaseHttpService } from 'src/app/core/web/base.http.service';
import { WebApiQuery } from 'src/app/core/web/webapi-query.model';
import { PrestadorGrupo as PractitionerGroup } from '../../model/practitioner-group.model';

const PATHURL = 'group-practitioner';

@Injectable({
  providedIn: 'root',
})
export class PrestadorGrupoComboService implements PoComboFilter {
  constructor(
    private httpService: BaseHttpService,
    private config: ConfigService
  ) {}

  getFilteredData(
    params: any,
    filterParams?: any
  ): Observable<PoComboOption[]> {
    const objWebApiQuery: WebApiQuery = <WebApiQuery>{
      page: filterParams ? filterParams[0] : 1,
      pageSize: filterParams ? filterParams[1] : 10,
      filters: this.getSimpleFilter(filterParams[2]),
      filtersComplex: this.getOdataFilter(params),
      pathUrl: PATHURL,
    };

    return this.httpService.getAll<PractitionerGroup>(objWebApiQuery).pipe(
      map((response) => {
        return response.items.map(
          (item) =>
            <PoComboOption>{
              value: item.practitionerId,
              label: `${item.socialName} `,
            }
        );
      })
    );
  }

  getObjectByValue(
    value: string | number,
    filterParams?: any
  ): Observable<PoComboOption> {
    throw new Error('Method not implemented.');
  }

  getSimpleFilter(param: any): Map<string, any> {
    const filter = new Map<string, any>();
    filter.set('groupId', param);
    filter.set('companyId', this.config.companyId);
    return filter;
  }

  private getOdataFilter(params: any): string {
    if (!!params && !!params.value) {
      return this.createFilterOData(params.value);
    }
    return '';
  }

  private createFilterOData(value: string) {
    return ` contains(socialName,'${value.toUpperCase()}') or contains(ractitionerId,'${value.toUpperCase()}')`;
  }
}
