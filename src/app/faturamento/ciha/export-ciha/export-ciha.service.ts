import { ExportCIHA } from './model/export-ciha.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/core/web/base.http.service';
import { WebApiResponseList } from 'src/app/core/web/webapi-response.model';
import { ExportCIHAParametros } from './model/export-ciha-parametros.model';
import { WebApiQuery } from 'src/app/core/web/webapi-query.model';
import { ExportCIHAParametrosAtualizaStatus } from './model/export-ciha-parametros-atualizacao-status.model';
import { ExportCIHAParametrosForaCompetencia } from './model/export-ciha-parametros-fora-competencia.model';

@Injectable({
  providedIn: 'root',
})
export class ExportCihaService {
  constructor(private httpService: BaseHttpService) {}

  public getList(
    parametros: ExportCIHAParametros,
    filtro: string | Array<string>,
    currentPage: number
  ): Observable<WebApiResponseList<ExportCIHA>> {
    const objWebApiQuery: WebApiQuery = <WebApiQuery>{
      page: currentPage,
      pageSize: 30,
      filtersComplex: this._getODataFiltersComplex(parametros, filtro),
      pathUrl: 'export-ciha',
    };

    return this.httpService.getAll(objWebApiQuery);
  }

  public getListAtendimentoOutraCompetencia(
    parametros: ExportCIHAParametrosForaCompetencia,
    currentPage: number
  ): Observable<WebApiResponseList<ExportCIHA>> {
    const objWebApiQuery: WebApiQuery = <WebApiQuery>{
      page: currentPage,
      pageSize: 20,
      filtersComplex: this._getODataFiltersOutPeriod(parametros),
      pathUrl: 'export-ciha',
    };

    return this.httpService.getAll(objWebApiQuery);
  }

  public exportarCIHA(
    parametros: ExportCIHAParametros
  ): Observable<WebApiResponseList<any>> {
    const objWebApiQuery: WebApiQuery = <WebApiQuery>{
      filtersComplex: this._getODataFiltersComplex(parametros, ''),
      pathUrl: 'export-ciha/export',
    };
    return this.httpService.post<WebApiResponseList<any>>(
      objWebApiQuery.pathUrl,
      '',
      parametros
    );
  }

  public naoLiberar(parametros: any) {
    return this.atualizaStatusRegistroExportacao(
      parametros,
      'export-ciha/not-release'
    );
  }

  public liberar(parametros: Array<any>) {
    return this.atualizaStatusRegistroExportacao(
      parametros,
      'export-ciha/release'
    );
  }

  public alterarCompetencia(
    parametros: any
  ): Observable<WebApiResponseList<any>> {
    let parametroAtualizaStatus = new ExportCIHAParametrosAtualizaStatus(
      1,
      parametros.attendanceId,
      parametros.patientId
    );

    return this.httpService.post<WebApiResponseList<any>>(
      'export-ciha/change-period',
      '',
      parametroAtualizaStatus
    );
  }

  private atualizaStatusRegistroExportacao(
    parametros: any[],
    controllerName: string
  ): Observable<WebApiResponseList<any>> {
    let parametroAtualizaStatus =
      this.obterParametrosAtualizaStatus(parametros);

    return this.httpService.post<WebApiResponseList<any>>(
      controllerName,
      '',
      parametroAtualizaStatus
    );
  }

  private obterParametrosAtualizaStatus(
    parametros: Array<ExportCIHA>
  ): Array<ExportCIHAParametrosAtualizaStatus> {
    let parametrosExportacao: ExportCIHAParametrosAtualizaStatus[] =
      new Array<ExportCIHAParametrosAtualizaStatus>();

    parametros.forEach((param) =>
      parametrosExportacao.push(
        new ExportCIHAParametrosAtualizaStatus(
          1,
          param.attendanceId,
          param.patientId
        )
      )
    );

    return parametrosExportacao;
  }

  private _getODataFiltersComplex(
    params: ExportCIHAParametros,
    filtro: string | Array<string>
  ): string {
    let complexFilter = ``;

    if (params) {
      complexFilter += `period eq '${params.competencia}'`;
      complexFilter += ` and billingUnit eq ${params.codUnidadeFaturamento}`;
      complexFilter += ` and statusCIHA eq '${params.statusCIHA}'`;
      complexFilter += ` and companyId eq ${params.codColigada}`;
    }

    if (filtro) {
      complexFilter += ` and (contains(patientName, '${filtro}')`;
      complexFilter += ` or patientDoc eq '${filtro}'`;

      if (this.intValidoSql(filtro.toString()))
        complexFilter += ` or patientId eq '${filtro}'`;

      if (this.dataValida(filtro.toString()))
        complexFilter += ` or releasedDate eq '${filtro}'`;

      complexFilter += ')';
    }

    return complexFilter;
  }

  private dataValida(filtro: string): boolean {
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
    return dateRegex.test(filtro);
  }

  private intValidoSql(filtro: any): boolean {
    if (isNaN(filtro)) return false;

    return parseInt(filtro) <= 2147483647;
  }

  private _getODataFiltersOutPeriod(
    filterParams: ExportCIHAParametrosForaCompetencia
  ): string {
    let complexFilter = ``;

    if (filterParams) {
      complexFilter += `releasedDate ge '${filterParams.initialDate}' and releasedDate le '${filterParams.finalDate}'`;

      if (!!filterParams.patientDoc)
        complexFilter += ` and patientDoc eq '${filterParams.patientDoc}' `;

      if (!!filterParams.patientId)
        complexFilter += ` and patientId eq ${filterParams.patientId} `;

      if (!!filterParams.patientName)
        complexFilter += ` and contains(patientName, '${filterParams.patientName}')`;
    }

    return complexFilter;
  }
}
