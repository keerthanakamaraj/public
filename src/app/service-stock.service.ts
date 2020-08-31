import { Injectable } from '@angular/core';
import { RoutingService } from './routing-service';
import { ProvidehttpService } from './providehttp.service';
import { Data } from './DataService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AlertsService } from './AlertsService';
import { RlouiService } from './rlo-services/rloui.service';
import { RloUtilService } from './rlo-services/rloutil.service';
import { RloCommonData } from './rlo-services/rloCommonData.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceStock {

  constructor(public routing: RoutingService,
    public http: ProvidehttpService,
    public dataStore: Data,
    public modal: NgbModal,
    public translate: TranslateService,
    public router: Router,
    public alert: AlertsService,
    public rloui: RlouiService,
    public rloutil: RloUtilService,
    public rloCommonData: RloCommonData) { }

  formatAmount(number, languageCode, minFraction,hideSymbol) {
    //return number.toLocaleString(languageCode, { minimumFractionDigits: minFraction});
    return this.rloui.formatAmount(number, languageCode, minFraction, null,hideSymbol);
  }

  formatDate(date) {
    return this.rloui.formatDate(date);
  }

  formatDateTime(date) {
    return this.rloui.formatDateTime(date);
  }
}
