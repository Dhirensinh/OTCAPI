import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientMasterService } from 'src/app/services/client-master.service';
import { ERROR_MESSAGES } from 'src/consts/error_messages';
@Component({
  selector: 'app-new-client-master',
  templateUrl: './new-client-master.component.html',
  styleUrls: ['./new-client-master.component.css']
})
export class NewClientMasterComponent implements OnInit {

  element: any;
  clientMasterForm: FormGroup;
  action = "NEW";
  internalPairs: any[] = [];
  exchanges: any[] = [];
  errorMsg: typeof ERROR_MESSAGES = ERROR_MESSAGES;
  
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private readonly clientMasterService: ClientMasterService,
    private router: Router,
    private toastr: ToastrService, private fb: FormBuilder) { }
    
  async ngOnInit() {
    this.clientMasterForm = this.fb.group({
      ClientMasterId: [''],
      ClientName: ['', Validators.required],
      Description: ['', Validators.required],
      IsActive: [false]
    });

    this.route.params.subscribe(params => {
      if (params && params["id"]) {
        this.action = "UPDATE";
        this.getClientMasterById(params["id"]);
      }
    });
  }
  submit() {
    console.log(this.clientMasterForm.value);
    if (this.clientMasterForm.valid) {
      this.clientMasterService.saveClientMaster(this.clientMasterForm.value).then(response => {
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
  getClientMasterById(id: any) {
    try {
      this.clientMasterService.getClientMasterById(id).then(config => {
        if (config) {
          this.clientMasterForm.controls["ClientMasterId"].patchValue(config.ClientMasterId);
          this.clientMasterForm.controls["ClientName"].patchValue(config.ClientName);
          this.clientMasterForm.controls["Description"].patchValue(config.Description);
          this.clientMasterForm.controls["IsActive"].patchValue(config.IsActive);
        }
      }).catch(err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    this.clientMasterForm.reset();
    this.router.navigate(['client-master']);
  }
}
