import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Filter } from '../core/default-table/filter.interface';
import { WeightLimitationService } from './weight-limitation.service';
import { debounceTime } from 'rxjs/operators';
import { AlertService, KeycloakService } from '@internal-apps/hsdg-front-lib';
import { ConfirmActionComponent } from '../core/confirm-action/confirm-action.component';
import { WeightLimitationFormComponent } from './weight-limitation-form/weight-limitation-form.component';

const DEFAULT_WIDTH = 25;

@Component({
  selector: 'app-weight-limitation',
  templateUrl: './weight-limitation.component.html',
  styleUrls: ['./weight-limitation.component.css']
})
export class WeightLimitationComponent implements OnInit {

  loading: boolean;
  errorLoadingResults: boolean;
  shouldShowNewButton: boolean;
  list = [];
  dataCountry: string;

  filters: Filter[] = [
    { value: '', fieldName: 'stateDestination', placeHolder: 'Filter by State Destination', width: DEFAULT_WIDTH, tooltip: 'Example: SP' },
    { value: '', fieldName: 'pod', placeHolder: 'Filter by POD', width: DEFAULT_WIDTH, tooltip: 'Example: Brazil' },
    { value: '', fieldName: 'country', placeHolder: 'Filter by Country', width: DEFAULT_WIDTH, tooltip: 'Example: Brazil' },
    { value: '', fieldName: 'mode', placeHolder: 'Filter by Mode', width: DEFAULT_WIDTH, tooltip: 'Example: Road' }
  ];
  filtersSubject = new Subject();
  tableColumnsToDisplay: string[] = ["stateDestination", "pod", "country", "mode", "limit","remarks","actions"];
  userRoles: string[] = [];

  dataSource = new MatTableDataSource();
  tableLength: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private service: WeightLimitationService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.showItemsByRoles();

    this.paginator.page.subscribe(page => this.find(page, this.sort));

    this.sort.sortChange.subscribe(sort => this.find(this.paginator, sort));

    this.filtersSubject
      .pipe(debounceTime(200))
      .subscribe(() => this.find(this.paginator, this.sort, 0));

    this.find(this.paginator, this.sort, 0);
  }

  showItemsByRoles() {
    try {
      this.userRoles =
        KeycloakService.auth.authz.tokenParsed.resource_access[
          "booking-creation-guide"
        ].roles;
    } catch (e) { }

    if (this.userRoles.includes('WEIGHT_AGREEMENT_CREATE')) {
      this.shouldShowNewButton = true;
    }

    if (this.userRoles.includes('WEIGHT_AGREEMENT_UPDATE') && this.userRoles.includes('WEIGHT_AGREEMENT_DELETE')) {
      this.tableColumnsToDisplay.push('actions');
    }
  }
  
  find(page, sort, pageIndex = page.pageIndex) {
  //  this.showItemsByRoles();
    this.loading = true;

    this.paginator.pageIndex = pageIndex;
    this.sort.active = sort.active;
    this.sort.direction = sort.direction;

    this.service    
      .findUsingFilters(page.pageIndex, page.pageSize, sort.active, sort.direction, this.filters)
      .subscribe(        
        resp => {
          
          //console.log(resp);
          this.list = resp['_embedded']['weight-limitations']

          this.tableLength = resp['page']['totalElements'];
          this.dataSource = new MatTableDataSource(this.list);
          this.dataSource.sort = this.sort;

          this.loading = false;
          this.errorLoadingResults = false;
        },
        err => {
          this.alertService.print(
            'Error while trying to get Weight Limitations'
          );
          this.loading = false;
          this.errorLoadingResults = true;
          this.dataSource = new MatTableDataSource();
        }
      );
  }

  applyFilters() {    
    this.filtersSubject.next();
  }

  delete(element) {

    console.log(element.id);

    this.dialog.open(
      ConfirmActionComponent,
      { data: { message: 'Are you sure you want to remove this record?' } }
    )
      .afterClosed().subscribe(
        result => {
          if (result) {
            this.service.delete(element.id).subscribe(
              resp => this.find(this.paginator, this.sort, 0),
              err => {
                this.alertService.print('Error while trying to delete record');
              }
            );
          }
        }
      );
  }

  openForm(element) {
    const dialogConfig = {
      width: '500px',
      data: element
    };

    const dialogRef = this.dialog.open(WeightLimitationFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.post(result).subscribe(
          resp => this.find(this.paginator, this.sort, 0),
          err => this.alertService.print('Error while trying to save')
        );
      }
    });
  }


}
