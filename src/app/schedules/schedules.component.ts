import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Trade, SCHEDULES, DAILYPOSITIONS, DAILYPOSITIONSplate, DAILYPOSITIONScorporate } from './schedules.data'
import { KeycloakService } from '@internal-apps/hsdg-front-lib';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SchedulesComponent implements OnInit {

  scheduleDataSource = SCHEDULES;
  scheduleColumnsToDisplay = ['name'];
  scheduleExpandedElement: Trade | null;
  userRoles: string[];
  showInfoBrasil;

  dailyPositionDataSource;

  constructor() { }

  ngOnInit() {
    this.getRoles();
    this.dailyPositionCondition();
  }

  dailyPositionCondition() {
    if (this.showInfoBrasil === true) {
      this.dailyPositionDataSource = DAILYPOSITIONS;
    }
    if (this.showInfoBrasil === false) {
      this.dailyPositionDataSource = DAILYPOSITIONSplate;
    }
    if (this.userRoles.includes('ALL_ACCESS_COUNTRY')) {
      this.dailyPositionDataSource = DAILYPOSITIONScorporate;
    }
  }

  getRoles() {
    try {
      this.userRoles =
        KeycloakService.auth.authz.tokenParsed.resource_access[
          "booking-creation-guide"
        ].roles;
    } catch (e) { }

    if (this.userRoles.includes('BRASIL')) {
      this.showInfoBrasil = true;
    }

    if (this.userRoles.includes('PLATE')) {
      this.showInfoBrasil = false;
    }
  }

}


