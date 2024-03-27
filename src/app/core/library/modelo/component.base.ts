import { Injectable } from '@angular/core';
import { ComponentInterface } from './component.interface';
import { ConfigService } from '../../config/config.service';
import { LibUtils } from 'src/app/shared/utils/lib.utils';

@Injectable()
export abstract class ComponentBase implements ComponentInterface {
  constructor(public config: ConfigService, public libUtils: LibUtils) {}

  private _serviceApi: string = '';
  private _schemaApi: string = '';

  public set serviceApi(service: string) {
    this._serviceApi = this.libUtils.concatRoute(
      this.config.fullApiUrl,
      service
    );
  }

  public set schemaApi(schema: string) {
    this._schemaApi = this.libUtils.concatRoute(this.config.fullApiUrl, schema);
  }

  public get serviceApi() {
    return this._serviceApi;
  }

  public get schemaApi() {
    return this._schemaApi;
  }
}
