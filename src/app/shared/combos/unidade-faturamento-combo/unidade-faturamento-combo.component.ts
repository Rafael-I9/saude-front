import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PoComboOption } from '@po-ui/ng-components';
import { sharedPt } from '../../I18n/shared-pt';
import { TipoUnidade } from './model/tipo-unidade.enum';
import { UnidadeFaturamentoComboService } from './unidade-faturamento-combo.service';

@Component({
  selector: 'sau-unidade-faturamento-combo',
  templateUrl: './unidade-faturamento-combo.component.html',
  styleUrls: ['./unidade-faturamento-combo.component.css'],
})
export class UnidadeFaturamentoComboComponent implements OnInit {
  constructor(private service: UnidadeFaturamentoComboService) {}

  @Output() mudouUnidadeEvento = new EventEmitter<number>();
  @Input() tipoUnidade!: TipoUnidade;

  optionsUnidadeFaturamento: Array<PoComboOption> = [];
  labelUnidade!: string;

  literals = sharedPt;

  ngOnInit(): void {
    if (this.tipoUnidade === TipoUnidade.Faturamento)
      this.labelUnidade = this.literals.label.unidadeFaturamento;
    else this.labelUnidade = this.literals.label.unidadeAtendimento;

    this.service.getAll().subscribe({
      next: (response) => {
        this.optionsUnidadeFaturamento = [...response];
      },
    });
  }

  public unidadeChanged(unidadeFaturamento: number): void {
    this.mudouUnidadeEvento.emit(unidadeFaturamento);
  }
}
