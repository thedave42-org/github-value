/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortable, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';


export interface ColumnOptions {
  columnDef: string;
  header: string;
  cell: (element: any) => string;
  link?: (element: any) => string;
  isImage?: boolean;
  isIcon?: boolean;
  chipList?: boolean;
  chipListIcon?: (element: any) => string;
  iconColor?: (element: any) => string;
  noWrap?: boolean;
};

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatChipsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges, OnInit  {
  dataSource!: MatTableDataSource<any>;
  @Input() data?: any[] = [];
  @Input() columns: ColumnOptions[] = [];
  @Input() defaultSort?: MatSortable;
  @Input() sortingDataAccessor?: (item: any, property: string) => any;
  @Input() filterPredicate?: (data: any, filter: string) => boolean;
  @Input() filterPlaceholder = 'Ex. Mona';
  @Output() rowClick = new EventEmitter<any>();
  displayedColumns = this.columns.map(c => c.columnDef);
  isLoadingResults = true;
  isError = false;
  isClickable = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.data!;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() { 
    this.isClickable = this.rowClick.observers.length > 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns']) {
      this.displayedColumns = this.columns.map(c => c.columnDef);
    }
    if (changes['data']) {
      if (!changes['data'].isFirstChange()) {
        this.sort.sort({ id: '', start: 'asc', disableClear: false });
      }
      if (this.data) {
        this.setData(this.data);
      }
    }
  }

  setData(data: any[]) {
    this.isLoadingResults = true;
    try {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.sortingDataAccessor) {
        this.dataSource.sortingDataAccessor = this.sortingDataAccessor
      }
      if (this.filterPredicate) {
        this.dataSource.filterPredicate = this.filterPredicate
      }
      if (this.defaultSort) {
        this.sort.sort(this.defaultSort);
      }
    } finally {
      this.isLoadingResults = false;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
