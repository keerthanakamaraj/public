import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appDataProvider } from './appDataProvider.service';
import { CLOCommonService } from '../core-rest/clo-common';
import { CLOEnrichService } from '../core-rest/clo-enrich';
// import { CLOInitiationsService } from '../core-rest/clo-init';
// import { CLOUnderwritingService } from '../core-rest/clo-underwriting';
// import { Tenant } from '../form-common/tenant.model';
// import { ProvidehttpService } from './providehttp.service';
// import { IamService } from '../iam-service/iam.service';
// import { SpinnerVisibilityService } from 'ng-http-loader';
// import { HttpCancelService } from './http.cancel.service';
// import { AppSettings } from '../appsettings.component';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
// import { AmountCurrencyPipe } from '../pipes/amount-currency.pipe';
import * as _ from 'lodash';
// import { ArxService } from '../arx-service/arx.service';
declare var moment: any;
// import { PercentagePipe } from '../pipes/percentage.pipe';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private httpClient: HttpClient, 
    private router: Router,
    // private tenant: Tenant, 
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe, 
    private appService: appDataProvider,
    // private httpService: ProvidehttpService, 
    private common: CLOCommonService,
    // private initiate: CLOInitiationsService, 
    private enrichment: CLOEnrichService,
    // private underwrite: CLOUnderwritingService, 
    // private iam: IamService,
    // private spinner: SpinnerVisibilityService, 
    // private httpCancelService: HttpCancelService,
    // private appSettings: AppSettings, 
    private datepickerConfig: NgbDatepickerConfig,
    private injector: Injector, 
    private resolver: ComponentFactoryResolver,
    private formBuilder: FormBuilder, 
    private sanitizer: DomSanitizer,
    // private currencyPipe: AmountCurrencyPipe, 
    // private arx: ArxService, 
    // private percentagePipe: PercentagePipe
  ) { }

  public getHttpClient(): HttpClient {
    return this.httpClient;
  }

  public getRouter(): Router {
    return this.router;
  }

  // public getTenant(): Tenant {
  //   return this.tenant;
  // }

  public getActivatedRoute(): ActivatedRoute {
    return this.activatedRoute;
  }

  public getDatePipe(): DatePipe {
    return this.datePipe;
  }

  public getAppService(): appDataProvider {
    return this.appService;
  }

  // public getHttpService(): ProvidehttpService {
  //   return this.httpService;
  // }

  public getCommonService(): CLOCommonService {
    return this.common;
  }

  // public getInitiateService(): CLOInitiationsService {
  //   return this.initiate;
  // }

  public getEnrichmentService(): CLOEnrichService {
    return this.enrichment;
  }

  // public getUnderwriteService(): CLOUnderwritingService {
  //   return this.underwrite;
  // }

  // public getIamService(): IamService {
  //   return this.iam;
  // }

  // public getArxService(): ArxService {
  //   return this.arx;
  // }

  // public getSpinner(): SpinnerVisibilityService {
  //   return this.spinner;
  // }

  // public getHttpCancelService(): HttpCancelService {
  //   return this.httpCancelService;
  // }

  // public getAppSettings(): AppSettings {
  //   return this.appSettings;
  // }

  public getDatepickerConfig(): NgbDatepickerConfig {
    return this.datepickerConfig;
  }

  public getInjector(): Injector {
    return this.injector;
  }

  public getComponentFactoryResolver(): ComponentFactoryResolver {
    return this.resolver;
  }

  public getFormBuilder(): FormBuilder {
    return this.formBuilder;
  }

  public getSanitizer(): DomSanitizer {
    return this.sanitizer;
  }

  // public getCurrencyPipe() {
  //   return this.currencyPipe;
  // }

  // formatAmount(value: any) {
  //   return this.currencyPipe.transform(value);
  // }

  formatDate(dateString: string, dateFormat?: string): string {
    // const momentDate = moment(dateString, dateFormat ? dateFormat : this.tenant.getMomentDateTimeFormat());
    const momentDate = moment(dateString);
    if (momentDate.isValid()) {
      return this.formatDateObject(momentDate._d);
    }
    return dateString;
  }

  formatDateObject(dateObject: Date) : string {
    // const tenantDetail = this.tenant;
    // return this.datePipe.transform(dateObject, tenantDetail.dateFormat, tenantDetail.timeZone, tenantDetail.defaultLanguage);
    const dateTrans = this.datePipe.transform(dateObject, 'DDMMMYYYY', '0530', 'en-IN');
    return;
  }

  public format(...values: any[]) : string {
    var index = 0, token = '';
    var format = arguments[0], values = _.drop(arguments);
    _.forEach(values, function (value) {
      token = '{' + index + '}';
      format = format.split(token).join(value);
      index++;
    });
    return format;
  }

  // public isDateEqual(dateOne: Date, dateTwo: Date) {
  //   return this.formatDateObject(dateOne) === this.formatDateObject(dateTwo);
  // }

  padLeft(text, padChar, size) {
    return (String(padChar).repeat(size) + text).substr((size * -1), size);
  }
  // getPercentageValue(value: any) {
  //   return this.percentagePipe.transform(value);
  // }
}
