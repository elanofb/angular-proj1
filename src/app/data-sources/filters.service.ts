import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../core/default-table/filter.interface';

const DEFAULT_WIDTH = 15;

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  filters: Filter[] = [
    { value: '', fieldName: 'customer', placeHolder: 'Customer', width: DEFAULT_WIDTH, tooltip: 'Example: Honda'  },
    { value: '', fieldName: 'pod', placeHolder: 'POD', width: DEFAULT_WIDTH, tooltip: 'Example: DEHAM' },
    { value: '', fieldName: 'agreementNumber', placeHolder: 'Agreement Nº', width: DEFAULT_WIDTH, tooltip: 'Example: AECC8000255' },
    { value: '', fieldName: 'equipment', placeHolder: 'Equipment', width: DEFAULT_WIDTH, tooltip: 'Example: 40RH' }
  ];

  subject = new BehaviorSubject<Filter[]>(this.filters);

  customer: string;
  pod: string;
  agreementNumber: string;
  equipment: string;
  docsysService: string;

  constructor() {
    this.subject.subscribe(
      filters => {
        this.customer = filters.find(filter => filter.fieldName === 'customer').value.toUpperCase();
        this.pod = filters.find(filter => filter.fieldName === 'pod').value.toUpperCase();
        this.agreementNumber = filters.find(filter => filter.fieldName === 'agreementNumber').value.toUpperCase();
        this.equipment = filters.find(filter => filter.fieldName === 'equipment').value.toUpperCase();
      }
    );
  }

  applyFilters(): any {
    this.subject.next(this.filters);
  }

}
