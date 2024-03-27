import { TipoExibicaoMedico } from './tipo-exibicao-medico.enum';
import { IRangerDate } from 'src/app/shared/model/ranger-date.interface';
import { TipoLancamento } from './tipo-lancamentos.enum';
import { TipoOrdenacao } from './tipo-ordenacao.enum';
export class ParameterSheetProductionPractitionerDto {
  launchType!: TipoLancamento;
  onlyForecastPeriod!: boolean;
  forecastPeriod!: IRangerDate;
  receiptPeriod!: IRangerDate;
  launchPeriod!: IRangerDate;
  practitioner!: number;
  group!: number;
  practitionerGroup!: number;
  includeProcedurePractitionerGroups!: boolean;
  unitAttendance!: number;
  insuranceId!: number;
  dispatchNumber!: string;
  doctorDisplay!: TipoExibicaoMedico;
  sorting!: TipoOrdenacao;
}
