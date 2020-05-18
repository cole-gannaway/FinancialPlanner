import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { RowData } from '../model/RowData';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('title') title: string;
  // tslint:disable-next-line: no-input-rename
  @Input('dataSource') dataSource: DataSource<RowData>;
  displayedColumns: string[] = [
    'label',
    'date',
    'amount',
    'frequency',
    'delete',
  ];
  constructor() {}

  ngOnInit(): void {
    // const numRows = 30;
    // for (let i = 0; i < numRows; i++) {
    //   this.dataSource.push(new RowData());
    // }
  }

  onSortData(sortChange: Sort) {
    console.log(sortChange.active);
    console.log(sortChange.direction);
  }
  onAddNewRow() {
    // this.dataSource.connect();
    // this.dataSource.renderRows();
    console.log('add new row requested');
  }
  deleteRow(i: number) {
    console.log('delete row requested for row ' + i);
    // this.dataSource.splice(i, 1);
  }
}
