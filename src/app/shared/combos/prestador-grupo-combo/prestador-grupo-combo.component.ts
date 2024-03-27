import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PoComboComponent } from '@po-ui/ng-components';
import { sharedPt } from '../../I18n/shared-pt';
import { PrestadorGrupoComboService } from './prestador-grupo-combo.service';

@Component({
  selector: 'sau-prestador-grupo-combo',
  templateUrl: './prestador-grupo-combo.component.html',
  styleUrls: ['./prestador-grupo-combo.component.css'],
})
export class PrestadorGrupoComboComponent {
  constructor(public service: PrestadorGrupoComboService) {}

  @ViewChild('poComboPrestadoresGrupo', { static: true })
  poComboPrestadoresGrupo!: PoComboComponent;

  @Output() prestadorGrupoSelecionadoEvent = new EventEmitter<number>();
  @Input() labelPrestadorGrupo!: string;
  @Input() codigoGrupo!: number;
  @Input() desabilitado: boolean = false;

  prestadorGrupoSelecionado: number = 0;
  literals = sharedPt;
  page: number = 0;
  pageSize = 30;

  ngOnInit(): void {}

  alterarPrestadorGrupo(prestadorGrupo: number) {
    this.prestadorGrupoSelecionadoEvent.emit(prestadorGrupo);
  }

  reset() {
    this.poComboPrestadoresGrupo.clear(0);
  }
}
