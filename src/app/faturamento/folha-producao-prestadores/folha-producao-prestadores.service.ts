import { BaseHttpService } from 'src/app/core/web/base.http.service';
import { Injectable } from '@angular/core';
import { ParameterSheetProductionPractitionerDto as ParameterSheetProductionPractitioner } from './model/parametros-folha-producao-prestadores.model';
import { Observable } from 'rxjs';

const CONTROLLER = 'sheet-production-practitioner';
@Injectable({
  providedIn: 'root',
})
export class FolhaProducaoPrestadoresService {
  constructor(private baseHttpService: BaseHttpService) {}

  gerarFolhaProducaoPrestador(
    parametro: ParameterSheetProductionPractitioner
  ): Observable<void> {
    return this.baseHttpService.post(CONTROLLER + '/generate', '', parametro);
  }
}
