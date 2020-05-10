import { Injectable } from '@angular/core';
import { RoutingService } from './routing-service';
import { ProvidehttpService } from './providehttp.service';
import { Data } from './DataService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AlertsService } from './AlertsService';
import { RlouiService } from './rlo-services/rloui.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceStock {

  constructor(public routing: RoutingService, 
    public http: ProvidehttpService, 
    public dataStore: Data, 
    public modal: NgbModal,
    public translate : TranslateService,
    public router: Router,
    public alert: AlertsService,
    public rloui: RlouiService) { }

    formatAmount(number , languageCode , minFraction) {
      //return number.toLocaleString(languageCode, { minimumFractionDigits: minFraction});
      return this.rloui.formatAmount(number, languageCode, minFraction, null);
    }

    formatDate(date){
      return this.rloui.formatDate(date);
    }

    formatDateTime(date){
      return this.rloui.formatDateTime(date);
    }
}
