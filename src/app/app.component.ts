import { Component, OnInit, Output, HostListener, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { componentRoutes } from './route-mapping';
import { PopupContentComponent } from './popup-content/popup-content.component';
import { ServiceStock } from './service-stock.service';
import { AlertsComponent } from './alerts/alerts.component';
import { RlouiService } from './rlo-services/rloui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('appAlerts', { static: false }) appAlerts: AlertsComponent;

  switchLanguage(language: string) {
    this.services.translate.use(language);
  }

  constructor(public services: ServiceStock, private router: Router, private rloui: RlouiService) {
    for (var i = 0; i < componentRoutes.length; i++) {
      let route = componentRoutes[i];
      let path = route.path;
      let loadChildren = route.loadChildren;


      for (var j = 1; j < 3; j++) {
        let pushValue = {};
        pushValue['path'] = path;
        pushValue['outlet'] = 'popUp' + j;
        pushValue['component'] = PopupContentComponent;
        pushValue['children'] = [
          {
            path: 'popup',
            loadChildren: loadChildren,
          }
        ];
        this.router.config.unshift(pushValue);
      }

    }
    console.error("------");
    this.services.translate.setDefaultLang('En');
  }

  //tfacompletedValue : any;

  ngOnInit() {
    // this.router.navigate(["login/elogin"]);
    this.services.alert.checkForAlerts.subscribe(
      (data) => {
        this.appAlerts.showAlert(data["alertType"], data["alertMsg"], data["timeout"]);
      }
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    if (this.services.http.tfaapplet != undefined && this.services.http.tfaapplet != null) {
      (window as any).logoutFromSmartCard(this.services.http.tfaapplet);
    }
  }


}
