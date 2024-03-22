import { TipoExibicaoMedico } from './tipo-exibicao-medico.enum';
import { IRangerDate } from 'src/app/shared/model/ranger-date.interface';
import { TipoLancamento } from './tipo-lancamentos.enum';
import { TipoOrdenacao } from './tipo-ordenacao.enum';
export class ParametrosFolhaProducaoPrestadores {
  tipoLancamento!: TipoLancamento;
  somentePeriodoPrevisto!: boolean;
  periodoPrevisao!: IRangerDate;
  periodoRecebimento!: IRangerDate;
  periodoLancamento!: IRangerDate;
  prestador!: number;
  grupoPrestador!: number;
  prestadorDoGrupo!: number;
  incluiProcedimentosGruposPrestadores!: boolean;
  unidadeAtendimento!: string;
  convenio!: number;
  numeroRemessa!: string;
  exibicaoMedico!: TipoExibicaoMedico;
  ordenacao!: TipoOrdenacao;
}
