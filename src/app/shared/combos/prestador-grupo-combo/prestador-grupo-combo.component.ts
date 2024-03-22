import { Component, EventEmitter, Input, Output } from '@angular/core';
import { sharedPt } from '../../I18n/shared-pt';
import { PrestadorGrupoComboService } from './prestador-grupo-combo.service';

@Component({
  selector: 'sau-prestador-grupo-combo',
  templateUrl: './prestador-grupo-combo.component.html',
  styleUrls: ['./prestador-grupo-combo.component.css'],
})
export class PrestadorGrupoComboComponent {
  constructor(public service: PrestadorGrupoComboService) {}

  @Output() prestadorGrupoSelecionadoEvent = new EventEmitter<number>();
  @Input() labelPrestadorGrupo!: string;
  @Input() codigoGrupo!: number;

  prestadorGrupoSelecionado: number = 0;
  literals = sharedPt;
  page: number = 0;
  pageSize = 30;

  ngOnInit(): void {}

  alterarConvenio(prestadorGrupo: number) {
    this.prestadorGrupoSelecionadoEvent.emit(prestadorGrupo);
  }
}
