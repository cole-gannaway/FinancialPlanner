import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { RowData } from '../model/RowData';
import { MatTableDataSource } from '@angular/material/table';
import { IRowData } from '../model/IRowData';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('title') title: string;
  // tslint:disable-next-line: no-input-rename
  @Input('data') data: Array<IRowData>;

  @Output() dataChangeEvent = new EventEmitter<string>();

  dataSource: MatTableDataSource<IRowData> = new MatTableDataSource<IRowData>();
  filterText = '';
  displayedColumns: string[] = [
    'label',
    'date',
    'amount',
    'frequency',
    'delete',
  ];
  constructor() {}

  ngOnInit(): void {}

  onFilterChange(event: any) {
    this.renderTable(this.data);
  }
  onSortChange(sortChange: Sort) {
    console.log(
      'sortChange requested for ' +
        sortChange.active +
        ' direction: ' +
        sortChange.direction
    );
  }
  onAddNewRow() {
    console.log('add new row requested');
    this.data.push(new RowData());
    this.renderTable(this.data);
    this.dataChangeEvent.emit('new row');
  }
  deleteRow(id: string) {
    console.log('delete row requested for id ' + id);
    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i];
      if (row.getId() === id) {
        this.data.splice(i, 1);
        break;
      }
    }
    this.renderTable(this.data);
    this.dataChangeEvent.emit('delete row');
  }
  fillInDebug() {
    console.log('setting up debug environment');
    const todaysDate = new Date();
    for (let i = 0; i < 10; i++) {
      const createdDate = new Date(todaysDate.toString());
      const createdVal = i;
      createdDate.setDate(createdDate.getDate() + i);
      // create row data
      const createdRowData = new RowData();
      createdRowData.setAmount(createdVal);
      createdRowData.setDate(createdDate);
      this.data.push(createdRowData);
    }
    this.renderTable(this.data);
  }
  renderTable(data: IRowData[]) {
    this.dataSource.data = this.data.filter((row) => {
      return row.getLabel().includes(this.filterText);
    });
  }

  // Data changes
  handleDateChange(event: any) {
    this.dataChangeEvent.emit('date changed');
  }
  handleAmountChange(event: any) {
    this.dataChangeEvent.emit('amount changed');
  }
  handleFrequencyChange(event: any) {
    this.dataChangeEvent.emit('frequency changed');
  }
}
