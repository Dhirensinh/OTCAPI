import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CurrencyConfigService } from 'src/app/services/currency-config.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/popup/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-currency-config',
  templateUrl: './currency-config.component.html',
  styleUrls: ['./currency-config.component.css']
})
export class CurrencyConfigComponent implements OnInit {

  public currencyDataSource: any = new MatTableDataSource();
  @ViewChild('currencySort') currencySort: MatSort;
  @ViewChild('currencyPaginator') currencyPaginator: MatPaginator;

  public currencyColumns: any[] = [
    { columnDef: 'CurrencyName', header: 'Currency Name', cell: (element: any) => `${element.CurrencyName}` },
    { columnDef: 'CurrencySymbol', header: 'Currency Symbol', cell: (element: any) => `${element.CurrencySymbol}` },
    { columnDef: 'CurrencyType', header: 'Currency Type', cell: (element: any) => `${element.CurrencyType}` },
    {
      columnDef: 'UpdatedAt', header: 'UpdatedAt', cell: (element: any) => {
        return moment(element.UpdatedAt).format('YYYY-MM-DD HH:mm:ss A'); 
      }
    },
    { columnDef: 'IsActive', header: 'IsActive', cell: (element: any) => `${element.IsActive}` },
    { columnDef: 'action', header: 'Action' },
  ];

  displayedCurrencyColumns = this.currencyColumns.map(c => c.columnDef);

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor(public dialog: MatDialog, private toastr: ToastrService, 
    private readonly currencyConfigService: CurrencyConfigService,
    private router: Router
    ) { }
  async ngOnInit() {
    this.getAllCurrencyConfig();
  }

  ngAfterViewInit() {
    this.currencyDataSource.paginator = this.currencyPaginator;
    this.currencyDataSource.sort = this.currencySort;
  }

  public applyCurrencyFilter(event: Event) {
    this.currencyDataSource.filter = (event.target as HTMLInputElement).value;
  }

  getAllCurrencyConfig() {
    this.currencyConfigService.getAllCurrencyConfig().then(result => {
      this.currencyDataSource.data = result;
      this.currencyDataSource.paginator = this.currencyPaginator;
    }).catch(err => {
      console.log(err);
    })
  }

  public updateCurrency(element: any = {}) {
    this.router.navigate(['new-currency-config', element.CurrencyId]);
    console.log(element);
  }

  public deleteCurrency(element: any) {
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
          this.currencyConfigService.deleteCurrencyConfigById(element.CurrencyId).then(response => {
            if (response && response.IsSuccess) {
              this.toastr.success(response.Message, "Success");
              this.getAllCurrencyConfig();
            } else {
              this.toastr.error(response.Message, "Failed");
            }
          })
        }
      });
    }
  }
}
