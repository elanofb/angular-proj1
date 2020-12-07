import { DataSourceTemplate } from '../data-source-template/data-source-template';

export class PdfFretado extends DataSourceTemplate {

  constructor(service) {
    super(
      'PDF with charges',
      'booking-fretado',
      ['customer', 'authorized'],
      ['Customer Name', 'Is authorized?'],
      service,
      'You have to insert values into "Customer" filter to see the data!',
      'http://intranet.ham.hamburgsud.com/rse/pt/content/business_information/customer_order_management_1/cm_customer_order_management_rse/customer_service_ssz_e_sul/links_uteis/portalcs.jsp',
      true,
      true
    );
  }

}
