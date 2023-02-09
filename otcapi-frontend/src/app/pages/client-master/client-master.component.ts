import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/popup/confirmation-dialog/confirmation-dialog.component';
import { ClientMasterService } from 'src/app/services/client-master.service';

@Component({
  selector: 'app-client-master',
  templateUrl: './client-master.component.html',
  styleUrls: ['./client-master.component.css']
})
export class ClientMasterComponent implements OnInit {

  public clientMasterDataSource: any = new MatTableDataSource();
  @ViewChild('clientMasterSort') clientMasterSort: MatSort;
  @ViewChild('clientMasterPaginator') clientMasterPaginator: MatPaginator;

  public clientMasterColumns: any[] = [
    { columnDef: 'ClientName', header: 'Client Name', cell: (element: any) => `${element.ClientName}` },
    { columnDef: 'Description', header: 'Client', cell: (element: any) => `${element.Description}` },
    {
      columnDef: 'UpdatedAt', header: 'UpdatedAt', cell: (element: any) => {
        return moment(element.UpdatedAt).format('YYYY-MM-DD HH:mm:ss A');
      }
    },
    { columnDef: 'IsActive', header: 'IsActive', cell: (element: any) => `${element.IsActive}` },
    { columnDef: 'action', header: 'Action' },
  ];

  displayedClientMasterColumns = this.clientMasterColumns.map(c => c.columnDef);
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor(public dialog: MatDialog, private toastr: ToastrService,
    private readonly clientMasterService: ClientMasterService,
    private router: Router
  ) { }
  async ngOnInit() {
    this.getAllClientMasterConfig();
  }

  ngAfterViewInit() {
    this.clientMasterDataSource.paginator = this.clientMasterPaginator;
    this.clientMasterDataSource.sort = this.clientMasterSort;
  }

  public applyClientMasterFilter(event: Event) {
    this.clientMasterDataSource.filter = (event.target as HTMLInputElement).value;
  }

  getAllClientMasterConfig() {
    this.clientMasterService.getAllClientMaster().then(result => {
      this.clientMasterDataSource.data = result;
      this.clientMasterDataSource.paginator = this.clientMasterPaginator;
    }).catch(err => {
      console.log(err);
    })
  }

  public updateClientMaster(element: any = {}) {
    this.router.navigate(['new-client-master', element.ClientMasterId]);
    console.log(element);
  }

  public deleteClientMaster(element: any) {
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
          this.clientMasterService.deleteClientMasterById(element.ClientMasterId).then(response => {
            if (response && response.IsSuccess) {
              this.toastr.success(response.Message, "Success");
              this.getAllClientMasterConfig();
            } else {
              this.toastr.error(response.Message, "Failed");
            }
          })
        }
      });
    }
  }

}
