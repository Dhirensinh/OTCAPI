import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CurrencyConfigService } from 'src/app/services/currency-config.service';
import { Router } from '@angular/router';
import { PairConfigService } from 'src/app/services/pair-config.service';
import * as moment from 'moment';
import { ConfirmationDialogComponent } from 'src/app/popup/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-internal-pair-config',
  templateUrl: './internal-pair-config.component.html',
  styleUrls: ['./internal-pair-config.component.css']
})
export class InternalPairConfigComponent implements OnInit {

  public internalPairDataSource: any = new MatTableDataSource();
  @ViewChild('internalPairSort') internalPairSort: MatSort;
  @ViewChild('internalPairPaginator') internalPairPaginator: MatPaginator;

  public internalPairColumns: any[] = [
    { columnDef: 'PairName', header: 'Pair Name', cell: (element: any) => `${element.PairName}` },
    { columnDef: 'BaseCCY', header: 'Base CCY', cell: (element: any) => `${element.BaseCCY}` },
    { columnDef: 'QuoteCCY', header: 'Quote CCY', cell: (element: any) => `${element.QuoteCCY}` },
    { columnDef: 'BasePrecision', header: 'Base Precision', cell: (element: any) => `${element.BasePrecision}` },
    { columnDef: 'QuotePrecision', header: 'Quote Precision', cell: (element: any) => `${element.QuotePrecision}` },
    { columnDef: 'ValuePrecision', header: 'Value Precision', cell: (element: any) => `${element.ValuePrecision}` },
    {
      columnDef: 'UpdatedAt', header: 'Updated At', cell: (element: any) => {
        return moment(element.UpdatedAt).format('YYYY-MM-DD HH:mm:ss A');
      }
    },
    { columnDef: 'IsActive', header: 'Is Active', cell: (element: any) => `${element.IsActive}` },
    { columnDef: 'action', header: 'Action' },
  ];

  displayedInternalPairColumns = this.internalPairColumns.map(c => c.columnDef);
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];


  constructor(public dialog: MatDialog,
    private toastr: ToastrService,
    private readonly pairConfigService: PairConfigService,
    private router: Router
  ) {

  }
  async ngOnInit() {
    this.getAllInternalPairConfig();
  }
  ngAfterViewInit() {
    this.internalPairDataSource.paginator = this.internalPairPaginator;
    this.internalPairDataSource.sort = this.internalPairSort;
  }
  public applyInternalPairFilter(event: Event) {
    this.internalPairDataSource.filter = (event.target as HTMLInputElement).value;
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
          this.pairConfigService.deleteInternalPairById(element.InternalPairId).then(response => {
            if (response && response.IsSuccess) {
              this.toastr.success(response.Message, "Success");
              this.getAllInternalPairConfig();
            } else {
              this.toastr.error(response.Message, "Failed");
            }
          })
        }
      });
    }
  }

  getAllInternalPairConfig() {
    this.pairConfigService.getAllInternalPair().then(result => {
      this.internalPairDataSource.data = result;
      this.internalPairDataSource.paginator = this.internalPairPaginator;
    }).catch(err => {
      console.log(err);
    })
  }

  public updateCurrency(element: any = {}) {
    this.router.navigate(['new-internal-pair-config', element.InternalPairId]);
    console.log(element);
  }
}
