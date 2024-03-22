import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { sharedPt } from '../../I18n/shared-pt';
import { PrestadorComboService } from './prestador-combo.service';

@Component({
  selector: 'sau-prestador-combo',
  templateUrl: './prestador-combo.component.html',
  styleUrls: ['./prestador-combo.component.css'],
})
export class PrestadorComboComponent {
  constructor(public service: PrestadorComboService) {}

  @Output() prestadorSelecionadoEvent = new EventEmitter<number>();
  @Input() labelPrestador!: string;

  prestadorSelecionado: number = 0;
  literals = sharedPt;
  page: number = 0;
  pageSize = 30;

  ngOnInit(): void {}

  alterarConvenio(convenio: number) {
    this.prestadorSelecionadoEvent.emit(convenio);
  }
}
