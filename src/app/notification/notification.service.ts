import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { FiltersService } from "../data-sources/filters.service";
import { Filter } from "../core/default-table/filter.interface";
import { HttpClient, HttpParams } from "@angular/common/http";

const API_URL = environment.notificationDns + "/api/notifications/";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(
    private http: HttpClient,
    private filtersService: FiltersService
  ) {}

  delete(id: number) {
    const url = API_URL + id;

    return this.http.delete(url);
  }

  post(result) {
    const url = API_URL + "save";

    return this.http.post(url, result);
  }

  find(
    page: number = 0,
    size: number = 5,
    sort = "",
    direction = "",
    filters: Filter[]
  ) {
    const url = API_URL + "list-by-filters";
    console.log(page)
    console.log(size)
    console.log(sort)
    console.log(direction)
    let params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString())
      .set("sort", sort + "," + direction);

    filters.forEach(
      filter => (params = params.set(filter.fieldName, filter.value))
    );
    return this.http.get(url, { params });

  }

  getPolList() {
    const url = API_URL + "search/findAllPol";
    return this.http.get(url);
  }

  getPodList() {
    const url = API_URL + "search/findAllPod";
    return this.http.get(url);
  }

  getTradeList() {
    const url = API_URL + "search/findAllTrades";
    return this.http.get(url);
  }

  filterNotifications(
    page: number = 0,
    size: number = 5,
    sort = "",
    direction = "",
    filters: Filter[]
  ) {
    const url = API_URL + "findByCountryDataAndAnyPolOrPodOrServiceCenterOrTrade";

    let params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString());

    filters.forEach(filter => {
      //if (filter.value && filter.value.length) {
        params = params.set(filter.fieldName, filter.value);
      //}
    });
    console.log(filters)

    return this.http.get(url, { params });
  }

}
