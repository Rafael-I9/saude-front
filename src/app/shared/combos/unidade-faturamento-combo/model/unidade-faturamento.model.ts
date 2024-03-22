import { TipoAtendimento } from '../../../enums/tipo-atendimento.enum';
import { ChaveUnidadeAtendimento } from './chave-unidade-faturamento.model';

export class UnidadeFaturamento {
  key!: ChaveUnidadeAtendimento;
  description!: string;
  attendanceType!: TipoAtendimento;
  unidFatura!: string;
}
