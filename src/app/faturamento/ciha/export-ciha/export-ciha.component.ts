import { exportCihaPt } from './I18n/export-ciha-pt';
import { ExportCihaService } from './export-ciha.service';
import { ExportCIHAParametros } from './model/export-ciha-parametros.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentBase } from 'src/app/core/library/modelo/component.base';
import { ExportCIHA } from './model/export-ciha.model';
import * as ngComponents from '@po-ui/ng-components';
import {
  PoDropdownAction,
  PoNotificationService,
  PoPageAction,
  PoPageFilter,
  PoPageSlideComponent,
  PoTableAction,
  PoTableColumn,
  PoTableColumnSpacing,
  PoTableComponent,
} from '@po-ui/ng-components';
import { ExportCIHAParametrosForaCompetencia } from './model/export-ciha-parametros-fora-competencia.model';
import { ConfigService } from 'src/app/core/config/config.service';
import { LibUtils } from 'src/app/shared/utils/lib.utils';

@Component({
  selector: 'sau-export-ciha',
  templateUrl: './export-ciha.component.html',
  styleUrls: ['./export-ciha.component.scss'],
})
export class ExportCihaComponent extends ComponentBase implements OnInit {
  @ViewChild(PoTableComponent, { static: true })
  poTable!: PoTableComponent;
  @ViewChild(PoPageSlideComponent, { static: true })
  pageSlide!: PoPageSlideComponent;

  literals = exportCihaPt;
  isLoading: boolean = false;
  isLoadingAnotherPeriod: boolean = false;
  showMoreDisabled: boolean = true;
  showMoreDisabledAnotherPeriod: boolean = true;
  items: Array<ExportCIHA> = [];
  itemsAnotherPeriod: Array<ExportCIHA> = [];
  currentPageAnotherPeriod: number = 1;
  currentPage: number = 1;
  currentParams!: ExportCIHAParametros;
  paramsAnotherPeriod!: ExportCIHAParametrosForaCompetencia;
  processOptions!: PoDropdownAction[];
  actionsPage!: PoPageAction[];
  spacingColumn = PoTableColumnSpacing.Small;
  filter!: string | Array<string>;

  pageFilter: PoPageFilter = {
    action: this.filterAction.bind(this),

    placeholder: 'Filtrar',
  };

  constructor(
    private serviceExportacaoCIHA: ExportCihaService,
    private poNotification: PoNotificationService,
    public override config: ConfigService,
    public override libUtils: LibUtils
  ) {
    super(config, libUtils);

    this.paramsAnotherPeriod = new ExportCIHAParametrosForaCompetencia();
  }

  filterAction(labelFilter: string | Array<string>) {
    this.filter = labelFilter;
    this.executarFiltro(this.currentParams);
  }

  advancedFilterActionModal() {}

  tratamentoRetorno = {
    next: () => {
      this.poNotification.success(this.literals.mensagens.processoSucesso);
    },
    error: () => {
      this.isLoading = false;
      this.showMoreDisabled = false;
    },
    complete: () => {
      this.isLoading = false;
      this.showMoreDisabled = false;
      this.executarFiltro(this.currentParams);
    },
  };

  ngOnInit() {
    this.obterProcessOptions('L');
  }

  clickConsultar(parametros: ExportCIHAParametros) {
    this.filter = '';
    this.executarFiltro(parametros);
  }

  executarFiltro(parametros: ExportCIHAParametros) {
    if (!!parametros) parametros.codColigada = this.config.companyId;

    if (!this.validaParametros(parametros)) {
      this.poNotification.warning(
        this.literals.mensagens.parametrosObrigatorios
      );
      return;
    }

    this.currentParams = parametros;
    this.items = [];
    this.currentPage = 1;
    this.loadDadosExportacao();
  }

