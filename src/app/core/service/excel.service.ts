import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=TUF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor() {}

  exportAsExcelFile(json: any[], excelFileName: string = '') {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(excelBuffer: any, excelFileName: string): any {
    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });

    FileSaver.saveAs(
      data,
      excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
