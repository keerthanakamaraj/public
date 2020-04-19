export const environment = {
  production: true,
  // baseURL: window.location.origin + '/olive/'
  baseURL: window.location.origin,
  // baseURL: 'http://10.11.12.53:9090',
  authURL: 'https://iam.intellectseecapps.com/auth',
  realm: 'ecpvdev',
  clientId: 'fabric',
  // redirectURL: 'http://localhost:1841/#/home/LANDING'
  redirectURL: window.location.hash.replace("#/","") == "" ? window.location.href + "#/home/LANDING" : window.location.href
};
