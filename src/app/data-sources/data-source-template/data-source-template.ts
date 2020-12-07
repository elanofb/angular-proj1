import { OnInit } from "@angular/core";

export class DataSourceTemplate {
  processDate: any;
  lastUpdate: any;

  constructor(
    public dataSourceName,
    public jsonListName,
    public displayedColumns,
    public columnsName,
    public service,
    public missingFilterMessage,
    public dataSourceUrl,
    public hasData,
    public hasLastUpdated
  ) {
    this.service.getLastProcessDate().subscribe(
      resp => {
        if (hasLastUpdated) {
          this.lastUpdate = resp.lastProcessDate;
          this.processDate = resp.lastProcessDate.split(" ")[0];
        }
      },
      error => {
        this.lastUpdate = "Error retrieving date!";
      }
    );
  }
}