  loadDadosExportacao() {
    this.isLoading = true;
    this.serviceExportacaoCIHA
      .getList(this.currentParams, this.filter, this.currentPage)
      .subscribe({
        next: (response) => {
          this.items = [...this.items, ...response.items];
          this.showMoreDisabled = !response.hasNext;
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  showMore() {
    this.currentPage++;
    this.isLoading = true;
    this.showMoreDisabled = true;
    this.loadDadosExportacao();
  }

  private ExportCIHA() {
    if (!this.validaExportacao()) {
      return;
    }

    if (this.filter)
      this.poNotification.information(this.literals.mensagens.avisoFiltro);

    this.tratamentoRetorno.next = () => {
      this.poNotification.success(this.literals.mensagens.exportacaoSucesso);
    };

    this.filter = '';
    this.isLoading = true;
    this.serviceExportacaoCIHA
      .exportarCIHA(this.currentParams)
      .subscribe(this.tratamentoRetorno);
  }

  private validaExportacao(): boolean {
    if (this.existePendencia()) {
      this.poNotification.warning(this.literals.mensagens.registrosPendentes);
      return false;
    }

    if (!this.validaItems()) {
      this.poNotification.warning(this.literals.mensagens.semItensParaExportar);
      return false;
    }

    return true;
  }

  private Liberar() {
    const itensSelecionados = this.poTable.getSelectedRows();

    if (!this.validaItensSelecionados(itensSelecionados)) {
      this.poNotification.warning(
        this.literals.mensagens.registroNaoSelecionado
      );
      return;
    }

    this.isLoading = true;
    this.serviceExportacaoCIHA
      .liberar(itensSelecionados)
      .subscribe(this.tratamentoRetorno);
  }

  private NaoLiberar() {
    const itensSelecionados = this.poTable.getSelectedRows();
    if (!this.validaItensSelecionados(itensSelecionados)) {
      this.poNotification.warning(
        this.literals.mensagens.registroNaoSelecionado
      );
      return;
    }

    this.isLoading = true;
    this.serviceExportacaoCIHA
      .naoLiberar(itensSelecionados)
      .subscribe(this.tratamentoRetorno);
  }

  executarFiltroOutraCompetencia() {
    this.currentPageAnotherPeriod = 1;
    if (!this.validaParametrosForaCompetencia(this.paramsAnotherPeriod)) {
      this.poNotification.warning(
        this.literals.mensagens.parametrosObrigatoriosOutraCompetencia
      );
      return;
    }
    this.itemsAnotherPeriod = [];
    this.currentPageAnotherPeriod = 1;

    this.consultarAtendimentosForaCompetencia();
  }

  consultarAtendimentosForaCompetencia() {
    this.isLoadingAnotherPeriod = true;

    this.serviceExportacaoCIHA
      .getListAtendimentoOutraCompetencia(
        this.paramsAnotherPeriod,
        this.currentPageAnotherPeriod
      )
      .subscribe({
        next: (response) => {
          this.itemsAnotherPeriod = [
            ...this.itemsAnotherPeriod,
            ...response.items,
          ];
          this.showMoreDisabledAnotherPeriod = !response.hasNext;
        },
        error: () => {
          this.isLoadingAnotherPeriod = false;
        },
        complete: () => {
          this.isLoadingAnotherPeriod = false;
          this.currentPageAnotherPeriod++;
        },
      });
  }

  validaParametrosForaCompetencia(
    params: ExportCIHAParametrosForaCompetencia
  ): boolean {
    return params.finalDate !== undefined && params.initialDate !== undefined;
  }

  private validaItems(): boolean {
    return this.items.length > 0;
  }

  private existePendencia(): boolean {
    if (this.items.length > 0)
      return !!this.items.find(
        (item) => item.notificationRegister.block == 'S'
      );

    return false;
  }

  private validaParametros(parametros: ExportCIHAParametros): boolean {
    return (
      !!parametros &&
      !!parametros.codColigada &&
      !!parametros.codUnidadeFaturamento &&
      !!parametros.competencia &&
      !!parametros.statusCIHA
    );
  }

  possuiPendencias(row: any, index: number) {
    return row.notificationRegister.block === 'S';
  }

  private validaItensSelecionados(itensSelecionados: Array<any>): boolean {
    return itensSelecionados.length > 0;
  }

  obterProcessOptions(status: any) {
    this.actionsPage = [
      {
        icon: 'po-icon-news',
        label: 'Exportação CIHA',
        action: (ev: any) => {
          this.ExportCIHA();
        },
        disabled: status === 'N',
      },
      {
        icon: 'po-icon-news',
        label: this.literals.label.liberar,
        action: () => {
          this.Liberar();
        },
        disabled: status === 'L',
      },
      {
        icon: 'po-icon-news',
        label: this.literals.label.naoLiberar,
        action: () => {
          this.NaoLiberar();
        },
        disabled: status === 'N',
      },
      {
        icon: 'po-icon-news',
        label: this.literals.label.incluirAtendimentoForaCompetencia,
        action: () => {
          this.pageSlide.open();
        },
      },
    ];
  }

  preencherParametros(parametros: ExportCIHAParametros) {
    this.currentParams = parametros;
  }

  adicionarAtendimentoOutraCmpetencia(item: { [key: string]: any }) {
    this.isLoadingAnotherPeriod = true;

    this.serviceExportacaoCIHA.alterarCompetencia(item).subscribe({
      next: () => {
        this.poNotification.success(this.literals.mensagens.processoSucesso);
      },
      error: () => {
        this.isLoadingAnotherPeriod = false;
        this.showMoreDisabledAnotherPeriod = false;
      },
      complete: () => {
        this.isLoadingAnotherPeriod = false;
        this.showMoreDisabled = false;
        this.executarFiltroOutraCompetencia();
      },
    });
  }

  columns: PoTableColumn[] = [
    {
      label: this.literals.label.dados,
      property: 'notificationRegister.block',
      type: 'label',
      labels: [
        {
          value: 'N',
          label: this.literals.label.completos,
          tooltip: '',
          type: ngComponents.PoTagType.Success,
          icon: 'po-icon-arrow-down',
        },
        {
          value: 'S',
          label: this.literals.label.incompletos,
          type: ngComponents.PoTagType.Warning,
          icon: 'po-icon-close',
        },
      ],
    },

    { label: this.literals.label.codigoPaciente, property: 'patientId' },
    { label: this.literals.label.paciente, property: 'patientName' },
    { label: this.literals.label.prontuario, property: 'medicalRecord' },
    { label: this.literals.label.atendimento, property: 'attendanceId' },
    { label: this.literals.label.convenio, property: 'insurance' },
    { label: this.literals.label.tipoAtendimento, property: 'papientType' },
  ];

  columnsAnotherPeriod: PoTableColumn[] = [
    { label: this.literals.label.paciente, property: 'patientName' },
    { label: this.literals.label.atendimento, property: 'attendanceId' },
    { label: this.literals.label.convenio, property: 'insurance' },
    { label: this.literals.label.prontuario, property: 'medicalRecord' },
  ];

  actionsTableAnotherPeriod: Array<PoTableAction> = [
    {
      action: this.adicionarAtendimentoOutraCmpetencia.bind(this),
      icon: 'po-icon-plus-circle',
      label: '',
    },
  ];
}
