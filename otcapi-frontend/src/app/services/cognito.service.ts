import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Auth,Amplify } from "aws-amplify";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CognitoService implements OnInit, OnDestroy {

	constructor( private router: Router) {
		console.log(`On Init`);
		Amplify.configure({
			Auth: {
				userPoolId: environment.COGNITO_USERPOOL,
				userPoolWebClientId: environment.COGNITO_CLIENTID,
				
				region: environment.COGNITO_REGION,
				oauth: {
					domain: environment.COGNITO_USERPOOLURI,
					scope: [
						"openid",
						"email",
						"profile"
					],
					redirectSignIn: environment.COGNITO_CALLBACKURI,
					redirectSignOut: environment.COGNITO_SIGNOUTURI,
					responseType: environment.COGNITO_RESPONSETYPE,
				},
				// storage: CustomChromeStorage
			},
		});
	}
	ngOnInit(): void {

	}

	async signIn(email:any, password:any) {
		return await Auth.signIn(email, password);
	}

	// pass in true to sign out from all devices
	async signOut(global = false) {
		// return await Auth.signOut({ global });
		return new Promise((resolve, reject) => {
			Auth.signOut({ global })
				.then((data) => {
					localStorage.clear();
					sessionStorage.clear();
					this.router.navigate(['login']);
					console.log('Log out successfully');
					resolve(data);
				})
				.catch((err) => {
					console.log(err);
					console.log('Error in logout');
					reject(Error("Not signed in."));
				});
		});
	}

	ngOnDestroy(): void {
		console.log(`On Destroy`);
	}
}
