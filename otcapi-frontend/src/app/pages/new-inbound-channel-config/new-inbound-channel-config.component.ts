import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayKeyPopupComponent } from 'src/app/popup/display-key-popup/display-key-popup.component';
import { ChannelConfigService } from 'src/app/services/channel-config.service';
import { PairConfigService } from 'src/app/services/pair-config.service';
import { ExchangeConfigService } from 'src/app/services/exchange-config.service';
import { ERROR_MESSAGES } from 'src/consts/error_messages';
@Component({
  selector: 'app-new-inbound-channel-config',
  templateUrl: './new-inbound-channel-config.component.html',
  styleUrls: ['./new-inbound-channel-config.component.css']
})
export class NewInboundChannelConfigComponent implements OnInit {

  element: any;
  inboundChannelForm: FormGroup;
  action = "NEW";
  internalPairs: any[] = [];
  exchanges: any[] = [];
  errorMsg: typeof ERROR_MESSAGES = ERROR_MESSAGES;
  
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private readonly channelConfigService: ChannelConfigService,
    private pairConfigService: PairConfigService,
    private exchangeConfigService: ExchangeConfigService,
    private router: Router,
    private toastr: ToastrService, private fb: FormBuilder) { }
  async ngOnInit() {

    this.getInternalPairForDropdown();
    this.getExchangeForDropdown();

    this.inboundChannelForm = this.fb.group({
      InboundChannelId: [''],
      Exchange: ['', Validators.required],
      Pair: ['', Validators.required],
      Quantity: [0, Validators.required],
      InboundChannel: ['' , {disabled: true}, Validators.required],
      IsActive: [false]
    });

    this.route.params.subscribe(params => {
      if (params && params["id"]) {
        this.action = "UPDATE";
        this.getInboundChannelById(params["id"]);
      }
    });
  }
  getInternalPairForDropdown() {
    this.pairConfigService.getInternalPairForDropdown().then(internalPairs => {
      this.internalPairs = internalPairs;
    })
  }
  getExchangeForDropdown() {
    this.exchangeConfigService.getExchangeForDropdown().then(exchanges => {
      this.exchanges = exchanges;
    })
  }
  submit() {
    if (this.inboundChannelForm.valid) {
      this.channelConfigService.saveInboundChannel(this.inboundChannelForm.value).then(response => {
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
  getInboundChannelById(id: any) {
    try {
      this.channelConfigService.getInboundChannelById(id).then(config => {
        if (config) {
          this.inboundChannelForm.controls["InboundChannelId"].patchValue(config.InboundChannelId);
          this.inboundChannelForm.controls["Exchange"].patchValue(config.Exchange);
          this.inboundChannelForm.controls["Pair"].patchValue(config.Pair);
          this.inboundChannelForm.controls["Quantity"].patchValue(config.Quantity);
          this.inboundChannelForm.controls["InboundChannel"].patchValue(config.InboundChannel);
          this.inboundChannelForm.controls["IsActive"].patchValue(config.IsActive);
        }
      }).catch(err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  getChannelName() {
    if(this.inboundChannelForm.value){
      const {Exchange,Pair,Quantity}=this.inboundChannelForm.value;
      this.inboundChannelForm.controls["InboundChannel"].patchValue(`${Exchange}_${Pair}_${Quantity}`.toUpperCase());
    }
  }

  cancel() {
    this.inboundChannelForm.reset();
    this.router.navigate(['inbound-channel-config']);
  }
}
