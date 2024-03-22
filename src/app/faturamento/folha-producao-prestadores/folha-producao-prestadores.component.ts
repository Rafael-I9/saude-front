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
  PoPageAction,
  PoRadioGroupOption,
  PoWidgetComponent,
} from '@po-ui/ng-components';
import { ParametrosFolhaProducaoPrestadores } from './model/parametros-folha-producao-prestadores.model';
import { IRangerDate } from 'src/app/shared/model/ranger-date.interface';

@Component({
  selector: 'sau-folha-producao-prestadores',
  templateUrl: './folha-producao-prestadores.component.html',
  styleUrls: ['./folha-producao-prestadores.component.css'],
})
export class FolhaProducaoPrestadoresComponent
  implements AfterViewChecked, AfterViewInit
{
  ngAfterViewInit(): void {
    this.parametros.convenio = 0;
    this.parametros.exibicaoMedico = 0;
    this.parametros.tipoLancamento = 0;
    this.parametros.ordenacao = 0;
  }
  @ViewChild('widgetPeriodo', { static: true })
  widgetPeriodo!: PoWidgetComponent;

  literals = folhaProducaoPrestadoresPt;
  tipoUnidade: TipoUnidade = TipoUnidade.Atendimento;
  tamanhoWidget!: number;
  tipoLancamento = TipoLancamento.TodosLancamentos;
  somenteRecebido = false;
  somenteAReceber = false;
  todosLancamentos = false;
  desabilitaNumeroRemessa = 'true';
  prestadorOuGrupo = 0;

  parametros = new ParametrosFolhaProducaoPrestadores();

  ngAfterViewChecked(): void {
    this.tamanhoWidget = this.widgetPeriodo.height;
  }

  alterarTipoLancamento(tipoLancamento: TipoLancamento) {
    this.parametros.tipoLancamento = tipoLancamento;
    this.somenteRecebido = tipoLancamento === TipoLancamento.SomenteRecebido;
    this.somenteAReceber = tipoLancamento === TipoLancamento.SomenteReceber;
    this.todosLancamentos = tipoLancamento === TipoLancamento.TodosLancamentos;

    if (this.somenteRecebido) {
      this.parametros.somentePeriodoPrevisto = false;
      this.parametros.periodoPrevisao = this.limparCampoPeriodoData();
    }

    if (this.somenteAReceber || this.todosLancamentos)
      this.parametros.periodoRecebimento = this.limparCampoPeriodoData();
  }

  alterarConvenio(convenio: number): void {
    this.parametros.convenio = convenio;
    if (!!convenio) this.desabilitaNumeroRemessa = 'false';
    else this.desabilitaNumeroRemessa = 'true';
  }

  alterarPrestador(prestadorOuGrupo: number): void {
    this.prestadorOuGrupo = prestadorOuGrupo;
    this.parametros.prestadorDoGrupo = 0;
    if (this.prestadorOuGrupo == 1)
      //todo cristo Alterar para identificar se foi selecionado grupo ou prestador
      this.parametros.prestador = prestadorOuGrupo;
    else this.parametros.grupoPrestador = prestadorOuGrupo;
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
        this.parametros = this.parametros;
      },
    },
  ];
}
