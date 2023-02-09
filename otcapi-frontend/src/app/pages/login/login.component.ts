import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/auth/authentication-service';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;

  constructor(public dialog: MatDialog, private readonly authService: AuthenticationService) { }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    console.log(form.value.Username);
    console.log(form.value.Password);
    this.authService.login(form.value.Username, form.value.Password);
  }
}
