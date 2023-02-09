import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ApiKeyConfigService } from 'src/app/services/api-key-config.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/popup/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-api-settings',
  templateUrl: './api-settings.component.html',
  styleUrls: ['./api-settings.component.css']
})
export class ApiSettingsComponent implements OnInit {


  //MAT TABLE CONFIG
  public apiKeyDataSource: any = new MatTableDataSource();
  @ViewChild('apiKeySort') apiKeySort: MatSort;
  @ViewChild('apiKeyPaginator') apiKeyPaginator: MatPaginator;

  // Each Column Definition results in one Column.
  public columns: any[] = [
    { columnDef: 'KeyName', header: 'Key Name', cell: (element: any) => `${element.KeyName}` },
    { columnDef: 'Key', header: 'key', cell: (element: any) => `${element.Key}` },
    { columnDef: 'SecretKey', header: 'Secret Key', cell: (element: any) => `${element.SecretKey}` },
    { columnDef: 'IPAddresses', header: 'IP Addresses', cell: (element: any) => `${element.IPAddresses}` },
    { columnDef: 'ViewPermission', header: 'View', cell: (element: any) => `${element.ViewPermission}` },
    { columnDef: 'TradePermission', header: 'Trade', cell: (element: any) => `${element.TradePermission}` },
    { columnDef: 'TransferPermission', header: 'Transfer', cell: (element: any) => `${element.TransferPermission}` },
    {
      columnDef: 'ExpiryAt', header: 'Expiry Date', cell: (element: any) => {
        return moment(element.ExpiryAt).format('YYYY-MM-DD HH:mm:ss A');
      }
    },
    {
      columnDef: 'CreatedAt', header: 'Created At', cell: (element: any) => {
        return moment(element.CreatedAt).format('YYYY-MM-DD HH:mm:ss A');
      }
    },
    { columnDef: 'IsActive', header: 'Active', cell: (element: any) => `${element.IsActive}` },
    { columnDef: 'action', header: 'Action', cell: (element: any) => `` },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  public toDate: any = new Date();
  public fromDate: any = new Date();
  pageSize = 20;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  totalCount = 0;

  constructor(public dialog: MatDialog,
    private toastr: ToastrService,
    private readonly apiKeyConfigService: ApiKeyConfigService,
    private router: Router,
  ) { }
  async ngOnInit() {
    this.getAllApiKeys();
  }

  
  ngAfterViewInit() {
    this.apiKeyDataSource.paginator = this.apiKeyPaginator;
    this.apiKeyDataSource.sort = this.apiKeySort;
  }


  getAllApiKeys() {
    this.apiKeyConfigService.getAllKeys().then(result => {
      this.apiKeyDataSource.data = result;
      this.apiKeyDataSource.paginator = this.apiKeyPaginator;
    }).catch(err => {
      console.log(err);
    })
  }

  editApiKey(element: any) {
    this.router.navigate(['api-key', element.ApiKeyConfigId]);
    console.log(element);
  }

  deleteApiKey(element: any) {
    console.log(element);
    if (element) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure you want to delete?',
          buttonText: {
            ok: 'Delete',
            cancel: 'Cancel'
          }
        }
      }).afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.apiKeyConfigService.deleteApiConfigById(element.ApiKeyConfigId).then(response => {
            if (response && response.IsSuccess) {
              this.toastr.success(response.Message, "Success");
              this.getAllApiKeys();
            } else {
              this.toastr.error(response.Message, "Failed");
            }
          })
        }
      });
    }
  }
}
