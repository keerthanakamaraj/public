import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef, Injector } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient, HttpResponse } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Data } from './DataService';
import { RoutingService } from './routing-service';
import { RefreshSidebarService } from './refreshSidebar.service';
import { HttpResponseInceptor } from './http.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// import { EloginComponent } from './elogin/elogin.component';
import { FooterComponent } from './footer/footer.component';
// import { EloginAuthComponent } from './elogin-auth/elogin-auth.component';
//import { LogoutComponent } from './logout/logout.component';
import { PopupModule } from './popup/popup.module';

// import { RemarksComponent } from './remarks/remarks.component';
// import { LoginPageComponent } from './login-page/login-page.component';
// import { PwdChangeComponent } from './pwd-change/pwd-change.component';


import { GridWithFormComponent } from './grid-with-form/grid-with-form.component';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { PopupContentComponent } from './popup-content/popup-content.component';
import { AlertsComponent } from './alerts/alerts.component';
//import { MyTrayPageComponent } from './my-tray-page/my-tray-page.component';
//import { LandingComponent } from './landing/landing.component';
import { HomeRoutingModule } from './home/home-routing.module';
//import { MainHeaderComponent } from './main-header/main-header.component';

import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { MyTrayGridModule } from './MyTrayGrid/MyTrayGrid.module';
import { PopupAlertComponent } from './popup-alert/popup-alert.component';
import { RloUiCardFieldModule } from './rlo-ui-card-field/rlo-ui-card-field.module';
import { NotepadDetailsFormComponent } from './NotepadDetailsForm/NotepadDetailsForm.component';
import { NotepadDetailsFormModule } from './NotepadDetailsForm/NotepadDetailsForm.module';
import { PopUpAlertModule } from './popup-alert/popup-alert-module';
import { DatePipe } from '@angular/common';
import { appDataProvider } from './services/appDataProvider.service';
import { WorkflowViewerModule } from './workflow-viewer/workflow-viewer.module';
import { CachingInterceptor } from './Cache-Interceptor/CachingInterceptor';
import { RloUiCustomerSearchComponent } from './rlo-ui-customer-search/rlo-ui-customer-search.component';
import { ARXService } from './rlo-services/arxservice.service';
import { CustomerSearchGridBtnComponent } from './customer-search-grid-btn/customer-search-grid-btn.component';
//import { CustomerSearchFieldsComponent } from './customer-search-fields/customer-search-fields.component';
// import { RloUiCardTileComponent } from './rlo-ui-card-tile/rlo-ui-card-tile.component';
// import { MyTrayGridModule } from './MyTrayGrid/MyTrayGrid.module';
// import { MyTrayGridComponent } from './MyTrayGrid/MyTrayGrid.component';
// import { ReadonlyGridComponent } from './readonly-grid/readonly-grid.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/',
    //redirectTo: 'login/elogin',
    //redirectTo: 'home/LANDING', // TODO: Revert Changes after Login
    pathMatch: 'full'
  },
  // {
  //   path: 'login',
  //   component: LandingComponent,
  //    },
  // {
  //   path: 'EPWDCHGN',
  //   //canActivate: [ProvidehttpService],
  //   component: PwdChangeComponent
  // },
  // {
  //   path: 'logout',
  //   component: LogoutComponent
  // },

  {
    path: 'home',
    loadChildren: 'src/app/home/home.module#HomeModule',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

const keycloakService = new KeycloakService();
// const arxService = new ARXService();

export let AppInjector: Injector;

@NgModule({
  declarations: [
    AppComponent,
    // EloginComponent,
    FooterComponent,
    // EloginAuthComponent,
    PageNotFoundComponent,
    // LandingComponent,
    // MainHeaderComponent,
    // LogoutComponent,
    // LoginPageComponent,
    // PwdChangeComponent,
    GridWithFormComponent,
    AlertsComponent,
    CustomerSearchGridBtnComponent
    //CustomerSearchFieldsComponent,
    // RloUiCardTileComponent
    //MyTrayPageComponent
    // MyTrayGridComponent,
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { useHash: true, scrollPositionRestoration: 'enabled' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    NgbModalModule,
    MyTrayGridModule,
    RloUiCardFieldModule,
    WorkflowViewerModule,
    Ng4LoadingSpinnerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    PopupModule,
    PopUpAlertModule
  ],
  providers: [
    Data,
    RoutingService,
    RefreshSidebarService,
    DatePipe,
    appDataProvider,
    FormBuilder,
    {
      provide: KeycloakService,
      useValue: keycloakService
    },
    ARXService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },

  ],
  //bootstrap: [AppComponent],
  entryComponents: [
    AppComponent,
    PopupModalComponent,
    PopupContentComponent,
    PopupAlertComponent,
    CustomerSearchGridBtnComponent
  ],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
  ngDoBootstrap(appRef: ApplicationRef): void {
    let config = {
      //url: 'http://localhost:8080/auth', realm: 'demo', clientId: 'angular-test-app'
      url: environment.authURL, realm: environment.realm, clientId: environment.clientId
    }

    let initOptions = {
      redirectUri: environment.redirectURL
    };

    if(environment.enableKeycloak) {
    keycloakService
      .init({ config, enableBearerInterceptor: true })
      .then((auth) => {
        console.log('[ngDoBootstrap] bootstrap app');
        if (!auth) {
          keycloakService.login({ redirectUri: initOptions.redirectUri });
        } else {

          const k = keycloakService.getKeycloakInstance();
          if( k.token ){
            sessionStorage.setItem('TOKEN', k.token );
          }


          //console.log('Username: ', keycloakService.getUsername());
          // keycloakService.getToken().then( (token) => {
            // console.log("token " + token);
            // TODO: remove Token from sessionstorage after Document upload Integration
            // sessionStorage.setItem('TOKEN', token);
          // });
          keycloakService.loadUserProfile().then((profile) => {
            console.log("User Profile ", profile);
            sessionStorage.setItem('userId', profile.username);

            let fullName = (profile.firstName ? profile.firstName : "") + " " + (profile.lastName ? profile.lastName : "");
            sessionStorage.setItem('fullName', fullName);

            if (profile["attributes"] && profile["attributes"].tenantId) {
              sessionStorage.setItem('tenants', profile["attributes"].tenantId.join(","));
            }

          })
          appRef.bootstrap(AppComponent);
        }
      })
      .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
    } else {

      const arxservice = AppInjector.get(ARXService);

      // console.log("ARX Service ", arxservice);

      arxservice.getUserInfo().subscribe(
        async (httpResponse: HttpResponse<any>) => {
          // console.log("ARX User Info ", httpResponse);

          const userInfo = httpResponse['userInfo'];

          // console.log('userinfo ', userInfo);

          // sessionStorage.setItem('userId', "vishal.kardode@intellectdesign.com");
          // sessionStorage.setItem('fullName', "Vishal Kardode" );

          if(userInfo && userInfo.ViewUserInfo){
            sessionStorage.setItem('userId', userInfo.ViewUserInfo.userId);
            sessionStorage.setItem('fullName', userInfo.ViewUserInfo.firstName + ' ' + userInfo.ViewUserInfo.lastName);
            sessionStorage.setItem('lastloginDate', userInfo.ViewUserInfo.lastLoginDate);

            appRef.bootstrap(AppComponent);
          } else {
            window.location.href = environment.arxAuthURL;
          }

        },
        async (errorResponse: HttpResponse<any>) => {
          // Error from Service - open ARX login page
          // TODO: Enhance Logout Experiance
          window.location.href = environment.arxAuthURL;
          // console.log("error occured while fething user info" , errorResponse);

        }
      );
    }

  }
}

// export class AppModule implements DoBootstrap{
//   ngDoBootstrap(appRef: ApplicationRef){
//     appRef.bootstrap(AppComponent);
//   }
// }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
