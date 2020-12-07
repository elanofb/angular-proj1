import { Component, OnInit, ViewChild } from '@angular/core';
import { Filter } from '../core/default-table/filter.interface';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from './notification.service';
import { AlertService } from '@internal-apps/hsdg-front-lib';
import { debounceTime } from 'rxjs/operators';
import { ConfirmActionComponent } from '../core/confirm-action/confirm-action.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  loading: boolean;
  list = [];

  filters: Filter[] = [
    { value: '', fieldName: 'serviceCenter', placeHolder: 'Filter by Service Center', width: 25, tooltip: 'Example: SSC' },
    { value: '', fieldName: 'pol', placeHolder: 'Filter by POL', width: 20, tooltip: 'Example: SSZ' },
    { value: '', fieldName: 'pod', placeHolder: 'Filter by POD', width: 20, tooltip: 'Example: HAM' },
    { value: '', fieldName: 'trade', placeHolder: 'Filter by Trade', width: 35, tooltip: 'Example: UCLA' }
  ];
  filtersSubject = new Subject();

  dataSource = new MatTableDataSource();
  tableLength: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor( private service: NotificationService,
    private alertService: AlertService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.paginator.page.subscribe(page => this.find(page, this.sort));

    this.sort.sortChange.subscribe(sort => this.find(this.paginator, sort));

    this.filtersSubject
        .pipe(debounceTime(200))
        .subscribe(() => this.find(this.paginator, this.sort, 0));

    this.find(this.paginator, this.sort, 0);
  }

  find(page, sort, pageIndex = page.pageIndex) {
    this.loading = true;

    this.paginator.pageIndex = pageIndex;
    this.sort.active = sort.active;
    this.sort.direction = sort.direction;

    this.service
      .find(page.pageIndex, page.pageSize, sort.active, sort.direction, this.filters)
      .subscribe(
        resp => {
          this.list = (<any>resp)['content'];

          this.tableLength = (<any>resp).totalElements;

          this.dataSource = new MatTableDataSource(this.list);

          this.dataSource.sort = this.sort;

          this.loading = false;
        },
        err => {
          this.alertService.print(
            'Error while trying to get Notifications'
          );
          this.loading = false;
        }
      );
  }

  applyFilters() {
    this.filtersSubject.next();
  }

  delete(element) {
    this.dialog.open(
      ConfirmActionComponent,
      {data: { message: 'Are you sure you want to remove this record?' }}
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

    const dialogRef = this.dialog.open(NotificationFormComponent, dialogConfig);

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
