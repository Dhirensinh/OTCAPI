import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DisplayKeyPopupComponent } from 'src/app/popup/display-key-popup/display-key-popup.component';
import { CurrencyConfigService } from 'src/app/services/currency-config.service';
import { ERROR_MESSAGES } from 'src/consts/error_messages';
@Component({
  selector: 'app-new-currency-config',
  templateUrl: './new-currency-config.component.html',
  styleUrls: ['./new-currency-config.component.css']
})
export class NewCurrencyConfigComponent implements OnInit {
  currencyTypeObj = {
    FIAT: "FIAT",
    COIN: "COIN",
  }

  element: any;
  currencyForm: FormGroup;
  action = "NEW";
  errorMsg: typeof ERROR_MESSAGES = ERROR_MESSAGES;
  currencyObject: any = {
    CurrencyType: this.currencyTypeObj.FIAT,
    ExchangeFeeType: "PERCENTAGE",
    DepositFeeType: "PERCENTAGE",
    WithdrawFeeType: "PERCENTAGE",
  };
  feeTypes = ["PERCENTAGE", "FLAT"]

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private readonly currencyConfigService: CurrencyConfigService,
    private router: Router,
    private toastr: ToastrService, private fb: FormBuilder) { }
  async ngOnInit() {

    this.currencyForm = this.fb.group({
      CurrencyId: [''],
      CurrencyType: [''],
      CurrencyName: ['', Validators.required],
      CurrencySymbol: ['', Validators.required],
      ExchangeFee: [0, Validators.required],
      ExchangeFeeType: ['', Validators.required],
      DecimalPlace: [8, Validators.required],
      DepositMinimum: [0, Validators.required],
      DepositMaximum: [0, Validators.required],
      DepositFee: [0, Validators.required],
      DepositFeeType: ['', Validators.required],
      WithdrawMinimum: [0, Validators.required],
      WithdrawMaximum: [0, Validators.required],
      WithdrawFee: ['', Validators.required],
      WithdrawFeeType: ['', Validators.required],
      ActivationCharges: [0, Validators.required],
      IsERC20Token: [false],
      Icon: ['', Validators.required],
      IsActive: [true],
    });
    this.route.params.subscribe(params => {
      if (params && params["id"]) {
        this.action = "UPDATE";
        console.log(params["id"]);
        this.getCurrencyConfigById(params["id"]);
      }
    });
  }
  get IsFiat() {
    return this.currencyObject.CurrencyType == this.currencyTypeObj.FIAT;
  }

  submit() {
    if (this.currencyForm.valid) {
      this.currencyConfigService.saveCurrencyConfig(this.currencyForm.value).then(response => {
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

  getCurrencyConfigById(id: any) {
    try {
      this.currencyConfigService.getCurrencyConfigById(id).then(currencyConfig => {
        if (currencyConfig) {
          this.currencyForm.controls["CurrencyId"].patchValue(currencyConfig.CurrencyId);
          this.currencyForm.controls["CurrencyType"].patchValue(currencyConfig.CurrencyType);
          this.currencyForm.controls["CurrencyName"].patchValue(currencyConfig.CurrencyName);
          this.currencyForm.controls["CurrencySymbol"].patchValue(currencyConfig.CurrencySymbol);
          this.currencyForm.controls["ExchangeFee"].patchValue(currencyConfig.ExchangeFee);
          this.currencyForm.controls["ExchangeFeeType"].patchValue(currencyConfig.ExchangeFeeType);
          this.currencyForm.controls["DecimalPlace"].patchValue(currencyConfig.DecimalPlace);
          this.currencyForm.controls["DepositMinimum"].patchValue(currencyConfig.DepositMinimum);
          this.currencyForm.controls["DepositMaximum"].patchValue(currencyConfig.DepositMaximum);
          this.currencyForm.controls["DepositFee"].patchValue(currencyConfig.DepositFee);
          this.currencyForm.controls["DepositFeeType"].patchValue(currencyConfig.DepositFeeType);
          this.currencyForm.controls["WithdrawMinimum"].patchValue(currencyConfig.WithdrawMinimum);
          this.currencyForm.controls["WithdrawMaximum"].patchValue(currencyConfig.WithdrawMaximum);
          this.currencyForm.controls["WithdrawFee"].patchValue(currencyConfig.WithdrawFee);
          this.currencyForm.controls["WithdrawFeeType"].patchValue(currencyConfig.WithdrawFeeType);
          this.currencyForm.controls["ActivationCharges"].patchValue(currencyConfig.ActivationCharges);
          this.currencyForm.controls["IsERC20Token"].patchValue(currencyConfig.IsERC20Token);
          this.currencyForm.controls["Icon"].patchValue(currencyConfig.Icon);
          this.currencyForm.controls["IsActive"].patchValue(currencyConfig.IsActive);
        }
      }).catch(err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    this.currencyForm.reset();
    this.router.navigate(['currency-config']);
  }
}
