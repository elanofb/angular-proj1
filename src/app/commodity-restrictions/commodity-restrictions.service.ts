import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommodityRestriction } from './commodity-restriction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommodityRestrictionsService {

  constructor(
    private http: HttpClient
  ) { }

  private endpoint = environment.commodityRestricionDns + '/api/restriction';

  public getRestrictions(sort: string, order: string, page: number, size:number) {
    const requestUrl =
        `${this.endpoint}?sort=${sort},${order}&page=${page}&size=${size}`;
    return this.http.get<CommodityRestriction[]>(requestUrl);
  }

  public getRestrictionsByCommodityContaining(name: string) {
    const requestUrl =
        `${this.endpoint}/search/findByCommodityContaining?commodity=${name}`;
    return this.http.get<CommodityRestriction[]>(requestUrl);
  }

  public addRestriction(restriction: CommodityRestriction): Observable<any> {
    return this.http.post(this.endpoint, restriction);
  }

  public updateRestriction(restriction: CommodityRestriction): Observable<any> {
    return this.http.patch(restriction._links.self.href, restriction);
  }

  public deleteRestriction(restriction: CommodityRestriction): Observable<any> {
    return this.http.delete(restriction._links.self.href);
  }


}
