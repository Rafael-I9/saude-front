/**
 * @description
 *
 * Respostas do getAll (Array)
 */
export class WebApiResponseList<T> {
  constructor() {
    this.total = 0;
    this.hasNext = false;
    this.items = new Array<T>();
  }

  items: Array<T>;
  hasNext: boolean;
  total: number;
  notification?: any;
}
