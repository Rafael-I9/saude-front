/**
 * @description
 *
 * Web Api query params
 */
export interface WebApiQuery {
  /**
   * Número da páginação
   */
  page: number;

  /**
   * Quantidade por página
   */
  pageSize: number;

  /**
   * Campos para o select
   */
  fields: Array<string>;

  /**
   * Ordenação do select
   */
  order: Array<string>;

  /**
   * Filtros simples
   */
  filters: Map<string, any>;

  /**
   * Filtros complexos (padrão ODATA)
   * Ex: code eq 1
   *     code in (1,6,7)
   * 	   (code eq 1) and contains(name,'portinari')
   */
  filtersComplex: string;

  pathUrl: string;
}
