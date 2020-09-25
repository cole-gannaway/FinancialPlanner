/*Default Angular */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

/* Components */
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { LineGraphComponent } from './line-graph/line-graph.component';

/* Angular Material Table */
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';

/* Angular Material Inputs */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

/* Angular Date Picker */
import { MatDatepickerModule } from '@angular/material/datepicker';

/* Material Icons */
import { MatIconModule } from '@angular/material/icon';

/* Charts */
import { ChartsModule } from 'ng2-charts';
import { CSVUploaderComponent } from './csvuploader/csvuploader.component';

@NgModule({
  declarations: [AppComponent, DataTableComponent, LineGraphComponent, CSVUploaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    ScrollingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
