import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PairConfigService } from 'src/app/services/pair-config.service';
import { ExchangeConfigService } from 'src/app/services/exchange-config.service';
import { ERROR_MESSAGES } from 'src/consts/error_messages';
@Component({
  selector: 'app-new-pair-config',
  templateUrl: './new-pair-config.component.html',
  styleUrls: ['./new-pair-config.component.css']
})
export class NewPairConfigComponent implements OnInit {

  element: any;
  pairForm: FormGroup;
  action = "NEW";
  internalPairs: any[] = [];
  exchanges: any[] = [];
  errorMsg: typeof ERROR_MESSAGES = ERROR_MESSAGES;
  
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private pairConfigService: PairConfigService,
    private exchangeConfigService: ExchangeConfigService,
    private toastr: ToastrService, private fb: FormBuilder) { }
  async ngOnInit() {
    this.getInternalPairForDropdown();
    this.getExchangeForDropdown();

    this.pairForm = this.fb.group({
      ExchangePairId: ['', Validators.required],
      ExchangeName: ['', Validators.required],
      ExchangePair: ['', Validators.required],
      InternalPair: ['', Validators.required],
      MinNotional: [0, Validators.required],
      MaxNotional: [0, Validators.required],
      MinQuantity: [0, Validators.required],
      MaxQuantity: [0, Validators.required],
      TickSize: [0, Validators.required],
      LotSize: [0, Validators.required],
      PriceDecimal: [0, Validators.required],
      QuantityDecimal: [0, Validators.required],
      IsActive: [true],
    });
    this.route.params.subscribe(params => {
      if (params && params["id"]) {
        console.log(params["id"]);
        this.action = "UPDATE";
        this.getExchangePairConfigById(params["id"]);
      }
    });
  }
  getInternalPairForDropdown(){
    this.pairConfigService.getInternalPairForDropdown().then(internalPairs=>{
      this.internalPairs=internalPairs;
    })
  }

  getExchangeForDropdown(){
    this.exchangeConfigService.getExchangeForDropdown().then(exchanges=>{
      this.exchanges=exchanges;
    })
  }
  

  submit() {
    console.log(this.pairForm.value);
    if (this.pairForm.valid) {
      this.pairConfigService.saveExchangePair(this.pairForm.value).then(response => {
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

  getExchangePairConfigById(id: any) {
    try {
      this.pairConfigService.getExchangePairById(id).then(config => {
        if (config) {
          this.pairForm.controls["ExchangePairId"].patchValue(config.ExchangePairId);
          this.pairForm.controls["ExchangeName"].patchValue(config.ExchangeName);
          this.pairForm.controls["ExchangePair"].patchValue(config.ExchangePair);
          this.pairForm.controls["InternalPair"].patchValue(config.InternalPair);
          this.pairForm.controls["MinNotional"].patchValue(config.MinNotional);
          this.pairForm.controls["MaxNotional"].patchValue(config.MaxNotional);
          this.pairForm.controls["MinQuantity"].patchValue(config.MinQuantity);
          this.pairForm.controls["MaxQuantity"].patchValue(config.MaxQuantity);
          this.pairForm.controls["TickSize"].patchValue(config.TickSize);
          this.pairForm.controls["LotSize"].patchValue(config.LotSize);
          this.pairForm.controls["PriceDecimal"].patchValue(config.PriceDecimal);
          this.pairForm.controls["QuantityDecimal"].patchValue(config.QuantityDecimal);
          this.pairForm.controls["IsActive"].patchValue(config.IsActive);
        }
      }).catch(err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    this.pairForm.reset();
    this.router.navigate(['pair-config']);
  }
}
