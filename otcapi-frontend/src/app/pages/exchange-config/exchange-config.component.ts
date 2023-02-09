import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExchangeConfigService } from 'src/app/services/exchange-config.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationDialogComponent } from 'src/app/popup/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-exchange-config',
  templateUrl: './exchange-config.component.html',
  styleUrls: ['./exchange-config.component.css']
})
export class ExchangeConfigComponent implements OnInit {

  public exchangeDataSource: any = new MatTableDataSource();
  @ViewChild('exchangeSort') exchangeSort: MatSort;
  @ViewChild('exchangePaginator') exchangePaginator: MatPaginator;

  public exchangeColumns: any[] = [
    { columnDef: 'ExchangeName', header: 'Exchange Name', cell: (element: any) => `${element.ExchangeName}` },
    { columnDef: 'IsLiquidityProvider', header: 'Is Liquidity Provider', cell: (element: any) => `${element.IsLiquidityProvider}` },
    { columnDef: 'IsTargetExchange', header: 'Is Target Exchange', cell: (element: any) => `${element.IsTargetExchange}` },
    { columnDef: 'MakerFee', header: 'Maker Fee', cell: (element: any) => `${element.MakerFee}` },
    { columnDef: 'TakerFee', header: 'Taker Fee', cell: (element: any) => `${element.TakerFee}` },
    {
      columnDef: 'UpdatedAt', header: 'Updated At', cell: (element: any) => {
        return moment(element.UpdatedAt).format('YYYY-MM-DD HH:mm:ss A');
      }
    },
    { columnDef: 'IsActive', header: 'Is Active', cell: (element: any) => `${element.IsActive}` },
    { columnDef: 'action', header: 'Action' },
  ];



  displayedExchangeColumns = this.exchangeColumns.map(c => c.columnDef);

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor(public dialog: MatDialog, private toastr: ToastrService,
    private readonly exchangeConfigService: ExchangeConfigService,
    private router: Router
  ) { }
  async ngOnInit() {
    this.getAllExchangeConfig();
  }

  ngAfterViewInit() {
    this.exchangeDataSource.paginator = this.exchangePaginator;
    this.exchangeDataSource.sort = this.exchangeSort;
  }


  public applyExchangeFilter(event: Event) {
    this.exchangeDataSource.filter = (event.target as HTMLInputElement).value;
  }

  public deleteExchange(element: any) {
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
          this.exchangeConfigService.deleteExchangeConfigById(element.ExchangeId).then(response => {
            if (response && response.IsSuccess) {
              this.toastr.success(response.Message, "Success");
              this.getAllExchangeConfig();
            } else {
              this.toastr.error(response.Message, "Failed");
            }
          })
        }
      });
    }
  }

  getAllExchangeConfig() {
    this.exchangeConfigService.getAllExchangeConfigs().then(result => {
      this.exchangeDataSource.data = result;
      this.exchangeDataSource.paginator = this.exchangePaginator;
    }).catch(err => {
      console.log(err);
    })
  }
  editExchange(element: any) {
    this.router.navigate(['new-exchange-config', element.ExchangeId]);
  }
}
