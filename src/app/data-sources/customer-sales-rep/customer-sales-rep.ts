import { DataSourceTemplate } from '../data-source-template/data-source-template';

export class CustomerSalesRep extends DataSourceTemplate {

  constructor(service) {
    super(
      'Customer vs Sales Rep',
      'customerSalesRep',
      ['customerName', 'accountType', 'salesRep', 'bu'],
      ['Customer Name', 'Account Type', 'Sales Rep', 'LBU'],
      service,
      'You have to insert values into "Customer" filter to see the data!',
      'http://tableau.hsdg-ad.int/#/views/MIReports/CustomervsSalesRep',
      true,
      true
    );
  }

}
