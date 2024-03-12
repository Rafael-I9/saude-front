import { Injectable } from '@angular/core';
import { AppConfig } from './config.model';
import { TErpContextAcessorService } from '@totvs/common-api';
import { LibService } from '../lib/lib.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService implements AppConfig {
  public companyId: number = 0;
  public userCode: string = '';
  public branchId: number = 0;
  public fiscalYear: number = 0;
  public systemDate: Date = new Date;
  public baseUrl: string = '';
  public apiUrl: string = '';
  public fullApiUrl: string = '';
  public useFirstExecution: boolean = false;

  public defaultBaseUrl = 'http://localhost:8051';
  public defaultApiModule = 'hcg';
  public defaultApiVersion = 'v1';

  constructor(private context: TErpContextAcessorService, private libService: LibService) {
    if (this.setConfigByContext())
      return;

    if (this.setConfigByFile())
      return;

    this.setConfigDefault();
  }  

  public getApiUrl(module: string = this.defaultApiModule) {
    return this.privateGetApiUrl(this.baseUrl, module);
  }

  public getFullApiUrl(module: string = this.defaultApiModule, version: string = this.defaultApiVersion) {
    return this.privateGetFullApiUrl(this.baseUrl, module, version);
  }

  private privateGetApiUrl(baseUrl: string, module: string) {
    return this.libService.concatRoute(baseUrl, 'api', module);
  }

  private privateGetFullApiUrl(baseUrl: string, module: string, version: string) {
    return this.libService.concatRoute(this.privateGetApiUrl(baseUrl, module), version);
  }

  private getConfigDefault():AppConfig {
    const baseUrl = this.defaultBaseUrl;
    const apiUrl = this.privateGetApiUrl(baseUrl, this.defaultApiModule);
    const fullApiUrl = this.privateGetFullApiUrl(baseUrl, this.defaultApiModule, this.defaultApiVersion);

    return {
      companyId: 1,
      userCode: '',
      branchId: 0,
      fiscalYear: 0,
      systemDate: new Date,
      baseUrl: baseUrl,
      apiUrl: apiUrl,
      fullApiUrl: fullApiUrl,
      useFirstExecution: false
    }
  }

  private setConfigDefault(): void {
    const config = this.getConfigDefault();

    this.companyId = config.companyId;
    this.userCode = config.userCode;
    this.branchId = config.branchId;
    this.fiscalYear = config.fiscalYear;
    this.systemDate = config.systemDate;
    this.baseUrl = config.baseUrl;
    this.apiUrl = config.apiUrl;
    this.fullApiUrl = config.fullApiUrl;
    this.useFirstExecution = config.useFirstExecution;
  }

  private setConfigByContext(): boolean {  
    const erpContext = this.context.ErpContext as any;
    if (!erpContext || !erpContext.apiConfig)
      return false;

    this.companyId = erpContext.companyId;
    this.userCode = erpContext.userCode;
    this.branchId = erpContext.branchId;
    this.fiscalYear = erpContext.fiscalYear;
    this.systemDate = erpContext.systemDate;
    this.baseUrl = erpContext.apiConfig.api_baseUrl;

    this.completeWithDefaultValues();
    return true;
  }

  private setConfigByFile(): boolean {
    const json = this.libService.loadJsonFile('assets/config.json');

    if (!json)
      return false;

    this.companyId = json.companyId;
    this.baseUrl = json.baseUrl;
    this.apiUrl = json.apiUrl;
    this.fullApiUrl = json.fullApiUrl;
    this.useFirstExecution = json.useFirstExecution;
    
    this.completeWithDefaultValues();
    return true;
  }

  private completeWithDefaultValues() {
    const defaultConfig = this.getConfigDefault();

    this.companyId         = this.companyId         || defaultConfig.companyId;
    this.userCode          = this.userCode          || defaultConfig.userCode;
    this.branchId          = this.branchId          || defaultConfig.branchId;
    this.fiscalYear        = this.fiscalYear        || defaultConfig.fiscalYear;
    this.systemDate        = this.systemDate        || defaultConfig.systemDate;    
    this.baseUrl           = this.baseUrl           || defaultConfig.baseUrl;
    this.useFirstExecution = this.useFirstExecution || defaultConfig.useFirstExecution;
    this.apiUrl            = this.apiUrl            || this.privateGetApiUrl(this.baseUrl, this.defaultApiModule);
    this.fullApiUrl        = this.fullApiUrl        || this.privateGetFullApiUrl(this.baseUrl, this.defaultApiModule, this.defaultApiVersion);
  }

}
