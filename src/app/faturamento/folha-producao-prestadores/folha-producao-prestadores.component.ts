import { ChaveComposta } from './../../shared/model/chave-composta.model';
import { ConfigService } from 'src/app/core/config/config.service';
import { TipoUnidade } from '../../shared/combos/unidade-faturamento-combo/model/tipo-unidade.enum';
import { TipoExibicaoMedico } from './model/tipo-exibicao-medico.enum';
import { TipoOrdenacao } from './model/tipo-ordenacao.enum';
import { TipoLancamento } from './model/tipo-lancamentos.enum';
import { folhaProducaoPrestadoresPt } from './I18n/folha-producao-prestadores-pt';
import {
  Component,
  ViewChild,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';
import {
  PoNotificationService,
  PoPageAction,
  PoRadioGroupOption,
  PoWidgetComponent,
} from '@po-ui/ng-components';
import { ParameterSheetProductionPractitionerDto } from './model/parametros-folha-producao-prestadores.model';
import { IRangerDate } from 'src/app/shared/model/ranger-date.interface';
import { PrestadorGrupoComboComponent } from 'src/app/shared/combos/prestador-grupo-combo/prestador-grupo-combo.component';
import { PrestadorService } from 'src/app/shared/services/prestador.service';
import { Practitioner } from 'src/app/shared/model/practitioner.model';
import { FolhaProducaoPrestadoresService } from './folha-producao-prestadores.service';

@Component({
  selector: 'sau-folha-producao-prestadores',
  templateUrl: './folha-producao-prestadores.component.html',
  styleUrls: ['./folha-producao-prestadores.component.css'],
})
export class FolhaProducaoPrestadoresComponent
  implements AfterViewChecked, AfterViewInit
{
  constructor(
    private prestadorServico: PrestadorService,
    private configService: ConfigService,
    private serviceFolhaProducao: FolhaProducaoPrestadoresService,
    private serviceNotificacao: PoNotificationService
  ) {}
  ngAfterViewInit(): void {
    this.parametros.insuranceId = 0;
    this.parametros.doctorDisplay = 0;
    this.parametros.launchType = 0;
    this.parametros.sorting = 0;
  }
  @ViewChild('widgetPeriodo', { static: true })
  widgetPeriodo!: PoWidgetComponent;

  @ViewChild(PrestadorGrupoComboComponent, { static: true })
  prestadorGrupoComboComponent!: PrestadorGrupoComboComponent;

  literals = folhaProducaoPrestadoresPt;
  tipoUnidade: TipoUnidade = TipoUnidade.Atendimento;
  tamanhoWidget!: number;
  tipoLancamento = TipoLancamento.TodosLancamentos;
  somenteRecebido = false;
  somenteAReceber = false;
  todosLancamentos = false;
  desabilitaNumeroRemessa = 'true';
  prestadorOuGrupo: Practitioner = new Practitioner();
  desabilitaPrestadoresGrupo: boolean = true;

  parametros = new ParameterSheetProductionPractitionerDto();

  ngAfterViewChecked(): void {
    this.tamanhoWidget = this.widgetPeriodo.height;
  }

  alterarTipoLancamento(tipoLancamento: TipoLancamento) {
    this.parametros.launchType = tipoLancamento;
    this.somenteRecebido = tipoLancamento === TipoLancamento.SomenteRecebido;
    this.somenteAReceber = tipoLancamento === TipoLancamento.SomenteReceber;
    this.todosLancamentos = tipoLancamento === TipoLancamento.TodosLancamentos;

    if (this.somenteRecebido) {
      this.parametros.onlyForecastPeriod = false;
      this.parametros.forecastPeriod = this.limparCampoPeriodoData();
    }

    if (this.somenteAReceber || this.todosLancamentos)
      this.parametros.receiptPeriod = this.limparCampoPeriodoData();
  }

  alterarConvenio(convenio: number): void {
    this.parametros.insuranceId = convenio;
    if (!!convenio) this.desabilitaNumeroRemessa = 'false';
    else this.desabilitaNumeroRemessa = 'true';
  }

  alterarPrestador(prestadorOuGrupo: number): void {
    this.desabilitaPrestadoresGrupo = true;
    this.parametros.practitioner = 0;
    this.parametros.group = 0;
    this.parametros.practitionerGroup = 0;
    this.acoesPagina[0].disabled = true;

    if (!!prestadorOuGrupo) {
      const chavePrestador = ChaveComposta.obterChaveComposta(
        new Map<string, any>([
          ['CompanyId', this.configService.companyId],
          ['PractitionerId', prestadorOuGrupo],
        ])
      );

      this.prestadorServico.obterPrestador(chavePrestador).subscribe({
        next: (response) => {
          this.prestadorOuGrupo = response;
          if (this.prestadorOuGrupo.groupId > 0) {
            this.parametros.group = prestadorOuGrupo;
            this.desabilitaPrestadoresGrupo = false;
          } else {
            this.parametros.practitioner = prestadorOuGrupo;
            this.desabilitaPrestadoresGrupo = true;
          }
        },
        complete: () => {
          this.acoesPagina[0].disabled = false;
        },
      });
    }

    this.prestadorGrupoComboComponent.reset();
  }

  private limparCampoPeriodoData(): IRangerDate {
    return { start: '', end: '' };
  }

  tiposLancamentos: Array<PoRadioGroupOption> = [
    {
      label: this.literals.grupo.lancamento.label.todosLancamentos,
      value: TipoLancamento.TodosLancamentos,
    },
    {
      label: this.literals.grupo.lancamento.label.somenteRecebidos,
      value: TipoLancamento.SomenteRecebido,
    },
    {
      label: this.literals.grupo.lancamento.label.somenteAReceber,
      value: TipoLancamento.SomenteReceber,
    },
  ];

  ordenacao: Array<PoRadioGroupOption> = [
    {
      label: this.literals.grupo.ordenacao.label.data,
      value: TipoOrdenacao.Data,
    },
    {
      label: this.literals.grupo.ordenacao.label.nomePaciente,
      value: TipoOrdenacao.NomePaciente,
    },
  ];

  exibicaoMedico: Array<PoRadioGroupOption> = [
    {
      label: this.literals.grupo.exibicaoMedico.label.medicoExecutante,
      value: TipoExibicaoMedico.Executante,
    },
    {
      label: this.literals.grupo.exibicaoMedico.label.medicoRepasse,
      value: TipoExibicaoMedico.Repasse,
    },
  ];

  acoesPagina: Array<PoPageAction> = [
    {
      label: this.literals.botoes.visualizar,
      action: () => {
        this.serviceFolhaProducao
          .gerarFolhaProducaoPrestador(this.parametros)
          .subscribe({
            next: () => {
              this.serviceNotificacao.success(this.literals.mensagens.sucesso);
            },
          });
      },
    },
  ];
}
