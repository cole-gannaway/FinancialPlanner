import { Component, OnInit, Input } from '@angular/core';
import { IRowData } from '../model/IRowData';
import { RowData } from '../model/RowData';
import { DataTableService } from '../service/data-table-service/data-table.service';
import { CSVUtils } from '../utils/csv-utils/csv-utils';
import { parse } from 'papaparse';
import { EFrequency } from '../model/EFrequency';
import { MintUtils } from '../utils/mint-utils/mint-utils';

@Component({
  selector: 'app-csvuploader',
  templateUrl: './csvuploader.component.html',
  styleUrls: ['./csvuploader.component.css'],
})
export class CSVUploaderComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('expenses') expenses: Array<IRowData>;
  // tslint:disable-next-line: no-input-rename
  @Input('income') income: Array<IRowData>;
  dataTableService: DataTableService;

  constructor(dataTableService: DataTableService) {
    this.dataTableService = dataTableService;
  }

  ngOnInit(): void {}

  public openFile(event: any) {
    const file = event.target.files[0];
    const text = this.readFile(file);
  }

  public async readFile(file) {
    // bind variables
    const bindVar = (val) => {
      return () => {
        return val;
      };
    };
    const getThisComponent = bindVar(this);

    // read file
    const reader = new FileReader();
    reader.onload = function (this: FileReader, ev: ProgressEvent<FileReader>) {
      const csvAsText = this.result;
      const component = getThisComponent();
      // process file
      component.processCsv(csvAsText);
    };
    const text = await reader.readAsText(file);
    return text;
  }
  public processCsv(text: string) {
    const rows: Array<Array<string>> = parse(text).data;

    console.log('converting rows to rowData');

    // remove header row
    rows.shift();

    // convert rows to RowData
    const rowDatas: IRowData[] = rows
      .filter((row) => row.length > 5)
      .map((row) => {
        const rowData = MintUtils.createRowData(row);
        return rowData;
      });

    console.log(rowDatas);
    // add to tables
    rowDatas.forEach((row) => {
      const isExcluded = MintUtils.isAlwaysExcluded(row.getCategory());
      const isIncome = MintUtils.isIncome(row.getCategory());
      if (!isExcluded && isIncome) {
        this.income.push(row);
      } else if (!isExcluded && !isIncome) {
        row.setAmount(row.getAmount());
        this.expenses.push(row);
      }
    });
    console.log('done');
    this.dataTableService.changeEvent('uploaded csv');
  }

  public debug() {
    console.log(this.expenses);
    console.log(this.income);
  }
}
