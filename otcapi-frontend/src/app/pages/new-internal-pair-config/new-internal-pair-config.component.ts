import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyConfigService } from 'src/app/services/currency-config.service';
import { PairConfigService } from 'src/app/services/pair-config.service';
import { ERROR_MESSAGES } from 'src/consts/error_messages';
@Component({
  selector: 'app-new-internal-pair-config',
  templateUrl: './new-internal-pair-config.component.html',
  styleUrls: ['./new-internal-pair-config.component.css']
})
export class NewInternalPairConfigComponent implements OnInit {

  element: any;
  internalPairForm: FormGroup;
  currencies: any[] = [];
  action = "NEW";

  internalPairObj:any={
    BaseCCY:"",
    QuoteCCY:"",
  }
  errorMsg: typeof ERROR_MESSAGES = ERROR_MESSAGES;

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private readonly currencyConfigService: CurrencyConfigService,
    private readonly pairConfigService: PairConfigService,
    private toastr: ToastrService, private fb: FormBuilder) { }
  async ngOnInit() {
    this.getCurrencyForDropdown();
    this.internalPairForm = this.fb.group({
      InternalPairId: [''],
      PairName: ['', Validators.required],
      BaseCCY: ['', Validators.required],
      QuoteCCY: ['', Validators.required],
      BasePrecision: [0, Validators.required],
      QuotePrecision: [0, Validators.required],
      ValuePrecision: [0, Validators.required],
      IsActive: [false],
    });
    this.route.params.subscribe(params => {
      if (params && params["id"]) {
        console.log(params["id"]);
        this.action = "UPDATE";
        this.getInternalPairConfigById(params["id"]);
      }
    });
  }
  
  getCurrencyForDropdown() {
    this.currencyConfigService.getCurrencyForDropdown().then(currencies => {
      this.currencies = currencies;
    })
  }
  submit() {
    console.log(this.internalPairForm.value);
    if (this.internalPairForm.valid) {
      this.pairConfigService.saveInternalPair(this.internalPairForm.value).then(response => {
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
  getInternalPairConfigById(id: any) {
    try {
      this.pairConfigService.getInternalPairById(id).then(config => {
        if (config) {
          this.internalPairForm.controls["InternalPairId"].patchValue(config.InternalPairId);
          this.internalPairForm.controls["PairName"].patchValue(config.PairName);
          this.internalPairForm.controls["BaseCCY"].patchValue(config.BaseCCY);
          this.internalPairForm.controls["QuoteCCY"].patchValue(config.QuoteCCY);
          this.internalPairForm.controls["BasePrecision"].patchValue(config.BasePrecision);
          this.internalPairForm.controls["QuotePrecision"].patchValue(config.QuotePrecision);
          this.internalPairForm.controls["ValuePrecision"].patchValue(config.ValuePrecision);
          this.internalPairForm.controls["IsActive"].patchValue(config.IsActive);
        }
      }).catch(err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  cancel() {
    this.internalPairForm.reset();
    this.router.navigate(['internal-pair-config']);
  }
}
