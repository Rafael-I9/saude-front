import { NotificacaoRegistro } from './notificacao-registro.model';

export class ExportCIHA {
  patientId!: number;
  medicalRecord!: string;
  attendanceId!: number;
  patientName!: string;
  period!: string;
  statusCIHA!: string;
  insurance!: string;
  papientType!: string;
  notificationRegister!: NotificacaoRegistro;
}
