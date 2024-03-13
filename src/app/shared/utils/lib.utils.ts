import { Injectable } from '@angular/core';
import { PoI18nService } from "@po-ui/ng-components";

@Injectable({
  providedIn: 'root',
})
export class LibUtils {
  constructor(private poI18nService: PoI18nService) { }

  public defaultApiMimeType: string = 'application/json';
  private localeLanguage: string = '';
  private localeJson: any;

  public addSeparator(value: string): string {
    return value + (value.endsWith('/') ? '' : '/');
  }

  public concatRoute(...args: string[]): string {
    let result = '';

    args.forEach((item) => {
      result += this.addSeparator(item);
    });
    
    return result;
  }

  public loadTextFile(filePath: string, mimeType: string) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', filePath, false);

    if (mimeType != null && xmlhttp.overrideMimeType)
      xmlhttp.overrideMimeType(mimeType);

    xmlhttp.send();

    if (xmlhttp.status === 200)
      return xmlhttp.responseText;

    return null;
  }
  
  public loadJsonFile(filePath: string, mimeType: string = this.defaultApiMimeType) {
    try {
      const json = this.loadTextFile(filePath, mimeType);

      if (!json)
        return null;

      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  public getResource(module:string=''): any {
    if (!this.localeLanguage)
      this.localeLanguage = this.poI18nService.getLanguage();

    if (!this.localeJson) {
      this.localeJson = this.loadJsonFile(`assets/locale/resources-${this.localeLanguage}.json`);
    
      if (!this.localeJson)
        this.localeJson = this.loadJsonFile('assets/locale/resources-pt-br.json');
    }

    if (module)
      return this.localeJson[module];

    return this.localeJson;
  }

  public getResourceValue(...args:string[]): string {
    if (!args)
      return '';

    const res = this.getResource();
    if (!res)
      return '';

    let value = res;

    args.forEach((item) => {
      value = value[item];
    });
    
    return value;
  }
}