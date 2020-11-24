// This file can be replaced during build by using the fileReplacements array.
// ng build ---prod replaces environment.ts with environment.prod.ts.
// The list of file replacements can be found in angular.json.

export const environment = {
  production: false,
  // baseURL: 'http://10.11.12.26:8180/olive/'
  // baseURL: "http://10.11.12.19:18180" //Mumbai
   baseURL: 'http://10.11.12.53:9090', // LOCAL
  // baseURL: 'https://rlfc.intellectseecapps.com', //LIVE
  //  baseURL: 'http://10.11.10.42:20052',
     enableKeycloak: false,
  //  authURL: 'https://iam.intellectseecapps.com/auth',
   authURL: 'http://10.11.12.15:18080/auth',
  //authURL: 'https://iam.intellectqacloud.com/auth', // QA
  //  realm: 'ecpvdev',
  // realm: 'dabank', // QA
  // clientId: 'fabric',
  realm: 'rlorealm',
  clientId: 'rloclient',
  redirectURL: 'http://localhost:1841/#/home/LANDING',

  //DIT
  serviceMap : {
    "default" : "/olive/publisher",
    "/masters" : "/masters",
    "/ui" : "/olive/publisher",
    "/los-wf" : "/los-wf/",
    "/initiation": "/olive/publisher",
    "/rlo-de" : "/olive/publisher",
   "/los-integrator":"/los-integrator",
    "/lettermangement" :"/lettermangement/publisher",
    "los-verification":"/los-verification",
    "/common-de": "/los-verification"
  }

  //Canara
  // serviceMap: {
  //   "default": "/olive/publisher/rlo-initiation",
  //   "/masters": "/olive/publisher/rlo-masters",
  //   "/ui": "/olive/publisher/rlo-initiation",
  //   "/los-wf": "/los-wf/rest",
  //   "/initiation": "/olive/publisher/rlo-initiation",
  //   "/rlo-de": "/olive/publisher/rlo-data-enrich",
  //   "/los-integrator": "/los-integrator",
  //   "/lettermangement" :"/olive/publisher/rlo-letter-mgmt",
  //   "/common-de": "/olive/publisher/rlo-common-de"
  // }

  //IUT
  // serviceMap: {
  //   "default": "/initiation/publisher",
  //   "/masters": "/masters/publisher",
  //   "/ui": "/initiation/publisher",
  //   "/los-wf": "/los-wf/rest",
  //   "/initiation": "/initiation/publisher",
  //   "/rlo-de": "/rlo-de/publisher",
  //   "/los-integrator": "/los-integrator",
  //   "/lettermangement" :"/lettermangement/publisher",
  // "los-verification":"/los-verification"
  // }

  // serviceMap : {
  //   "default" : "/initiation/publisher",
  //   "/masters" : "/masters/publisher",
  //   "/ui" : "/initiation/publisher"
  // }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as zone.run/zoneDelegate.invokeTask by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

