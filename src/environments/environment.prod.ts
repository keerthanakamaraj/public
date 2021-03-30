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

  // fincloud - sandbox
  serviceMap: {
    'default': '/sandbox5/initiation/publisher',
    '/masters': '/sandbox5/masters/publisher',
    '/ui': '/sandbox5/initiation/publisher',
    '/los-wf': '/sandbox5/los-wf/rest',
    '/initiation': '/sandbox5/initiation/publisher',
    '/rlo-de': '/sandbox5/rlo-de/publisher',
    '/los-integrator': '/sandbox5/los-integrator',
    '/lettermangement' : '/sandbox5/lettermangement/publisher',
    '/common-de': '/sandbox5/common-de/publisher',
    '/los-verification': '/sandbox5/common-de'
  }
};
