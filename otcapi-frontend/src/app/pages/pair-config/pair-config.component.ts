import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PairConfigService } from 'src/app/services/pair-config.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationDialogComponent } from 'src/app/popup/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-pair-config',
  templateUrl: './pair-config.component.html',
  styleUrls: ['./pair-config.component.css']
})
export class PairConfigComponent implements OnInit {

  public pairDataSource: any = new MatTableDataSource();
  @ViewChild('pairSort') pairSort: MatSort;
  @ViewChild('pairPaginator') pairPaginator: MatPaginator;

  public pairColumns: any[] = [
    { columnDef: 'ExchangeName', header: 'Exchange', cell: (element: any) => `${element.ExchangeName}` },
    { columnDef: 'ExchangePair', header: 'Pair', cell: (element: any) => `${element.ExchangePair}` },
    { columnDef: 'InternalPair', header: 'Internal Pair', cell: (element: any) => `${element.InternalPair}` },
    { columnDef: 'MinNotional', header: 'Min Notional', cell: (element: any) => `${element.MinNotional}` },
    { columnDef: 'MaxNotional', header: 'Max Notional', cell: (element: any) => `${element.MaxNotional}` },
    { columnDef: 'MinQuantity', header: 'Max Quantity', cell: (element: any) => `${element.MinQuantity}` },
    { columnDef: 'MaxQuantity', header: 'Min Quantity', cell: (element: any) => `${element.MaxQuantity}` },
    { columnDef: 'TickSize', header: 'Tick Size', cell: (element: any) => `${element.TickSize}` },
    { columnDef: 'LotSize', header: 'Lot Size', cell: (element: any) => `${element.LotSize}` },
    { columnDef: 'PriceDecimal', header: 'Price Decimal', cell: (element: any) => `${element.PriceDecimal}` },
    { columnDef: 'QuantityDecimal', header: 'Quantity Decimal', cell: (element: any) => `${element.QuantityDecimal}` },
    {
      columnDef: 'UpdatedAt', header: 'Updated At', cell: (element: any) => {
        return moment(element.UpdatedAt).format('YYYY-MM-DD HH:mm:ss A');
      }
    },
    { columnDef: 'IsActive', header: 'Active', cell: (element: any) => `${element.IsActive}` },
    { columnDef: 'action', header: 'Action' },
  ];



  displayedPairColumns = this.pairColumns.map(c => c.columnDef);

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor(public dialog: MatDialog,
    private toastr: ToastrService,
    private pairConfigService: PairConfigService,
    private router: Router
  ) { }
  async ngOnInit() {
    this.getAllExchangePairConfig();
  }

  ngAfterViewInit() {
    this.pairDataSource.paginator = this.pairPaginator;
    this.pairDataSource.sort = this.pairSort;
  }

  public applyPairFilter(event: Event) {
    this.pairDataSource.filter = (event.target as HTMLInputElement).value;
  }

  public deletePair(element: any) {
    console.log(element);
    if (element) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure want to delete?',
          buttonText: {
            ok: 'Delete',
            cancel: 'Cancel'
          }
        }
      }).afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.pairConfigService.deleteExchangePairById(element.ExchangePairId).then(response => {
            if (response && response.IsSuccess) {
              this.toastr.success(response.Message, "Success");
              this.getAllExchangePairConfig();
            } else {
              this.toastr.error(response.Message, "Failed");
            }
          })
        }
      });
    }
  }

  getAllExchangePairConfig() {
    this.pairConfigService.getAllExchangePair().then(result => {
      this.pairDataSource.data = result;
      this.pairDataSource.paginator = this.pairPaginator;
    }).catch(err => {
      console.log(err);
    })
  }

  public updateCurrency(element: any = {}) {
    this.router.navigate(['new-pair-config', element.ExchangePairId]);
    console.log(element);
  }

}
