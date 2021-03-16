export const environment = {
  production: true,
  // baseURL: window.location.origin + '/olive/'
  baseURL: window.location.origin,
  // baseURL: 'http://10.11.12.53:9090',
  authURL: 'https://iam.intellectseecapps.com/auth',
  // realm: 'ecpvdev',
  enableKeycloak: false,
  realm: window.location.hostname.split('.')[0],
  clientId: 'fabric',
  // redirectURL: 'http://localhost:1841/#/home/LANDING'
  redirectURL: window.location.hash.replace('#/', '') === '' ? window.location.href + '#/home/LANDING' : window.location.href,
  // ARX
  arxAuthURL: 'https://www.ifincloud.io/ARXAL/AALIndex.jsp',
  arxLogoutURL: 'https://www.ifincloud.io/ARXAuth/AALLogout.jsp',

  // fincloud - dev
  serviceMap: {
    'default': '/dev/initiation/publisher',
    '/masters': '/dev/masters/publisher',
    '/ui': '/dev/initiation/publisher',
    '/los-wf': '/dev/los-wf/rest',
    '/initiation': '/dev/initiation/publisher',
    '/rlo-de': '/dev/rlo-de/publisher',
    '/los-integrator': '/dev/los-integrator',
    '/lettermangement' : '/dev/lettermangement/publisher',
    '/common-de': '/dev/common-de',
    '/los-verification': '/dev/common-de'
  }
};
