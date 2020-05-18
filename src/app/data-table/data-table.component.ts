import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { RowData } from '../model/RowData';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('title') title: string;
  // tslint:disable-next-line: no-input-rename
  @Input('data') data: Array<RowData>;
  dataSource: MatTableDataSource<RowData> = new MatTableDataSource<RowData>();
  filterText = '';
  displayedColumns: string[] = [
    'label',
    'date',
    'amount',
    'frequency',
    'delete',
  ];
  constructor() {}

  ngOnInit(): void {
    this.data.push(new RowData());
    this.reRedner(this.data);
  }

  onFilterData(event: any) {
    this.reRedner(this.data);
  }
  onSortData(sortChange: Sort) {
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
    this.reRedner(this.data);
  }
  deleteRow(id: string) {
    console.log('delete row requested for id ' + id);
    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i];
      if (row.id === id) {
        this.data.splice(i, 1);
        break;
      }
    }
    this.reRedner(this.data);
  }
  reRedner(data: RowData[]) {
    this.dataSource.data = this.data.filter((row) => {
      return row.label.includes(this.filterText);
    });
  }
}
