import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ExcelService } from '../service/excel.service';
import { Filter } from './filter.interface';
import { AlertService } from '@internal-apps/hsdg-front-lib';

@Component({
  selector: 'app-default-table',
  templateUrl: './default-table.component.html',
  styleUrls: ['./default-table.component.css']
})
export class DefaultTableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  data;
  dataSource: MatTableDataSource<any>;

  dataSourceFilterDebounce = new Subject<string>();

  @Input() service;
  @Input() filters: Filter[];
  @Input() formUrl;
  @Input() hasAddButton = true;
  displayedColumns;

  constructor(
    private excelService: ExcelService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.displayedColumns = this.filters.map(filter => filter.fieldName);
    this.displayedColumns.push('edit');

    this.service.getAll().subscribe(
      dataList => {
        this.data = dataList;

        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Filtering
        this.dataSource.filterPredicate = (data) => {
          let match = true;

          this.filters.filter(filter => filter.value).forEach(filter => {
            const fieldValue = (
              data[filter.fieldName] && data[filter.fieldName].hasOwnProperty('name')
              ? data[filter.fieldName].name
              : data[filter.fieldName]
            );

            if (fieldValue === null || !fieldValue.toString().toLowerCase().includes(filter.value.toLowerCase())) {
              match = false;
            }
          });

          return match;
        };

        this.dataSourceFilterDebounce
          .pipe(debounceTime(200))
          .subscribe(filter => this.dataSource.filter = filter );
      },
      err => {
        this.alertService.print(err);
      }
    );
  }

  applyFilter() {
    this.dataSourceFilterDebounce.next(this.filters.map(filter => filter.value).toString());
  }

  export() {
    this.excelService.exportAsExcelFile(this.data);
  }

}
