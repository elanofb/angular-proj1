import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthorizedCustomer } from "../data-sources/authorized-customers/authorized-customers";
import { AuthorizedCustomersService } from "../data-sources/authorized-customers/authorized-customers.service";
import { Crif } from "../data-sources/crif/crif";
import { CrifService } from "../data-sources/crif/crif.service";
import { CustomerSalesRep } from "../data-sources/customer-sales-rep/customer-sales-rep";
import { CustomerSalesRepService } from "../data-sources/customer-sales-rep/customer-sales-rep.service";
import { EmptyPickUp } from "../data-sources/empty-pick-up/empty-pick-up";
import { EmptyPickUpService } from "../data-sources/empty-pick-up/empty-pick-up.service";
import { FiltersService } from "../data-sources/filters.service";
import { FreeTimeDemurrage } from "../data-sources/free-time-demurrage/free-time-demurrage";
import { FreeTimeDemurrageService } from "../data-sources/free-time-demurrage/free-time-demurrage.service";
import { FreeTimeDetention } from "../data-sources/free-time-detention/free-time-detention";
import { FreeTimeDetentionService } from "../data-sources/free-time-detention/free-time-detention.service";
import { Paw } from "../data-sources/paw/paw";
import { PawService } from "../data-sources/paw/paw.service";
import { PdfFretado } from "../data-sources/pdf-fretado/pdf-fretado";
import { PdfFretadoService } from "../data-sources/pdf-fretado/pdf-fretado.service";
import { SpaceProtectionList } from "../data-sources/space-protection-list/space-protection-list";
import { SpaceProtectionListService } from "../data-sources/space-protection-list/space-protection-list.service";
import { SpecialConditionList } from "../data-sources/special-condition-list/special-condition-list";
import { FoodgradeAgreementDatasource } from "../foodgrade-agreement/foodgrade-agreement-data-source";
import { FoodgradeAgreementService } from "../foodgrade-agreement/foodgrade-agreement.service";
import { SpecialConditionListService } from "../data-sources/special-condition-list/special-condition-list.service";
import { SpecialConditionListServicePlate } from "../data-sources/special-condition-list-plate/special-condition-list-plate.service";
import { HomeNotificationService } from "./home-notification.service";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Filter } from "../core/default-table/filter.interface";
import { CookieService } from "ngx-cookie-service";
import { NotificationType } from "./types/notification.interface";
import { AlertService, KeycloakService } from "@internal-apps/hsdg-front-lib";
import { DatePipe } from "@angular/common";
import { MatMenuTrigger } from "@angular/material/menu";
import { SpecialConditionListPlate } from '../data-sources/special-condition-list-plate/special-condition-list-plate';
import { ExceptionListDnd } from '../data-sources/exception-list-dnd/exeption-list-dnd';
import { ExceptionListDndService } from '../data-sources/exception-list-dnd/exception-list-dnd.service';
import { ExceptionListChargesInvoicing } from '../data-sources/exception-list-charges-invoing/exeption-list-charges-invoicing';
import { ExceptionListChargesInvoicingService } from '../data-sources/exception-list-charges-invoing/exception-list-charges-invoicing.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @ViewChild("trigger", { static: true }) triggerMenu: MatMenuTrigger;

  dataSources;
  crif;
  ftimeDetention;
  userRoles: string[];
  showCardsCondition: string;

  notificationFilterForm: FormGroup;
  filterNotificationArray: Filter[] = [];

  notifications = [];
  polList = [];
  podList = [];
  tradeList = [];

  inCleanState = true;
  todayDate = "";

  constructor(
    private formBuilder: FormBuilder,
    public filtersService: FiltersService,
    public freeTimeDetentionService: FreeTimeDetentionService,
    public customerSalesRepService: CustomerSalesRepService,
    public pdfFretadoService: PdfFretadoService,
    public emptyPickUpService: EmptyPickUpService,
    public crifService: CrifService,
    public freeTimeDemurrageService: FreeTimeDemurrageService,
    public authorizedCustomersService: AuthorizedCustomersService,
    public spaceProtectionListService: SpaceProtectionListService,
    public pawService: PawService,
    public foodgradeAgreementService: FoodgradeAgreementService,
    public specialConditionListService: SpecialConditionListService,
    public specialConditionListServicePlate: SpecialConditionListServicePlate,
    private notificationService: HomeNotificationService,
    private exceptionListDndService: ExceptionListDndService,
    private exceptionListChargesInvoicingService: ExceptionListChargesInvoicingService,
    private cookieService: CookieService,
    private alert: AlertService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.showCards();
    const date = new Date();
    this.todayDate = this.datePipe.transform(date, "dd/MM/yyyy").split(" ")[0];

    this.clearFilters();
    this.initializeDataSources();
    this.initializeNotifications();
  }

  initializeDataSources() {
    //Brasil
    if (this.showCardsCondition == 'BRASIL') {
      this.dataSources = [
        new ExceptionListChargesInvoicing(this.exceptionListChargesInvoicingService),
        new ExceptionListDnd(this.exceptionListDndService),
        new CustomerSalesRep(this.customerSalesRepService),
        new PdfFretado(this.pdfFretadoService),
        new EmptyPickUp(this.emptyPickUpService),
        new FreeTimeDemurrage(this.freeTimeDemurrageService),
        new AuthorizedCustomer(this.authorizedCustomersService),
        new SpaceProtectionList(this.spaceProtectionListService),
        new Paw(this.pawService),
        new FoodgradeAgreementDatasource(this.foodgradeAgreementService),
        new SpecialConditionListPlate(this.specialConditionListService)
      ];

    }
    //Plate
    if (this.showCardsCondition == 'PLATE') {
      this.dataSources = [
        new ExceptionListChargesInvoicing(this.exceptionListChargesInvoicingService),
        new ExceptionListDnd(this.exceptionListDndService),
        new CustomerSalesRep(this.customerSalesRepService),
        new FreeTimeDemurrage(this.freeTimeDemurrageService),
        new AuthorizedCustomer(this.authorizedCustomersService),
        new SpaceProtectionList(this.spaceProtectionListService),
        new Paw(this.pawService),
        new SpecialConditionListPlate(this.specialConditionListService)
      ];
    }

    if (this.showCardsCondition == 'ALL_ACCESS_COUNTRY') {
      this.dataSources = [
        new ExceptionListChargesInvoicing(this.exceptionListChargesInvoicingService),
        new ExceptionListDnd(this.exceptionListDndService),
        new CustomerSalesRep(this.customerSalesRepService),
        new PdfFretado(this.pdfFretadoService),
        new EmptyPickUp(this.emptyPickUpService),
        new FreeTimeDemurrage(this.freeTimeDemurrageService),
        new AuthorizedCustomer(this.authorizedCustomersService),
        new SpaceProtectionList(this.spaceProtectionListService),
        new Paw(this.pawService),
        new FoodgradeAgreementDatasource(this.foodgradeAgreementService),
        new SpecialConditionListPlate(this.specialConditionListService)
      ];
    }


    this.crif = new Crif(this.crifService);
    this.ftimeDetention = new FreeTimeDetention(this.freeTimeDetentionService);
  }

  initializeNotifications() {
    this.fillNotificationsFormFilter();

    if (this.cookieService.get("notificationFilter")) {
      const cachedFilter: NotificationType = JSON.parse(
        this.cookieService.get("notificationFilter")
      );
      this.createNotificationForm(
        cachedFilter.serviceCenter,
        cachedFilter.pol,
        cachedFilter.pod,
        cachedFilter.trade
      );
    } else {
      this.createNotificationForm("", null, null, null);
    }

    this.applyNotificationFilters();
  }

  createNotificationForm(serviceCenter, pol, pod, trade) {
    this.notificationFilterForm = this.formBuilder.group({
      serviceCenter: [serviceCenter],
      pol: [pol],
      pod: [pod],
      trade: [trade]
    });
  }

  fillNotificationsFormFilter() {
    this.notificationService.getPolList().subscribe(
      response => {
        this.polList = <any>response;
      },
      err => {
        console.error(err);
      }
    );

    this.notificationService.getPodList().subscribe(
      response => {
        this.podList = <any>response;
      },
      err => {
        console.error(err);
      }
    );

    this.notificationService.getTradeList().subscribe(
      response => {
        this.tradeList = <any>response;
      },
      err => {
        console.error(err);
      }
    );
  }

  applyFilters() {
    this.inCleanState = false;
    this.filtersService.applyFilters();
    this.applyNotificationFilters();
  }

  clearFilters() {
    this.inCleanState = true;
    this.filtersService.filters.forEach(filter => {
      filter.value = "";
    });

    this.filtersService.applyFilters();
  }

  clearNotificationFilter() {
    this.notificationFilterForm.reset();
    this.notificationFilterForm.controls["serviceCenter"].setValue("");
    this.applyNotificationFilters();
  }

  submitNotificationFilter() {
    this.applyNotificationFilters();
    this.triggerMenu.closeMenu();
  }

  applyNotificationFilters() {
    this.notifications = [];
    this.filterNotificationArray = [];
    const obj = this.notificationFilterForm.getRawValue() as NotificationType;
    // tslint:disable-next-line: forin
    for (const itm in obj) {
      this.filterNotificationArray.push({
        value: obj[itm],
        fieldName: itm,
        placeHolder: "",
        width: 0
      });
    }
    this.cookieService.set("notificationFilter", JSON.stringify(obj));
    this.notificationService
      .getNotifications(this.filterNotificationArray)
      .subscribe(
        response => {
          this.notifications = (<any>response)["content"];
        },
        error => {
          console.error("Error on get notifications", error);
          this.alert.print("Error on get notifications");
        }
      );
  }

  showCards() {
    try {
      this.userRoles =
        KeycloakService.auth.authz.tokenParsed.resource_access[
          "booking-creation-guide"
        ].roles;
    } catch (e) { }

    if (this.userRoles.includes('BRASIL')) {
      this.showCardsCondition = 'BRASIL';
    }

    if (this.userRoles.includes('PLATE')) {
      this.showCardsCondition = 'PLATE';
    }

    if (this.userRoles.includes('ALL_ACCESS_COUNTRY')) {
      this.showCardsCondition = 'ALL_ACCESS_COUNTRY';
    }
  }

}
