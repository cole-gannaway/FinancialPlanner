import { Component, OnInit } from '@angular/core';
import { RowData } from '../model/RowData';
import { Sort } from '@angular/material/sort';

const TestRowData: RowData[] = [
  {
    label: 'hello',
    amount: 2,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 3,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 2,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 3,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 2,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 3,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 2,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 3,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 2,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 3,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 2,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 3,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 2,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 3,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 2,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 3,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 2,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 3,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 2,
    frequency: 'hello',
  },
  {
    label: 'hello',
    amount: 3,
    frequency: 'hello',
  },
];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  title = 'Title';
  dataSource: RowData[] = TestRowData;
  displayedColumns: string[] = [
    'label',
    'date',
    'amount',
    'frequency',
    'delete',
  ];
  constructor() {}

  ngOnInit(): void {}

  onSortData(sortChange: Sort) {
    console.log(sortChange.active);
    console.log(sortChange.direction);
  }
}
