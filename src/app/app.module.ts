import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
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

import { EloginComponent } from './elogin/elogin.component';
import { FooterComponent } from './footer/footer.component';
import { EloginAuthComponent } from './elogin-auth/elogin-auth.component';
//import { LogoutComponent } from './logout/logout.component';
import { PopupModule } from './popup/popup.module';

// import { RemarksComponent } from './remarks/remarks.component';
// import { LoginPageComponent } from './login-page/login-page.component';
// import { PwdChangeComponent } from './pwd-change/pwd-change.component';


import { GridWithFormComponent } from './grid-with-form/grid-with-form.component';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { PopupContentComponent } from './popup-content/popup-content.component';
import { AlertsComponent } from './alerts/alerts.component';
import { MyTrayPageComponent } from './my-tray-page/my-tray-page.component';
import { LandingComponent } from './landing/landing.component';
import { HomeRoutingModule } from './home/home-routing.module';
import { MainHeaderComponent } from './main-header/main-header.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LandingComponent,
     },
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
]

@NgModule({
  declarations: [
    AppComponent,
    EloginComponent,
    FooterComponent,
    EloginAuthComponent,
    PageNotFoundComponent,
    LandingComponent,
    MainHeaderComponent,
    // LogoutComponent,
    // LoginPageComponent,
    // PwdChangeComponent,
    GridWithFormComponent,
    AlertsComponent,
    MyTrayPageComponent
  ],
  exports: [
    FooterComponent
],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { useHash: true}),
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    NgbModalModule,
    Ng4LoadingSpinnerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    PopupModule,
  ],
  providers: [
    Data,
    RoutingService,
    RefreshSidebarService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupModalComponent,
    PopupContentComponent
  ],
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}