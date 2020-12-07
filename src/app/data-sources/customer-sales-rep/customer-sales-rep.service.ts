import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltersService } from '../filters.service';
import { DataSourceServiceTemplate } from '../data-source-template/data-source-service-template.interface';

const API_URL = environment.customerSalesRepDns + "/api/customer-sales-rep/";

@Injectable({
  providedIn: 'root'
})
export class CustomerSalesRepService implements DataSourceServiceTemplate {

  constructor(private http: HttpClient, private filtersService: FiltersService) { }

  find(page: number = 0, size: number = 5, sort = '', direction = '') {
    const url = API_URL + 'search/findByCustomerNameContainingOrderByAccountOrder';

    const params = new HttpParams().set('size', size.toString())
                                   .set('page', page.toString())
                                   .set('sort', sort + "," + direction)
                                   .set('customerName', this.filtersService.customer.toUpperCase());

    return this.http.get(url, {params});
  }

  getLastProcessDate(): any {
    const url = API_URL + 'search/getLastProcessDate';

    return this.http.get(url);
  }

  hasMandatoryFilters() {
    return this.filtersService.customer !== '';
  }

}
