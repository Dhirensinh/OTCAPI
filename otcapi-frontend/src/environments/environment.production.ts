// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_SERVER:"http://bv-apn-1-pub-741336833.ap-northeast-1.elb.amazonaws.com:84",
  COGNITO_CLIENTID: "268sk6llgi57u3noh34tptu7pb",
  COGNITO_USERPOOLURI: "mmb-brs-report.auth.ap-northeast-1.amazoncognito.com",
  COGNITO_USERPOOL: "ap-northeast-1_c26R9QtR4",
  COGNITO_REGION: "ap-northeast-1",
  COGNITO_CALLBACKURI: "http://bv-apn-1-pub-741336833.ap-northeast-1.elb.amazonaws.com:85/login",
  COGNITO_SIGNOUTURI: "http://bv-apn-1-pub-741336833.ap-northeast-1.elb.amazonaws.com:85/login",
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
