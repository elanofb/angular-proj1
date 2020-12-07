import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { FiltersService } from "../filters.service";
import { DataSourceServiceTemplate } from "../data-source-template/data-source-service-template.interface";
import { tap } from "rxjs/operators";

const API_URL = environment.pdfFretadoDns + "/api/booking-fretado/";

@Injectable({
  providedIn: "root"
})
export class PdfFretadoService implements DataSourceServiceTemplate {
  constructor(
    private http: HttpClient,
    private filtersService: FiltersService
  ) {}

  find(page: number = 0, size: number = 5, sort = "", direction = "") {
    const url = API_URL + "search/findByCustomerContaining";

    const params = new HttpParams()
      .set("size", size.toString())
      .set("page", page.toString())
      .set("sort", sort + "," + direction)
      .set("customer", this.filtersService.customer.toUpperCase());

    return this.http.get(url, { params }).pipe(
      tap(data => {
        for (const bookingFretado of (<any>data)._embedded["booking-fretado"]) {
          bookingFretado.authorized = "Yes";
        }

        return data;
      })
    );
  }

  getLastProcessDate(): any {
    const url = API_URL + "search/getLastProcessDate";

    return this.http.get(url);
  }

  hasMandatoryFilters() {
    return this.filtersService.customer !== "";
  }
}
