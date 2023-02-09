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
import { ClientMasterService } from 'src/app/services/client-master.service';

@Component({
  selector: 'app-outbound-channel-config',
  templateUrl: './outbound-channel-config.component.html',
  styleUrls: ['./outbound-channel-config.component.css']
})
export class OutboundChannelConfigComponent implements OnInit {

  public outboundChannelDataSource: any = new MatTableDataSource();
  @ViewChild('outboundChannelSort') outboundChannelSort: MatSort;
  @ViewChild('outboundChannelPaginator') outboundChannelPaginator: MatPaginator;

  public outboundChannelColumns: any[] = [
    { columnDef: 'Client', header: 'Client', cell: (element: any) => `${element.Client}` },
    { columnDef: 'InboundChannel', header: 'Inbound Channel', cell: (element: any) => `${element.InboundChannel}` },
    { columnDef: 'OutboundChannel', header: 'Outbound Channel', cell: (element: any) => `${element.OutboundChannel}` },
    { columnDef: 'Pair', header: 'Pair', cell: (element: any) => `${element.Pair}` },
    { columnDef: 'Quantity', header: 'Quantity', cell: (element: any) => `${element.Quantity}` },
    { columnDef: 'Algo', header: 'Algo', cell: (element: any) => `${element.Algo}` },
    { columnDef: 'Spread', header: 'Spread', cell: (element: any) => `${element.Spread}` },
    {
      columnDef: 'UpdatedAt', header: 'UpdatedAt', cell: (element: any) => {
        return moment(element.UpdatedAt).format('YYYY-MM-DD HH:mm:ss A');
      }
    },
    { columnDef: 'IsActive', header: 'IsActive', cell: (element: any) => `${element.IsActive}` },
    { columnDef: 'action', header: 'Action' },
  ];

  displayedOutboundChannelColumns = this.outboundChannelColumns.map(c => c.columnDef);

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];


  constructor(public dialog: MatDialog, private toastr: ToastrService,
    private readonly channelConfigService: ChannelConfigService,
    
    private router: Router
  ) { }
  async ngOnInit() {
    this.getAllOutboundChannelConfig();
  }

  ngAfterViewInit() {
    this.outboundChannelDataSource.paginator = this.outboundChannelPaginator;
    this.outboundChannelDataSource.sort = this.outboundChannelSort;
  }


  public applyCurrencyFilter(event: Event) {
    this.outboundChannelDataSource.filter = (event.target as HTMLInputElement).value;
  }

  getAllOutboundChannelConfig() {
    this.channelConfigService.getAllOutboundChannel().then(result => {
      this.outboundChannelDataSource.data = result;
      this.outboundChannelDataSource.paginator = this.outboundChannelPaginator;
    }).catch(err => {
      console.log(err);
    })
  }

  public updateOutboundChannel(element: any = {}) {
    this.router.navigate(['new-outbound-channel-config', element.OutboundChannelId]);
    console.log(element);
  }

  public deleteOutboundChannel(element: any) {
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
          this.channelConfigService.deleteOutboundChannelById(element.OutboundChannelId).then(response => {
            if (response && response.IsSuccess) {
              this.toastr.success(response.Message, "Success");
              this.getAllOutboundChannelConfig();
            } else {
              this.toastr.error(response.Message, "Failed");
            }
          })
        }
      });
    }
  }
}
