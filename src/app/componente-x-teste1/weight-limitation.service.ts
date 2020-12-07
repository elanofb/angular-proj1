import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { environment } from "src/environments/environment";
import { Filter } from "../core/default-table/filter.interface";
import { FiltersService } from "../data-sources/filters.service";
import { tap } from "rxjs/operators";

const API_URL =
  environment.weightLimitationsDns + "/api/";

@Injectable({
  providedIn: "root"
})
export class WeightLimitationService {
  constructor(
    private http: HttpClient,
    private filtersService: FiltersService
  ) { }

  delete(id: number) {
    const url = API_URL + "weight-limitation/"+ id;

    return this.http.delete(url);
  }

  post(result) {
    const url = API_URL + "weight-limitation";

    return this.http.post(url, result);
  }

  findUsingFilters(
    page: number = 0,
    size: number = 5,
    sort = "",
    direction = "",
    filters: Filter[]
  ) {
    const url = API_URL + "weight-limitation/search/findByFilters";

    let params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString())
      .set("sort", sort + "," + direction);
    filters.forEach(
      filter => (params = params.set(filter.fieldName, filter.value))
    );

    return this.http.get(url, { params });
  }

  find(page: number = 0, size: number = 5, sort = "", direction = "") {
    const url = API_URL + "weight-limitation";

    const params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString())
      .set("sort", sort + "," + direction);

    return this.http.get(url, { params });
  }

  getLastProcessDate(): any {
    return of({});
  }

  hasMandatoryFilters() {
    return this.filtersService.customer !== "";
  }
}
