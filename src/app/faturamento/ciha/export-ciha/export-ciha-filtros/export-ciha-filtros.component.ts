import { Component, EventEmitter, Output } from '@angular/core';
import { PoComboOption, PoNotificationService } from '@po-ui/ng-components';
import { exportCihaPt } from '../I18n/export-ciha-pt';
import { ExportCIHAParametros } from '../model/export-ciha-parametros.model';
import { ConfigService } from 'src/app/core/config/config.service';

@Component({
  selector: 'sau-export-ciha-filtros',
  templateUrl: './export-ciha-filtros.component.html',
  styleUrls: ['./export-ciha-filtros.component.css'],
})
export class ExportCihaFiltrosComponent {
  @Output() consultarEvento = new EventEmitter<ExportCIHAParametros>();
  @Output() modeloValidoEvento = new EventEmitter<ExportCIHAParametros>();
  parametros!: ExportCIHAParametros;
  literals = exportCihaPt;
  @Output() mudouStatusEvento = new EventEmitter<string>();

  public codColigada: number;

  constructor(
    private poNotification: PoNotificationService,
    private config: ConfigService
  ) {
    this.parametros = new ExportCIHAParametros();
    this.codColigada = this.config.companyId;
  }

  maskCompetencia: string = '99/9999';
  optionsStatus: Array<PoComboOption> = [
    { label: 'Liberado', value: 'L' },
    { label: 'Finalizado', value: 'F' },
    { label: 'Não Liberado', value: 'N' },
  ];

  consultarClick(): void {
    if (this.validarCompetencia(this.parametros.competencia))
      this.consultarEvento.emit(this.parametros);
  }

  mudouStatusCiha(status: string): void {
    this.mudouStatusEvento.emit(status);
    this.validaModelFiltro();
  }
  mudouCompetencia(): void {
    this.validaModelFiltro();
  }

  validaModelFiltro() {
    if (
      !!this.parametros &&
      !!this.parametros.codUnidadeFaturamento &&
      !!this.parametros.competencia &&
      !!this.parametros.statusCIHA
    )
      this.modeloValidoEvento.emit(this.parametros);
  }

  validarCompetencia(competencia: any) {
    const mesCompetencia = parseInt(competencia.substring(0, 2));
    const anoCompetencia = parseInt(competencia.substring(2, 6));

    if (competencia.length != 6) {
      this.poNotification.warning(this.literals.mensagens.competenciaInvalida);
      return false;
    }

    if (mesCompetencia > 12 || mesCompetencia < 1) {
      this.poNotification.warning(
        this.literals.mensagens.mesCompetenciaInvalido
      );
      this.parametros.competencia = '';
      return false;
    }

    if (anoCompetencia < 1900) {
      this.poNotification.warning(
        this.literals.mensagens.anoCompetenciaInvalido
      );
      this.parametros.competencia = '';
      return false;
    }

    return true;
  }

  public unidadeChanged(unidadeFaturamento: number): void {
    this.parametros.codUnidadeFaturamento = unidadeFaturamento;
    this.validaModelFiltro();
  }
}
