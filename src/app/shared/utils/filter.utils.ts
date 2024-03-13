import { HttpParams, HttpRequest } from '@angular/common/http';
import { Filter, FilterStorage } from '../filter.storage';
import { UriBaseKey } from '../uri-base-key';

/**
 * Aprimore o HttpRequest fornecido adicionando um filtro aos seus parâmetros.
 *
 * @param request - A solicitação HTTP original.
 * @param filterCode – A string do filtro a ser concatenada aos filtros existentes.
 * @param endpoint – O novo URL do endpoint a ser definido para a solicitação.
 * @returns Uma nova instância de HttpRequest com os parâmetros e endpoint atualizados.
 */
export function addFilterToRequest(
  request: HttpRequest<any>,
  filterCode: string,
  endpoint: string
): HttpRequest<any> {
  let params = request.params ?? new HttpParams();
  params = params.delete('filter');
  const currentFilter = params.get('$filter');

  if (currentFilter && filterCode) {
    filterCode = `${filterCode} and ${currentFilter}`;
  } else if (!filterCode && currentFilter) {
    filterCode = currentFilter;
  }

  params = params.set('$filter', filterCode ?? '');

  return request.clone({
    url: endpoint,
    params: params,
  });
}

export function removeHostname(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

export function setHeader(
  request: HttpRequest<any>,
  param: string,
  value: string
): HttpRequest<any> {
  return request.clone({ headers: request.headers.set(param, value) });
}

/**
 * Recupera o valor enum correspondente de UriBaseKey para uma determinada string.
 *
 * @param value – A string para a qual encontrar o valor enum associado.
 * @returns O valor enum UriBaseKey ou UriBaseKey.Nenhum se não for encontrado.
 */

export function getFilter(filterStorage: FilterStorage): Filter | undefined {
  return filterStorage?.filters[0];
}
