import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { RowData } from '../model/RowData';
import { MatTableDataSource } from '@angular/material/table';
import { IRowData } from '../model/IRowData';
import { DataTableService } from '../service/data-table-service/data-table.service';
import { CompareUtils } from '../model/CompareUtils';
import { MatPaginator } from '@angular/material/paginator';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataTableService: DataTableService;
  dataSource: MatTableDataSource<IRowData> = new MatTableDataSource<IRowData>();
  filterText = '';
  displayedColumns: string[] = [
    'label',
    'date',
    'amount',
    'frequency',
    'delete',
  ];
  constructor(dataTableService: DataTableService) {
    this.dataTableService = dataTableService;
    dataTableService.getChangeEventObservable().subscribe(() => {
      this.renderTable(this.data);
    });
  }
  ngOnInit(): void {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onFilterChange(event: any) {
    this.renderTable(this.data);
  }
  onSortChange(sortChange: Sort) {
    const columnName: string = sortChange.active;
    const isAscending: boolean = sortChange.direction === 'asc' ? true : false;
    const comparator = CompareUtils.getComparator(columnName);
    this.data.sort((a, b) => {
      let retVal = comparator(a, b);
      if (!isAscending) {
        retVal = retVal * -1;
      }
      return retVal;
    });
    this.renderTable(this.data);
  }
  onAddNewRow() {
    this.data.push(new RowData());
    this.renderTable(this.data);
    this.dataTableService.changeEvent('new row');
  }
  deleteRow(id: string) {
    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i];
      if (row.getId() === id) {
        this.data.splice(i, 1);
        break;
      }
    }
    this.renderTable(this.data);
    this.dataTableService.changeEvent('delete row');
  }

  renderTable(data: IRowData[]) {
    console.log('begin render table');
    this.dataSource.data = this.data.filter((row) => {
      return row
        .getLabel()
        .toLowerCase()
        .includes(this.filterText.toLowerCase());
    });
    console.log('done');
  }

  // Data changes
  handleDateChange(event: any) {
    this.dataTableService.changeEvent('date changed');
  }
  handleAmountChange(event: any) {
    this.dataTableService.changeEvent('amount changed');
  }
  handleFrequencyChange(event: any) {
    this.dataTableService.changeEvent('frequency changed');
  }
}
