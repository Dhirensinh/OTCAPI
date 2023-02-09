import { Component } from '@angular/core';
import { AuthenticationService } from './auth/authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blockoville OTC';
  public currentUser: any;
  public userName:any="Test";
  showFiller = false;
  
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userName=String(x.attributes.email).split('@')[0];
    });
  }

  logout(){
    this.authenticationService.logout();
  }
}

