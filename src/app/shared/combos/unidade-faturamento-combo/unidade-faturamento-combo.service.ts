import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/core/web/base.http.service';

import { WebApiQuery } from 'src/app/core/web/webapi-query.model';
import { PoComboOption } from '@po-ui/ng-components';
import { UnidadeFaturamento } from './model/unidade-faturamento.model';

@Injectable({
  providedIn: 'root',
})
export class UnidadeFaturamentoComboService {
  constructor(private httpService: BaseHttpService) {}

  @Output() unidadeChanged = new EventEmitter<string>();

  public getAll(): Observable<Array<PoComboOption>> {
    const objWebApiQuery: WebApiQuery = <WebApiQuery>{
      filtersComplex: this._getODataFilters(),
      pathUrl: 'careunit',
    };

    return this.httpService.getAll<UnidadeFaturamento>(objWebApiQuery).pipe(
      map((response) => {
        return response.items.map(
          (item) =>
            <PoComboOption>{
              value: `${item.key.idUnidAtend}`,
              label: item.description,
            }
        );
      })
    );
  }

  private _getODataFilters(): string {
    return `(UnidFatura eq 'T')`;
  }
}
