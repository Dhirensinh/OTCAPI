import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiKeyConfigService } from 'src/app/services/api-key-config.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DisplayKeyPopupComponent } from 'src/app/popup/display-key-popup/display-key-popup.component';
import { ExchangeConfigService } from 'src/app/services/exchange-config.service';
import { ERROR_MESSAGES } from 'src/consts/error_messages';
@Component({
  selector: 'app-new-exchange-config',
  templateUrl: './new-exchange-config.component.html',
  styleUrls: ['./new-exchange-config.component.css']
})
export class NewExchangeConfigComponent implements OnInit {

  element: any;
  exchangeForm: FormGroup;
  action = "New";
  errorMsg: typeof ERROR_MESSAGES = ERROR_MESSAGES;
  
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private readonly exchangeConfigService: ExchangeConfigService,
    private router: Router,
    private toastr: ToastrService, private fb: FormBuilder) { }
  async ngOnInit() {

    this.exchangeForm = this.fb.group({
      ExchangeId: [''],
      ExchangeName: ['', Validators.required],
      IsLiquidityProvider: [false],
      IsTargetExchange: [false],
      MakerFee: ['', Validators.required],
      TakerFee: ['', Validators.required],
      IsActive: [true],
    });

    this.route.params.subscribe(params => {
      if (params && params["id"]) {
        this.action = "UPDATE";
        this.getExchangeById(params["id"]);
      }
    });
  }
  submit() {
    console.log(this.exchangeForm.value);
    if (this.exchangeForm.valid) {
      this.exchangeConfigService.saveExchangeConfig(this.exchangeForm.value).then((response: any) => {
        if (response && response.IsSuccess) {
          this.toastr.success(response.Message, "Success");
          this.cancel()
        } else {
          this.toastr.error(response.Message, "Failed");
        }
      }).catch((err: any) => {
        console.log(err);
      })
    }
  }

  getExchangeById(id: any) {
    try {
      this.exchangeConfigService.getExchangeConfigById(id).then((exchangeConfig: any) => {
        if (exchangeConfig) {
          this.exchangeForm.controls["ExchangeId"].patchValue(exchangeConfig.ExchangeId);
          this.exchangeForm.controls["ExchangeName"].patchValue(exchangeConfig.ExchangeName);
          this.exchangeForm.controls["IsLiquidityProvider"].patchValue(exchangeConfig.IsLiquidityProvider);
          this.exchangeForm.controls["IsTargetExchange"].patchValue(exchangeConfig.IsTargetExchange);
          this.exchangeForm.controls["MakerFee"].patchValue(exchangeConfig.MakerFee);
          this.exchangeForm.controls["TakerFee"].patchValue(exchangeConfig.TakerFee);
          this.exchangeForm.controls["IsActive"].patchValue(exchangeConfig.IsActive);
        }
      }).catch((err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    this.exchangeForm.reset();
    this.router.navigate(['exchange-config']);
  }
}
