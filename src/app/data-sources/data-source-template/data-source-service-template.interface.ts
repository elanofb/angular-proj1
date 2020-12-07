export interface DataSourceServiceTemplate {

  find(page: number, size: number, sort, direction);

  hasMandatoryFilters();

  getLastProcessDate();

}
