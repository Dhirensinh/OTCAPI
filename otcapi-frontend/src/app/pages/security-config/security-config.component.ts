import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-security-config',
  templateUrl: './security-config.component.html',
  styleUrls: ['./security-config.component.css']
})
export class SecurityConfigComponent implements OnInit {

  constructor(public dialog: MatDialog,  private toastr: ToastrService) { }
  async ngOnInit() {

  }
  ngAfterViewInit() {
  }
}
