import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiKeyConfigService } from 'src/app/services/api-key-config.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DisplayKeyPopupComponent } from 'src/app/popup/display-key-popup/display-key-popup.component';

@Component({
  selector: 'app-new-api-key',
  templateUrl: './new-api-key.component.html',
  styleUrls: ['./new-api-key.component.css']
})
export class NewApiKeyComponent implements OnInit {

  element: any;
  apiKeyForm: FormGroup;

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private readonly apiKeyConfigService: ApiKeyConfigService,
    private router: Router,
    private toastr: ToastrService, private fb: FormBuilder) { }
  async ngOnInit() {

    this.apiKeyForm = this.fb.group({
      ApiKeyConfigId: [''],
      KeyName: ['', Validators.required],
      ViewPermission:[false] ,
      TradePermission:[false] ,
      TransferPermission:[false] ,
      IsRestricted: ['', Validators.required],
      IPAddresses: [''],
    });
    this.route.params.subscribe(params => {
      if (params && params["id"]) {
        console.log(params["id"]);
        this.getApiConfigById(params["id"]);
      }
    });
  }



  get KeyName() {
    return this.apiKeyForm.get('KeyName');
  }

  submit() {
    console.log(this.apiKeyForm.value);
    if (this.apiKeyForm.valid) {
      this.apiKeyConfigService.generateKey(this.apiKeyForm.value).then(result => {
        debugger;
        if(result && result.apiKey){
          console.log(result);
          this.dialog.open(DisplayKeyPopupComponent, {
            data: result,            
            panelClass:"keyPopup",
          }).afterClosed().subscribe((dialogResult) => {
            
          });
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }

  getApiConfigById(id: any) {
    try {
      this.apiKeyConfigService.getApiConfigById(id).then(keyConfig => {
        if (keyConfig) {
          debugger
          this.apiKeyForm.controls["ApiKeyConfigId"].patchValue(keyConfig.ApiKeyConfigId);
          this.apiKeyForm.controls["KeyName"].patchValue(keyConfig.KeyName);
          this.apiKeyForm.controls["IsRestricted"].patchValue(keyConfig.IsRestricted);
          this.apiKeyForm.controls["IPAddresses"].patchValue(keyConfig.IPAddresses);
          this.apiKeyForm.controls["ViewPermission"].patchValue(keyConfig.ViewPermission);
          this.apiKeyForm.controls["TradePermission"].patchValue(keyConfig.TradePermission);
          this.apiKeyForm.controls["TransferPermission"].patchValue(keyConfig.TransferPermission);
        }
      }).catch(err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  cancel(){
    this.apiKeyForm.reset();
    this.router.navigate(['api-settings']);
  }
}
