import { Injectable } from '@angular/core';
import { UriBaseKey } from './uri-base-key';

@Injectable({
  providedIn: 'root',
})
export class FilterStorage {
  filters: Filter[] = [];

  addFilter = (filter: Filter): void => {
    const existingFilter = this.filters.find((f) => f.key === filter.key);
    if (
      existingFilter &&
      !existingFilter?.value?.includes(filter.value || '')
    ) {
      existingFilter.value = filter.value;
    } else {
      this.filters.push(filter);
    }
  };

  clearFilter = (filter: string | undefined): void => {
    const existingFilter = this.filters.find((f) => f.key === filter);
    if (existingFilter) {
      const index = this.filters.indexOf(existingFilter);
      this.filters.splice(index, 1);
    }
  };
}

export class Filter {
  key: string = '';
  value: string | null = '';
}
