import { Component, OnInit, Injector } from '@angular/core';
import { ProvidehttpService } from '../providehttp.service';
import { environment } from 'src/environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { HttpResponse } from '@angular/common/http';
import { ARXService } from '../rlo-services/arxservice.service';
const keycloakService = new KeycloakService();
export let AppInjector: Injector;
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public http: ProvidehttpService) { }

  ngOnInit() {
  }

  goToLogin() {
    let config = {
      url: environment.authURL, realm: environment.realm, clientId: environment.clientId
    }

    let initOptions = {
      redirectUri: environment.redirectURL
    };

    if (environment.enableKeycloak) {
      keycloakService
        .init({ config, enableBearerInterceptor: true })
        .then((auth) => {
          console.log('[ngDoBootstrap] bootstrap app');
          if (!auth) {
            keycloakService.login({ redirectUri: initOptions.redirectUri });
          } else {

            const k = keycloakService.getKeycloakInstance();
            if (k.token) {
              sessionStorage.setItem('TOKEN', k.token);
            }

            keycloakService.loadUserProfile().then((profile) => {
              console.log("User Profile ", profile);
              sessionStorage.setItem('userId', profile.username);

              let fullName = (profile.firstName ? profile.firstName : "") + " " + (profile.lastName ? profile.lastName : "");
              sessionStorage.setItem('fullName', fullName);

              if (profile["attributes"] && profile["attributes"].tenantId) {
                sessionStorage.setItem('tenants', profile["attributes"].tenantId.join(","));
              }
            });
            // appRef.bootstrap(AppComponent);
          }
        })
        .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
    } else {
      const arxservice = AppInjector.get(ARXService);

      arxservice.getUserInfo().subscribe(
        async (httpResponse: HttpResponse<any>) => {
          const userInfo = httpResponse['userInfo'];

          sessionStorage.setItem('userId', userInfo.ViewUserInfo.userId);
          sessionStorage.setItem('fullName', userInfo.ViewUserInfo.firstName + ' ' + userInfo.ViewUserInfo.lastName);
          sessionStorage.setItem('lastloginDate', userInfo.ViewUserInfo.lastLoginDate);

          // appRef.bootstrap(AppComponent);
        },
        async (errorResponse: HttpResponse<any>) => {
          window.location.href = environment.arxAuthURL;
        }
      );
    }
  }
}
