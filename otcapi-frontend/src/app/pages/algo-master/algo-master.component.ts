import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/popup/confirmation-dialog/confirmation-dialog.component';
import { ChannelConfigService } from 'src/app/services/channel-config.service';
import { AlgoMasterService } from 'src/app/services/algo-master.service';

@Component({
  selector: 'app-algo-master',
  templateUrl: './algo-master.component.html',
  styleUrls: ['./algo-master.component.css']
})
export class AlgoMasterComponent implements OnInit {

  public algoMasterDataSource: any = new MatTableDataSource();
  @ViewChild('algoMasterSort') algoMasterSort: MatSort;
  @ViewChild('algoMasterPaginator') algoMasterPaginator: MatPaginator;

  public algoMasterColumns: any[] = [
    { columnDef: 'AlgoMasterName', header: 'Algo Name', cell: (element: any) => `${element.AlgoMasterName}` },
    { columnDef: 'Algo', header: 'Algo', cell: (element: any) => `${element.Algo}` },
    {
      columnDef: 'UpdatedAt', header: 'UpdatedAt', cell: (element: any) => {
        return moment(element.UpdatedAt).format('YYYY-MM-DD HH:mm:ss A');
      }
    },
    { columnDef: 'IsActive', header: 'IsActive', cell: (element: any) => `${element.IsActive}` },
    { columnDef: 'action', header: 'Action' },
  ];

  displayedAlgoMasterColumns = this.algoMasterColumns.map(c => c.columnDef);
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor(public dialog: MatDialog, private toastr: ToastrService,
    private readonly algoMasterService: AlgoMasterService,
    private router: Router
  ) { }
  async ngOnInit() {
    this.getAllAlgoMasterConfig();
  }

  ngAfterViewInit() {
    this.algoMasterDataSource.paginator = this.algoMasterPaginator;
    this.algoMasterDataSource.sort = this.algoMasterSort;
  }

  public applyAlgoMasterFilter(event: Event) {
    this.algoMasterDataSource.filter = (event.target as HTMLInputElement).value;
  }

  getAllAlgoMasterConfig() {
    this.algoMasterService.getAllAlgoMaster().then(result => {
      this.algoMasterDataSource.data = result;
      this.algoMasterDataSource.paginator = this.algoMasterPaginator;
    }).catch(err => {
      console.log(err);
    })
  }

  public updateAlgoMaster(element: any = {}) {
    this.router.navigate(['new-algo-master', element.AlgoMasterId]);
    console.log(element);
  }

  public deleteAlgoMaster(element: any) {
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
          this.algoMasterService.deleteAlgoMasterById(element.AlgoMasterId).then(response => {
            if (response && response.IsSuccess) {
              this.toastr.success(response.Message, "Success");
              this.getAllAlgoMasterConfig();
            } else {
              this.toastr.error(response.Message, "Failed");
            }
          })
        }
      });
    }
  }
  
}
