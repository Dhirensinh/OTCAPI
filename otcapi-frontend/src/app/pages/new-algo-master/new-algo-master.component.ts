import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelConfigService } from 'src/app/services/channel-config.service';
import { PairConfigService } from 'src/app/services/pair-config.service';
import { ExchangeConfigService } from 'src/app/services/exchange-config.service';
import { AlgoMasterService } from 'src/app/services/algo-master.service';
import { ERROR_MESSAGES } from 'src/consts/error_messages';
@Component({
  selector: 'app-new-algo-master',
  templateUrl: './new-algo-master.component.html',
  styleUrls: ['./new-algo-master.component.css']
})
export class NewAlgoMasterComponent implements OnInit {

  element: any;
  algoMasterForm: FormGroup;
  action = "NEW";
  internalPairs: any[] = [];
  exchanges: any[] = [];
  errorMsg: typeof ERROR_MESSAGES = ERROR_MESSAGES;
  
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private readonly algoMasterService: AlgoMasterService,
    private router: Router,
    private toastr: ToastrService, private fb: FormBuilder) { }
  
  async ngOnInit() {
    this.algoMasterForm = this.fb.group({
      AlgoMasterId: [''],
      AlgoMasterName: ['', Validators.required],
      Algo: ['', Validators.required],
      IsActive: [false]
    });

    this.route.params.subscribe(params => {
      if (params && params["id"]) {
        this.action = "UPDATE";
        this.getAlgoMasterById(params["id"]);
      }
    });
  }
  submit() {
    console.log(this.algoMasterForm.value);
    if (this.algoMasterForm.valid) {
      this.algoMasterService.saveAlgoMaster(this.algoMasterForm.value).then(response => {
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
  getAlgoMasterById(id: any) {
    try {
      this.algoMasterService.getAlgoMasterById(id).then(config => {
        if (config) {
          this.algoMasterForm.controls["AlgoMasterId"].patchValue(config.AlgoMasterId);
          this.algoMasterForm.controls["AlgoMasterName"].patchValue(config.AlgoMasterName);
          this.algoMasterForm.controls["Algo"].patchValue(config.Algo);
          this.algoMasterForm.controls["IsActive"].patchValue(config.IsActive);
        }
      }).catch(err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    this.algoMasterForm.reset();
    this.router.navigate(['algo-master']);
  }
}
