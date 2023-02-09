import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiKeyConfigService } from 'src/app/services/api-key-config.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DisplayKeyPopupComponent } from 'src/app/popup/display-key-popup/display-key-popup.component';
import { ChannelConfigService } from 'src/app/services/channel-config.service';
import { AlgoMasterService } from 'src/app/services/algo-master.service';
import { ClientMasterService } from 'src/app/services/client-master.service';
import { ERROR_MESSAGES } from 'src/consts/error_messages';
@Component({
  selector: 'app-new-outbound-channel-config',
  templateUrl: './new-outbound-channel-config.component.html',
  styleUrls: ['./new-outbound-channel-config.component.css']
})
export class NewOutboundChannelConfigComponent implements OnInit {

  element: any;
  outboundChannelForm: FormGroup;
  algos: any[] = [];
  clients: any[] = [];
  inboundChannels: any[] = [];
  action = "New";
  errorMsg: typeof ERROR_MESSAGES = ERROR_MESSAGES;
  
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private readonly channelConfigService: ChannelConfigService,
    private readonly algoMasterService: AlgoMasterService,
    private readonly clientMasterComponent: ClientMasterService,
    private toastr: ToastrService, private fb: FormBuilder) { }
  async ngOnInit() {
    this.getAlgoMasterForDropdown();
    this.getClientMasterForDropdown();
    this.getInboundChannelForDropdown();

    this.outboundChannelForm = this.fb.group({
      OutboundChannelId: [''],
      Client: ['', Validators.required],
      InboundChannel: ['', Validators.required],
      Exchange: ['', Validators.required],
      Pair: ['', Validators.required],
      Quantity: [0, Validators.required],
      OutboundChannel: ['', Validators.required],
      Algo: ['', Validators.required],
      Spread: ['', Validators.required],
      IsActive: [true],
    });

    this.route.params.subscribe(params => {
      if (params && params["id"]) {
        console.log(params["id"]);
        this.action = "UPDATE";
        this.getOutboundChannelById(params["id"]);
      }
    });
  }
  getInboundChannelForDropdown() {
    this.channelConfigService.getInboundChannelForDropdown().then(inboundChannels => {
      this.inboundChannels = inboundChannels;
    })
  }

  getAlgoMasterForDropdown() {
    this.algoMasterService.getAlgoMasterForDropdown().then(algos => {
      this.algos = algos;
    })
  }

  getClientMasterForDropdown() {
    this.clientMasterComponent.getClientMasterForDropdown().then(clients => {
      this.clients = clients;
    })
  }

  submit() {
    console.log(this.outboundChannelForm.value);
    if (this.outboundChannelForm.valid) {
      this.channelConfigService.saveOutboundChannel(this.outboundChannelForm.value).then(response => {
        if (response && response.IsSuccess) {
          this.toastr.success(response.Message, "Success");
          this.cancel()
        } else {
          this.toastr.error(response.Message, "Failed");
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }

  getOutboundChannelById(id: any) {
    try {
      this.channelConfigService.getOutboundChannelById(id).then(config => {
        debugger;
        if (config) {
          this.outboundChannelForm.controls["OutboundChannelId"].patchValue(config.OutboundChannelId);
          this.outboundChannelForm.controls["Client"].patchValue(config.Client);
          this.outboundChannelForm.controls["InboundChannel"].patchValue(config.InboundChannel);
          this.outboundChannelForm.controls["Exchange"].patchValue(config.Exchange);
          this.outboundChannelForm.controls["Pair"].patchValue(config.Pair);
          this.outboundChannelForm.controls["Quantity"].patchValue(config.Quantity);
          this.outboundChannelForm.controls["OutboundChannel"].patchValue(config.OutboundChannel);
          this.outboundChannelForm.controls["Algo"].patchValue(config.Algo);
          this.outboundChannelForm.controls["Spread"].patchValue(config.Spread);
          this.outboundChannelForm.controls["IsActive"].patchValue(config.IsActive);
        }
      }).catch(err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    this.outboundChannelForm.reset();
    this.router.navigate(['outbound-channel-config']);
  }

  inboundChannelChanged(event: any) {
    if (event && event.value) {
      console.log(event.value);
      let channel = this.inboundChannels.find(a => a.InboundChannel == event.value);
      if (channel) {
        this.outboundChannelForm.controls["Exchange"].patchValue(channel.Exchange);
        this.outboundChannelForm.controls["Pair"].patchValue(channel.Pair);
        this.outboundChannelForm.controls["Quantity"].patchValue(channel.Quantity);
        const { Algo,Spread } = this.outboundChannelForm.value;
        let algo = this.algos.find(a => a.AlgoMasterName == Algo);
        let algoName="";
        if(algo){
          algoName=algo.AlgoMasterName;
        }
        this.outboundChannelForm.controls["OutboundChannel"].patchValue(`MARKET_DATA_${channel.Pair}_${channel.Quantity}_${algoName}_${Spread}`.toUpperCase());
      }
    }
  }

  getChannelName() {
    debugger;
    console.log(this.outboundChannelForm.value);
    if (this.outboundChannelForm.value) {
      const { Pair, Quantity,Algo,Spread } = this.outboundChannelForm.value;
      let algo = this.algos.find(a => a.AlgoMasterName == Algo);
      let algoName="";
      if(algo){
        algoName=algo.AlgoMasterName;
      }
      this.outboundChannelForm.controls["OutboundChannel"].patchValue(`MARKET_DATA_${Pair}_${Quantity}_${algoName}_${Spread}`.toUpperCase());
    }
  }

}
