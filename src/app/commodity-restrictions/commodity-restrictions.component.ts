import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { merge, Subject, of, Observable } from "rxjs";
import {
  catchError,
  map,
  startWith,
  switchMap,
  debounceTime
} from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { CommodityRestrictionsService } from "./commodity-restrictions.service";
import { CommodityRestriction, Commodity } from "./commodity-restriction";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { CommodityService } from "./commodity.service";
import { KeycloakService } from '@internal-apps/hsdg-front-lib';

export interface NewRestrictionDialogData {
  restriction: CommodityRestriction;
  editMode: boolean;
}

@Component({
  selector: "app-commodity-restrictions",
  templateUrl: "./commodity-restrictions.component.html",
  styleUrls: ["./commodity-restrictions.component.css"]
})
export class CommodityRestrictionsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  tableColumnsToDisplay: string[] = ["commodity", "remarks"];
  commodityRestrictions: CommodityRestriction[] = [];
  userRoles: string[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  dataSourceFilterDebounce = new Subject<string>();
  errorLoadingResults = false;
  restrictionFilterText = null;
  shouldShowNewButton = false;

  constructor(
    private service: CommodityRestrictionsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.showItemsByRoles();

    this.getRestrictions();

    this.dataSourceFilterDebounce.pipe(debounceTime(250)).subscribe(() => {
      this.getRestrictions();
    });
  }

  showItemsByRoles() {
    try {
      this.userRoles =
        KeycloakService.auth.authz.tokenParsed.resource_access[
          "booking-creation-guide"
        ].roles;
    } catch (e) {}

    if (this.userRoles.includes('COMMODITY_RESTRICTION_CREATE')) {
      this.shouldShowNewButton = true;
    }

    if (this.userRoles.includes('COMMODITY_RESTRICTION_UPDATE') && this.userRoles.includes('COMMODITY_RESTRICTION_DELETE')) {
      this.tableColumnsToDisplay.push('actions');
    }

  }

  getRestrictions() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          if (this.restrictionFilterText == null) {
            return this.service.getRestrictions(
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginator.pageSize
            );
          }

          return this.service.getRestrictionsByCommodityContaining(
            this.restrictionFilterText
          );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.errorLoadingResults = false;
          if ((<any>data).page != null) {
            this.resultsLength = (<any>data).page.totalElements;
          } else {
            this.resultsLength = 1;
          }
          return (<any>data)._embedded.restriction;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.errorLoadingResults = true;
          return of([]);
        })
      )
      .subscribe(data => (this.commodityRestrictions = data));
  }

  openNewDialog() {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(NewRestrictionDialog, {
      width: "430px",
      data: {
        restriction: new CommodityRestriction(),
        editMode: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.service.addRestriction(result).subscribe(
          () => {
            this.snackBar.open("Added!", "Ok", { duration: 1500 });
            this.getRestrictions();
          },
          () => {
            this.snackBar.open("Oops! Error while adding", "Ok", {
              duration: 3000
            });
            this.getRestrictions();
          }
        );
      }
    });
  }

  openEditDialog(restriction: CommodityRestriction) {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(NewRestrictionDialog, {
      width: "430px",
      data: {
        restriction: restriction,
        editMode: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        // result.restriction = result.restriction._links.self.href;

        this.service.updateRestriction(result).subscribe(
          () => {
            this.snackBar.open("Updated!", "Ok", { duration: 1500 });
            this.getRestrictions();
          },
          () => {
            this.snackBar.open("Oops! Error while updating", "Ok", {
              duration: 3000
            });
            this.getRestrictions();
          }
        );
      }
    });
  }

  applyFilter(text: string) {
    this.restrictionFilterText = text.toUpperCase();
    this.dataSourceFilterDebounce.next();
  }

  editRestriction(restriction: CommodityRestriction) {
    this.openEditDialog(restriction);
  }

  deleteRestriction(restriction: CommodityRestriction) {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(DeleteRestrictionDialog, {
      width: "430px",
      data: {
        restriction: restriction
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.service.deleteRestriction(result).subscribe(() => {
          this.snackBar.open("Deleted!", "Ok", { duration: 1500 });
          this.getRestrictions();
        });
      }
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: "new-restriction-dialog",
  templateUrl: "new-restriction.dialog.html",
  styleUrls: ["./new-restriction.dialog.css"]
})
// tslint:disable-next-line:component-class-suffix
export class NewRestrictionDialog implements OnInit {
  newRestrictionForm     : FormGroup;
  commodityFilter        : string;
  loadingCommodities     : boolean;
  commodityNotFound      : boolean;
  errorLoadingCommodities: boolean;
  filteredCommodities    : Observable<Commodity[]>;
  selectedCommodity      : Commodity;

  commoditiesFilterDebounce = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<NewRestrictionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NewRestrictionDialogData,
    private fb: FormBuilder,
    private commodityService: CommodityService
  ) {}

  ngOnInit(): void {
    this.newRestrictionForm = this.fb.group({
      commodity: [
        {
          value: this.data.restriction.commodity,
          disabled: this.data.editMode
        },
        Validators.required
      ],
      remarks: [this.data.restriction.remarks, Validators.required]
    });

    this.commoditiesFilterDebounce.pipe(debounceTime(250)).subscribe(() => {
      this.getCommodities();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const tempRestriction = this.newRestrictionForm.getRawValue() as CommodityRestriction;
    tempRestriction._links = this.data.restriction._links;

    if (this.data.editMode) {
      tempRestriction.columbusCode = this.data.restriction.columbusCode;
    } else {
      tempRestriction.columbusCode = this.selectedCommodity.columbusCode;
    }

    this.dialogRef.close(tempRestriction);
  }

  applyCommoditiesFilter(filterValue: string) {
    this.commodityFilter = filterValue.trim().toUpperCase();

    if (this.commodityFilter === "") {
      this.commodityFilter = null;
      this.commodityNotFound = false;
      this.filteredCommodities = of([]);
    }

    this.commoditiesFilterDebounce.next();
  }

  getCommodities() {
    if (this.commodityFilter === null) {
      return;
    }

    this.errorLoadingCommodities = false;
    this.loadingCommodities = true;

    this.commodityService
      .getCommoditiesContaining(this.commodityFilter)
      .pipe(
        map(data => {
          if ((<any>data)._embedded.commodity.length === 0) {
            this.commodityNotFound = true;
          } else {
            this.commodityNotFound = false;
          }

          this.loadingCommodities = false;

          return (<any>data)._embedded.commodity;
        }),
        catchError(error => {
          this.errorLoadingCommodities = true;
          return of([]);
        })
      )
      .subscribe(data => (this.filteredCommodities = of(data)));
  }

  selectCommodity(commodity: Commodity) {
    this.selectedCommodity = commodity;
    this.newRestrictionForm.controls["commodity"].disable();
  }

  clearCommoditySelection() {
    this.selectedCommodity = null;
    this.newRestrictionForm.controls["commodity"].setValue("");
    this.newRestrictionForm.controls["commodity"].enable();
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: "delete-restriction-dialog",
  templateUrl: "delete-restriction.dialog.html",
  styleUrls: ["./delete-restriction.dialog.css"]
})
// tslint:disable-next-line:component-class-suffix
export class DeleteRestrictionDialog {
  constructor(
    public dialogRef: MatDialogRef<NewRestrictionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NewRestrictionDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(true);
  }
}
