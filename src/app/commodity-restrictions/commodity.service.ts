import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommodityRestriction, Commodity } from './commodity-restriction';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommodityService {

  constructor(
    private http: HttpClient
  ) { }

  private endpoint = environment.commodityRestricionDns + '/api/commodity';

  public getCommodities(sort: string, order: string, page: number) {
    const requestUrl =
        `${this.endpoint}?sort=${sort},${order}&page=${page}`;
    return this.http.get<Commodity[]>(requestUrl);
  }

  public getCommoditiesContaining(name: string) {
    const requestUrl =
        `${this.endpoint}/search/findByCommodityContaining?commodity=${name}`;
    return this.http.get<Commodity[]>(requestUrl);
  }

}
