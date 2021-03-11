export const environment = {
  production: true,
  // baseURL: window.location.origin + '/olive/'
  baseURL: window.location.origin,
  // baseURL: 'http://10.11.12.53:9090',
  authURL: 'https://iam.intellectseecapps.com/auth',
  // realm: 'ecpvdev',
  enableKeycloak: true,
  realm: window.location.hostname.split('.')[0],
  clientId: 'fabric',
  // redirectURL: 'http://localhost:1841/#/home/LANDING'
  redirectURL: window.location.hash.replace('#/', '') === '' ? window.location.href + '#/home/LANDING' : window.location.href,
  arxAuthURL: 'http://tcldevapp173.intellectdesign.com:10751/ARXAL/AALIndex.jsp',
  arxLogoutURL: 'http://tcldevapp173.intellectdesign.com:10751/ARXAuth/AALLogout.jsp',

  serviceMap : {
    'default' : '/initiation/publisher',
    '/masters' : '/masters/publisher',
    '/ui' : '/initiation/publisher',
    '/los-wf' : '/los-wf/rest',
    '/initiation': '/initiation/publisher',
    '/rlo-de' : '/rlo-de/publisher',
    '/los-integrator': '/los-integrator',
    '/lettermangement': '/lettermangement/publisher',
    'los-verification': '/los-verification',
    '/common-de': '/common-de/publisher'
  }
};
