import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display-key-popup',
  templateUrl: './display-key-popup.component.html',
  styleUrls: ['./display-key-popup.component.sass']
})
export class DisplayKeyPopupComponent implements OnInit {

  element: any = {}
  myForm: any = FormControl;
  constructor(public dialogRef: MatDialogRef<DisplayKeyPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,private toastr: ToastrService,
    private clipboard: Clipboard
    ) {
    Object.assign(this.element, data);
  }
  ngOnInit(): void {

  }

  copyKey(){
    this.clipboard.copy(this.element.apiKey);
  }
  copySecret(){
    this.clipboard.copy(this.element.apiSecret);
  }
}

