import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Filter } from "../core/default-table/filter.interface";
import { NotificationService } from "../notification/notification.service";

@Injectable({
  providedIn: "root"
})
export class HomeNotificationService {
  constructor(private service: NotificationService) {}

  getNotifications(filters: Filter[]): Observable<any> {
    return this.service.filterNotifications(0, 100, " ", " ", filters);
  }

  getPodList(): Observable<any> {
    return this.service.getPodList();
  }

  getPolList(): Observable<any> {
    return this.service.getPolList();
  }

  getTradeList(): Observable<any> {
    return this.service.getTradeList();
  }
}
