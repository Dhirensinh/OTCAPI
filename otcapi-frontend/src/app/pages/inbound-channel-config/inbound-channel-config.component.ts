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

@Component({
  selector: 'app-inbound-channel-config',
  templateUrl: './inbound-channel-config.component.html',
  styleUrls: ['./inbound-channel-config.component.css']
})
export class InboundChannelConfigComponent implements OnInit {

  public inboundChannelDataSource: any = new MatTableDataSource();
  @ViewChild('inboundChannelSort') inboundChannelSort: MatSort;
  @ViewChild('inboundChannelPaginator') inboundChannelPaginator: MatPaginator;

  public inboundChannelColumns: any[] = [
    { columnDef: 'InboundChannel', header: 'Inbound Channel', cell: (element: any) => `${element.InboundChannel}` },
    { columnDef: 'Exchange', header: 'Exchange', cell: (element: any) => `${element.Exchange}` },
    { columnDef: 'Pair', header: 'Pair', cell: (element: any) => `${element.Pair}` },
    { columnDef: 'Quantity', header: 'Quantity', cell: (element: any) => `${element.Quantity}` },
    {
      columnDef: 'UpdatedAt', header: 'UpdatedAt', cell: (element: any) => {
        return moment(element.UpdatedAt).format('YYYY-MM-DD HH:mm:ss A');
      }
    },
    { columnDef: 'IsActive', header: 'IsActive', cell: (element: any) => `${element.IsActive}` },
    { columnDef: 'action', header: 'Action' },
  ];

  displayedInboundChannelColumns = this.inboundChannelColumns.map(c => c.columnDef);
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor(public dialog: MatDialog, private toastr: ToastrService,
    private readonly channelConfigService: ChannelConfigService,
    private router: Router
  ) { }
  async ngOnInit() {
    this.getAllInboundChannelConfig();
  }

  ngAfterViewInit() {
    this.inboundChannelDataSource.paginator = this.inboundChannelPaginator;
    this.inboundChannelDataSource.sort = this.inboundChannelSort;
  }

  public applyInboundChannelFilter(event: Event) {
    this.inboundChannelDataSource.filter = (event.target as HTMLInputElement).value;
  }

  getAllInboundChannelConfig() {
    this.channelConfigService.getAllInboundChannel().then(result => {
      this.inboundChannelDataSource.data = result;
      this.inboundChannelDataSource.paginator = this.inboundChannelPaginator;
    }).catch(err => {
      console.log(err);
    })
  }

  public updateInboundChannel(element: any = {}) {
    this.router.navigate(['new-inbound-channel-config', element.InboundChannelId]);
    console.log(element);
  }

  public deleteInboundChannel(element: any) {
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
          this.channelConfigService.deleteInboundChannelById(element.InboundChannelId).then(response => {
            if (response && response.IsSuccess) {
              this.toastr.success(response.Message, "Success");
              this.getAllInboundChannelConfig();
            } else {
              this.toastr.error(response.Message, "Failed");
            }
          })
        }
      });
    }
  }
}
