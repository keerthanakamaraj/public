import { Injectable } from '@angular/core';
import { RoutingService } from './routing-service';
import { ProvidehttpService } from './providehttp.service';
import { Data } from './DataService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AlertsService } from './AlertsService';

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
    public alert: AlertsService) { }

    formatAmount(number , languageCode , minFraction) {
      return number.toLocaleString(languageCode, { minimumFractionDigits: minFraction});
    }
}
