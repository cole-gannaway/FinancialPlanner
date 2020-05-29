import { Component } from '@angular/core';
import { RowData } from './model/RowData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FinancialPlanner';
  incomeTableData: Array<RowData> = new Array<RowData>();
  expensesTableData: Array<RowData> = new Array<RowData>();

  debug() {
    console.log('debug');
    console.log(this.incomeTableData);
    console.log(this.expensesTableData);
  }
}
