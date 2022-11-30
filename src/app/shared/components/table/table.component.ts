import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import { CdkTableDataSourceInput } from '@angular/cdk/table';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() displayedColumns: any[] = [];
  @Input() data!: any[];
  @Input() hidePageSize: boolean = true;
  @Input() pageSizeOptions: number[] = [10];
  @Input() pageSize: number = 10;
  @Input() hidePaginator: boolean = false;
  @Input() isAdmin: boolean = false;
  @Output() public action: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatTable) table?: MatTable<{ [key: string]: any }>;

  public dataTable!:  CdkTableDataSourceInput<{ [key: string]: any }>;

  ngOnInit(): void {

  }

  get keys() {
    return this.displayedColumns.map(({key}) => key);
  }

  //render information
  public ngOnChanges(change: SimpleChanges) {
    setTimeout(() => {
      if(change['data'] && change['data'].previousValue){
        if (JSON.stringify(change['data'].currentValue) !== JSON.stringify(change['data'].previousValue)) this.sortTable();
      }else{
        this.sortTable();
      }

      if (change['pageSize'] && this.paginator) {
        this.paginator.pageSize = change['pageSize'].currentValue;
        this.paginator.nextPage();
        this.paginator.previousPage();
      }
    }, 1);
  }

  /**
   * onAction is the event when an icon action is clicked
   * @param row is the data of the specific row
   * @param position
   * @param enabled
   */
  public onAction(row: any, position: number, enabled: boolean) {
    const isAdmin: boolean = this.isAdmin;
    this.action.emit({row, position, enabled});
  }

  public sortTable() {
    this.dataTable = new MatTableDataSource<{ [key: string]: any }>(this.data);
  }
}
