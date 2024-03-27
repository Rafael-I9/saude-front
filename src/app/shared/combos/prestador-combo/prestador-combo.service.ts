import { Injectable } from '@angular/core';
import { PoComboFilter, PoComboOption } from '@po-ui/ng-components';
import { map, Observable } from 'rxjs';
import { PrestadorService } from '../../services/prestador.service';

const PATHURL = 'practitioners';

@Injectable({
  providedIn: 'root',
})
export class PrestadorComboService implements PoComboFilter {
  constructor(private prestadorServico: PrestadorService) {}

  getFilteredData(
    params: any,
    filterParams?: any
  ): Observable<PoComboOption[]> {
    const filtersComplex = this._getOdataFilter(params);

    return this.prestadorServico
      .listaPrestador(filtersComplex, filterParams)
      .pipe(
        map((response) => {
          const prestadoresUnificados = response.items.filter(
            (prestador, index, self) =>
              index ===
              self.findIndex(
                (p) => p.practitionerId === prestador.practitionerId
              )
          );

          return prestadoresUnificados.map(
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
    throw new Error('Method not implemented.');
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
