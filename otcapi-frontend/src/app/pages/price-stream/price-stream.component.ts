import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChannelConfigService } from 'src/app/services/channel-config.service';
import { ClientMasterService } from 'src/app/services/client-master.service';

@Component({
  selector: 'app-price-stream',
  templateUrl: './price-stream.component.html',
  styleUrls: ['./price-stream.component.css']
})
export class PriceStreamComponent implements OnInit {
  public priceStreamDataSource: any = new MatTableDataSource();
  @Input() clinetText: string = 'Client';
  @Input() channelText: string = 'Channel';
  clients: any[] = [];
  channels: any[] = [];

  public priceStreamColumns: any[] = [
    { columnDef: 'Client', header: 'Client', cell: (element: any) => `${element.Client}` },
    { columnDef: 'OutboundChannel', header: 'Outbound Channel', cell: (element: any) => `${element.OutboundChannel}` },
    { columnDef: 'MarketPrice', header: 'Market Price', cell: (element: any) => `${element.Pair}` },
    { columnDef: 'Spread', header: 'Spread', cell: (element: any) => `${element.Quantity}` },
    { columnDef: 'LPBid', header: 'LP Bid', cell: (element: any) => `${element.Algo}` },
    { columnDef: 'LPAsk', header: 'LP Ask', cell: (element: any) => `${element.Spread}` },
    { columnDef: 'LPSpread', header: 'LP Spread', cell: (element: any) => `${element.IsActive}` },
    { columnDef: 'ClientBid', header: 'Client Bid' },
    { columnDef: 'ClientAsk', header: 'Client Ask' },
    { columnDef: 'TGTSpread', header: 'TGT Spread' },
  ];
  displayedOutboundChannelColumns = this.priceStreamColumns.map(c => c.columnDef);

  clientDropdownList: any = [];
  channelDropdownList: any = [];
  clientSelectedItems: any = [];
  channelSelectedItems: any = [];
  dropdownSettings: any = {};

  constructor(
    private readonly clientMasterComponent: ClientMasterService,
    private outboundChannel: ChannelConfigService) { }

  ngOnInit(): void {
    this.getClientMasterForDropdown();
    this.getChannelForDropdown();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  public applyPriceFilter(event: Event) {
    this.priceStreamDataSource.filter = (event.target as HTMLInputElement).value
  }

  getClientMasterForDropdown() {
    this.clientMasterComponent.getClientMasterForDropdown().then((clients: any) => {
      this.clients = clients;
      this.clientDropdownList = clients.map((client: any) => {
        return { item_id: client.ClientMasterId, item_text: client.ClientName }
      })      
      this.onItemSelect(this.clients);
    })
  }
  getChannelForDropdown() {
    this.outboundChannel.getOutboundChannelForDropdown().then(channels => {
      this.channels = channels;
      this.channelDropdownList = channels.map((channel: any) => {
        return { item_id: channel.OutboundChannelId, item_text: channel.OutboundChannel }
      })
      this.onItemSelect(this.channels)
    })
  }
}
