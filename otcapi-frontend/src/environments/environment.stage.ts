// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_SERVER:"http://stg-otc-platform-337595360.us-west-2.elb.amazonaws.com:3000",
  COGNITO_CLIENTID: "5jqemir26nr6jm90t3sr4nfacn",
  COGNITO_USERPOOLURI: "stg-otc-api.auth.us-west-2.amazoncognito.com",
  COGNITO_USERPOOL: "us-west-2_QDD7bpGEw",
  COGNITO_REGION: "us-west-2",
  COGNITO_CALLBACKURI: "http://localhost:4200/login",
  COGNITO_SIGNOUTURI: "http://localhost:4200/login",
  COGNITO_RESPONSETYPE: "token",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

