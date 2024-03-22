import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PoComboOption } from '@po-ui/ng-components';
import { sharedPt } from '../../I18n/shared-pt';
import { ConvenioComboService } from './convenio-combo.service';

@Component({
  selector: 'sau-convenio-combo',
  templateUrl: './convenio-combo.component.html',
  styleUrls: ['./convenio-combo.component.css'],
})
export class ConvenioComboComponent implements OnInit {
  constructor(public service: ConvenioComboService) {}
  @Output() convenioSelecionadoEvent = new EventEmitter<number>();

  convenioSelecionado: number = 0;
  literals = sharedPt;
  page: number = 0;
  pageSize = 100;

  ngOnInit(): void {}

  alterarConvenio(convenio: number) {
    this.convenioSelecionadoEvent.emit(convenio);
  }
}
