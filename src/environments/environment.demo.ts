// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  name: 'demo',
  production: false,
  // baseURL: 'http://10.11.12.26:8180/olive/'
  // baseURL: "http://10.11.12.19:18180" //Mumbai
  // baseURL: 'http://10.11.12.53:9090', // LOCAL
  baseURL: 'http://10.11.12.15:20804', //Demo
  // baseURL: 'http://10.12.20.45:10144', //Demo 2
  //  baseURL: 'http://localhost:8081',
  enableKeycloak: false,
  authURL: 'http://10.11.12.15:18080/auth', // Demo
  // authURL: 'http://10.12.20.45:18080/auth', // Demo 2
  //authURL: 'https://iam.intellectqacloud.com/auth', // QA
  realm: 'rlorealm',
  // realm: 'RLO', // Demo 2
  // realm: 'dabank', // QA
  clientId: 'rloclient',
  redirectURL: 'http://localhost:1841/#/home/LANDING', // Demo 2
  //redirectURL: 'http://10.12.20.45:20804/rlo/#/home/LANDING', // Demo 2
  // redirectURL: window.location.hash.replace('#/', '') === '' ? window.location.href + '#/home/LANDING' : window.location.href,

  // serviceMap : {
  //   "default" : "/olive/publisher",
  //   "/masters" : "/masters",
  //   "/ui" : "/olive/publisher",
  //   "/los-wf" : "/los-wf/",
  //   "/initiation": "/olive/publisher",
  //   "/rlo-de" : "/olive/publisher",
  //  "/los-integrator":"/los-integrator"
  // }

  serviceMap: {
    "default": "/olive/publisher/rlo-initiation",
    "/masters": "/olive/publisher/rlo-masters",
    "/ui": "/olive/publisher/rlo-initiation",
    "/los-wf": "/los-wf/rest",
    "/initiation": "/olive/publisher/rlo-initiation",
    "/rlo-de": "/olive/publisher/rlo-data-enrich",
    "/los-integrator": "/los-integrator",
    "/lettermangement" :"/olive/publisher/rlo-letter-mgmt",
    "/common-de": "/olive/publisher/rlo-common-de"
  }

  // serviceMap : {
  //   "default" : "/initiation/publisher",
  //   "/masters" : "/masters/publisher",
  //   "/ui" : "/initiation/publisher"
  // }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
