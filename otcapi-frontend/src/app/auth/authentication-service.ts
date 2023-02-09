import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { CognitoService } from '../services/cognito.service';
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    constructor(
        private router: Router,
        private readonly cognito: CognitoService,private spinnerService: NgxSpinnerService) {
        var user = this.getUser();
        this.currentUserSubject = new BehaviorSubject<any>(user);
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }
    public login(user_name: any, password: any) {
        this.spinnerService.show();
        this.cognito.signIn(user_name, password).then(res => {
            if(res.signInUserSession.accessToken && res.signInUserSession.accessToken.jwtToken){
                localStorage.setItem("CurrentUser", JSON.stringify(res));
                localStorage.setItem("Token", res.signInUserSession.accessToken.jwtToken);
                this.currentUserSubject.next(this.getUser());
                this.router.navigate(['documentation']);
            }else{
                console.log('User Not Logged IN');
            }
            this.spinnerService.hide();
        });
    }

    public getUser() {
        let user:any=localStorage.getItem("CurrentUser");
        if(user){
            return JSON.parse(user);
        }
        return null;
    }

    public getToken() {
        return localStorage.getItem("Token");
    }

    public removeUser() {
        localStorage.removeItem('CurrentUser');
        this.currentUserSubject.next(null);
    }
    public logout() {
        this.spinnerService.show();
        this.cognito.signOut().then(logoutData=>{
            this.removeUser()
            this.spinnerService.hide();
        });
    }
}
