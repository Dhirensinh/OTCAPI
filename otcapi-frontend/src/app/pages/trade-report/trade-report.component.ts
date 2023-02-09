import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-trade-report',
  templateUrl: './trade-report.component.html',
  styleUrls: ['./trade-report.component.css']
})
export class TradeReportComponent implements OnInit {

  public currencyDataSource: any = new MatTableDataSource();
  @ViewChild('currencySort') currencySort: MatSort;
  @ViewChild('currencyPaginator') currencyPaginator: MatPaginator;

  public currencyColumns: any[] = [
    { columnDef: 'currency_name', header: 'Exchange Currency', cell: (element: any) => `${element.Key}` },
    { columnDef: 'currency_type', header: 'Currency Type', cell: (element: any) => `${element.Key}` },
    { columnDef: 'currency_symbol', header: 'Currency Symbol', cell: (element: any) => `${element.Key}` },
    { columnDef: 'status', header: 'Status', cell: (element: any) => `${element.Key}` },
    { columnDef: 'decimals', header: 'Decimals', cell: (element: any) => `${element.Key}` },
    { columnDef: 'min_order', header: 'Min Order', cell: (element: any) => `${element.Key}` },
    { columnDef: 'updatedAt', header: 'Updated At', cell: (element: any) => `${element.Key}` },
    { columnDef: 'isActive', header: 'Is Active', cell: (element: any) => `${element.Key}` },
    { columnDef: 'action', header: 'Action' },
  ];

  displayedCurrencyColumns = this.currencyColumns.map(c => c.columnDef);

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor(public dialog: MatDialog,  private toastr: ToastrService) { }
  async ngOnInit() {

  }
  ngAfterViewInit() {
  }

  public applyCurrencyFilter(event: Event) {
    this.currencyDataSource.filter = (event.target as HTMLInputElement).value;
  }

  public getCurrency() {
    
  }

  public openCurrencyPopup(element: any = {}) {
    
  }

  public deleteCurrencyPopup(element: any) {

  }
}
