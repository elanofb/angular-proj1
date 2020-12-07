import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Filter } from 'src/app/core/default-table/filter.interface';
import { FiltersService } from '../filters.service';
import { DataSourceTemplate } from './data-source-template';
import { AlertService } from '@internal-apps/hsdg-front-lib';

@Component({
  selector: 'app-data-source-template',
  templateUrl: './data-source-template.component.html',
  styleUrls: ['./data-source-template.component.css']
})
export class DataSourceTemplateComponent implements OnInit {

  @Input() dataSourceObject: DataSourceTemplate;

  loading = true;
  list = [];

  dataSource = new MatTableDataSource(this.list);
  tableLength: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private filtersService: FiltersService
  ) { }

  ngOnInit() {
    this.paginator.page.subscribe(page => this.find(page, this.sort));

    this.sort.sortChange.subscribe(sort => this.find(this.paginator, sort));

    this.filtersService.subject.subscribe(() =>
      this.find(this.paginator, this.sort, 0)
    );
  }

  find(page, sort, pageIndex = page.pageIndex) {
    if (this.hasMandatoryFilters()) {
      this.loading = true;

      this.paginator.pageIndex = pageIndex;
      this.sort.active = sort.active;
      this.sort.direction = sort.direction;

      this.dataSourceObject.service
        .find(page.pageIndex, page.pageSize, sort.active, sort.direction)
        .subscribe(
          resp => {
            const totalElements = (<any>resp).totalElements;
            console.log(resp);
            //this.dataSourceObject.hasData = totalElements !== 0;

            if (totalElements !== 0) {
              if (this.dataSourceObject.jsonListName == "content") {
                this.list = (<any>resp)[this.dataSourceObject.jsonListName];
                this.tableLength = totalElements;
                this.dataSourceObject.hasData = (this.list && this.list.length !== 0)
              } else {
                this.list = (<any>resp)._embedded[this.dataSourceObject.jsonListName];
                this.tableLength = (<any>resp).page.totalElements;
                this.dataSourceObject.hasData = (this.list && this.list.length !== 0)
              }

              this.dataSource = new MatTableDataSource(this.list);

              this.dataSource.sort = this.sort;
            }

            this.loading = false;
          },
          err => {
            this.alertService.print(
              'Error while trying to get ' + this.dataSourceObject.dataSourceName + ' data'
            );
            this.loading = false;
          }
        );
    } else {
      this.list = null;
      this.dataSource = null;
      this.loading = false;
    }
  }

  hasMandatoryFilters() {
    return this.dataSourceObject.service.hasMandatoryFilters();
  }

  clearResult() {
    this.list = [];
  }

  extractCellText(element, item) {
    let val = element;

    item.split('.').forEach(i => val = val[i]);

    return val;
  }

  transformBool(value) {
    if (value === true) {
      return "Y";
    }
    else if (value === false) {
      return "N";
    }
    else if (value === null) {
      return "N/A";
    }
    else if (!value) {
      return "N/A";
    }
    return value
  }

}
