// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  name: 'canara SIT',
  production: true,
  // baseURL: 'http://10.11.12.53:9090', // LOCAL
  // baseURL: 'http://10.11.10.42:20052', // Canara IUT
  baseURL: window.location.origin,
  enableKeycloak: false,
  // authURL: 'https://iam.intellectseecapps.com/auth', // IUT
  authURL: 'http://10.11.12.15:18080/auth', // Demo 1
  realm: 'rlorealm',
  clientId: 'rloclient',
  // redirectURL: 'http://localhost:1841/#/home/LANDING',
  redirectURL: window.location.hash.replace('#/', '') === '' ? window.location.href + '#/home/LANDING' : window.location.href,
  arxAuthURL: 'http://tcldemoapp41.intellectdesign.com:20023/ARXAL/AALIndex.jsp',
  arxLogoutURL: 'http://tcldemoapp41.intellectdesign.com:20023/ARXAuth/AALLogout.jsp',

  serviceMap: {
    'default': '/olive/publisher/rlo-initiation',
    '/masters': '/olive/publisher/rlo-masters',
    '/ui': '/olive/publisher/rlo-initiation',
    '/los-wf': '/los-wf/rest',
    '/initiation': '/olive/publisher/rlo-initiation',
    '/rlo-de': '/olive/publisher/rlo-data-enrich',
    '/los-integrator': '/los-integrator',
    '/lettermangement' : '/olive/publisher/rlo-letter-mgmt',
    '/common-de': '/olive/publisher/rlo-common-de'
  }

};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
