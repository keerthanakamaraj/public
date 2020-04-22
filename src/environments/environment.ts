// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseURL: 'http://10.11.12.26:8180/olive/'
  // baseURL: "http://10.11.12.19:18180" //Mumbai
  baseURL: 'http://10.11.12.53:9090',
  // baseURL: 'https://rlfc.intellectseecapps.com',
  // baseURL: 'http://localhost:8081',
  enableKeycloak: false,
  authURL: 'https://iam.intellectseecapps.com/auth',
  // authURL: 'https://iam.intellectqacloud.com/auth', // QA
  realm: 'ecpvdev',
  // realm: 'dabank', // QA
  clientId: 'fabric',
  redirectURL: 'http://localhost:1841/#/home/LANDING',

  serviceMap : {
    "default" : "/olive/publisher",
    "/masters" : "/masters",
    "/ui" : "/olive/publisher"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
