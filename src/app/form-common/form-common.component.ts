import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
// import { CommonFunctions } from '../common/common-functions';
// import { IGCBMinMaxDateModel } from '../igcb-datepicker/igcb-datepicker.component';
import { appDataProvider } from '../services/appDataProvider.service';
// import { UserAccessEntitlement } from '../services/user-access-entitlement.service';
// import { UtilityService } from '../services/utility.service';
// import { ToolTipError } from '../tooltip-error';
import { FormContext } from './form-context.model';
import { TenantFieldMap } from './tenant-field-map.model';
import { Tenant } from './tenant.model';
// import { ProductFieldMapService } from '../services/product-field-map.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ServiceStock } from '../service-stock.service';
import { UtilityService } from '../services/utility.service';


@Component({
  selector: 'app-form-common',
  templateUrl: './form-common.component.html'
})

export class FormCommonComponent implements OnInit {

  private static env;
  public static initModulesSuccess: Boolean = false;
  public static labelData: Object = new Object();
  public static tenantChangeListener: Subject<Tenant> = new Subject();
  public static globalLookupCache = {};

  @Output() onSave = new EventEmitter<FormContext>();

  // public tooltipError = new ToolTipError();
  public formContext = new FormContext();
  // public userAccessEntitle = new UserAccessEntitlement(null);
  // public pfms = new ProductFieldMapService(null);
  public appService: appDataProvider;
  public flag = 0;
  public tenantFieldMaps: Array<TenantFieldMap> = new Array();
  public serviceName = '';
  public mandatoryMaps: Object = new Object();
  public raSimpleValidationConfig: Array<TenantFieldMap> = new Array<TenantFieldMap>();
  public raSimpleValidationSubject: Subject<Array<TenantFieldMap>> = new Subject();
  public logoPath: string = '';
  public lookupVariables = [];
  public lookupVariableOptions = {};
  // public commonFunctions: CommonFunctions = new CommonFunctions();
  public fileSize = "5000000";
  public rmPageType = "rmDashboard";
  public appPageType = "summaryDashboard";
  public localeText = {
    // for filter panel
    page: this.getLabel('GRID_PAGE'),
    more: this.getLabel('GRID_MORE'),
    to: this.getLabel('GRID_TO'),
    of: this.getLabel('GRID_OF'),
    next: this.getLabel('GRID_NEXT'),
    last: this.getLabel('GRID_LAST'),
    first: this.getLabel('GRID_FIRST'),
    previous: this.getLabel('GRID_PREVIOUS'),
    loadingOoo: this.getLabel('GRID_LOADING'),

    // for set filter
    selectAll: this.getLabel('GRID_SELECT_ALL'),
    searchOoo: this.getLabel('GRID_SEARCH'),
    blanks: this.getLabel('GRID_BLANKS'),

    // for number filter and text filter
    filterOoo: this.getLabel('GRID_FILTER'),
    applyFilter: this.getLabel('GRID_APPLY_FILTER'),
    clearFilter: this.getLabel('GRID_CLEAR_FILTER'),
    equals: this.getLabel('GRID_EQUALS'),
    notEqual: this.getLabel('GRID_NOT_EQUALS'),

    // for number filter
    lessThan: this.getLabel('GRID_LESS_THAN'),
    greaterThan: this.getLabel('GRID_GREATER_THAN'),
    lessThanOrEqual: this.getLabel('GRID_LESS_THAN_OR_EQUAL'),
    greaterThanOrEqual: this.getLabel('GRID_GREATER_THAN_OR_EQUAL'),
    inRange: this.getLabel('GRID_IN_RANGE'),

    // for text filter
    contains: this.getLabel('GRID_CONTAINS'),
    notContains: this.getLabel('GRID_NOT_CONTAINS'),
    startsWith: this.getLabel('GRID_STARTS_WITH'),
    endsWith: this.getLabel('GRID_ENDS_WITH'),

    // filter conditions
    andCondition: this.getLabel('GRID_AND'),
    orCondition: this.getLabel('GRID_OR'),

    // the header of the default group column
    group: this.getLabel('GRID_GROUP'),

    // tool panel
    columns: this.getLabel('GRID_COLUMNS'),
    filters: this.getLabel('GRID_FILTERS'),
    rowGroupColumns: this.getLabel('GRID_PIVOT_COLUMNS'),
    rowGroupColumnsEmptyMessage: this.getLabel('GRID_EMPTY_MSG'),
    valueColumns: this.getLabel('GRID_VALUE_COLUMNS'),
    pivotMode: this.getLabel('GRID_PIVOT_MODE'),
    groups: this.getLabel('GRID_GROUPS'),
    values: this.getLabel('GRID_VALUES'),
    pivots: this.getLabel('GRID_PIVOT'),
    valueColumnsEmptyMessage: this.getLabel('GRID_VALUE_EMPTY_MSG'),
    pivotColumnsEmptyMessage: this.getLabel('GRID_PIVOT_EMPTY_MSG'),
    toolPanelButton: this.getLabel('GRID_TOOL_BUTTONS'),

    // other
    noRowsToShow: this.getLabel('GRID_NO_ROWS'),

    // enterprise menu
    pinColumn: this.getLabel('GRID_PIN_COLUMN'),
    valueAggregation: this.getLabel('GRID_VALUE_AGGR'),
    autosizeThiscolumn: this.getLabel('GRID_AUTOSIZE_THIS_COL'),
    autosizeAllColumns: this.getLabel('GRID_AUTOSIZE_ALL_COLS'),
    groupBy: this.getLabel('GRID_GROUP_BY'),
    ungroupBy: this.getLabel('GRID_UNGROUP_BY'),
    resetColumns: this.getLabel('GRID_RESET_COLS'),
    expandAll: this.getLabel('GRID_EXPANT_ALL'),
    collapseAll: this.getLabel('GRID_COLLAPSE_ALL'),
    toolPanel: this.getLabel('GRID_TOOL_PANEL'),
    export: this.getLabel('GRID_EXPORT'),
    csvExport: this.getLabel('GRID_CSV_EXPORT'),
    excelExport: 'Excel Exporto (.xlsx)',
    excelXmlExport: 'Excel Exporto (.xml)',

    // enterprise menu pinning
    pinLeft: this.getLabel('GRID_PIN_LEFT'),
    pinRight: this.getLabel('GRID_PIN_RIGHT'),
    noPin: this.getLabel('GRID_DONT_PIN'),

    // enterprise menu aggregation and status bar
    sum: this.getLabel('GRID_SUM'),
    min: this.getLabel('GRID_MIN'),
    max: this.getLabel('GRID_MAX'),
    none: this.getLabel('GRID_NONE'),
    count: this.getLabel('GRID_COUNT'),
    average: this.getLabel('GRID_AVERAGE'),

    // standard menu
    copy: this.getLabel('GRID_COPY'),
    copyWithHeaders: this.getLabel('GRID_COPY_WITH_HEADERS'),
    ctrlC: this.getLabel('GRID_CTRL_C'),
    paste: this.getLabel('GRID_PASTE'),
    ctrlV: this.getLabel('GRID_CTRL_V')
  };

  public STAGE_NAMES = {
    RISK_ANALYST: 'RiskAnalyst',
    BA_THRU: 'ThrBusinessApproval',
    BA_TO: 'BusinessApproval',
    CA: 'CommitteApproval',
    RAA: 'RiskApprovalAssignment',
    RA_TO: 'RiskApproval',
    RA_THRU: 'ThrRiskApproval',
    WITHDRAW: 'Withdraw',
    DECLINE: 'Decline',
    SANCTION: 'Sanction'
  };

  taskName: any;
  trnProposalId: string;
  applRefNum: string;
  userId: string;
  taskId: string;
  processId: string;
  custName: string;
  taskDescription: string;
  actualOwner: string;

  constructor(public utility: UtilityService, public services: ServiceStock) {
    // constructor(public services: ServiceStock ) {

    this.appService = utility.getAppService();
    this.logoPath = "assets/images/logo-header.png";
    if (!FormCommonComponent.initModulesSuccess && !this.isOverrideAllowed()) {
      window.location.hash = '/initmodules?redirectHash=' + encodeURIComponent(window.location.hash);
    }
    // this.tooltipError.tooltipdestroy();
    FormCommonComponent.env = environment;

    // RLO Additions
    this.loadLabels();

    // Queries for Kalpesh -- Add to Common Service 
    // utility.getActivatedRoute().queryParams.subscribe(
    //   params => {
    //     this.applRefNum = params['appRefNum'],
    //       this.taskId = params['taskID'],
    //       this.taskName = sessionStorage.getItem('taskName'),
    //       this.processId = params['processID'],
    //       this.custName = params['custName'],
    //       this.userId = sessionStorage.getItem('USERID'),
    //       this.trnProposalId = params['ProposalId'],
    //       this.taskDescription = sessionStorage.getItem('taskDescription'),
    //       this.actualOwner = params['actualOwner'];
    //   });
  }

  isOverrideAllowed() {
    // if(environment.tabletEnv) return true;
    // const allowedOverride = ['#/login', '#/error', '#/initmodules'];
    // let allowOverride = false;
    // allowedOverride.forEach(data => {
    //   if (window.location.hash.indexOf(data) == 0) {
    //     allowOverride = true;
    //   }
    //   if (window.location.hash == '#/') {
    //     allowOverride = true;
    //   }
    // });
    // return allowOverride;
    return true;
  }

  ngOnInit() {

  }

  public getTenantRequest() {
    // Queries for Kalpesh -- Add provide http
    // Tenant Label load
    // return this.utility.getHttpClient().get('assets/labels/' + this.utility.getTenant().tenantName.toLowerCase()
    //   + '_' + this.utility.getTenant().defaultLanguage + '.json');
    // let http: HttpClient;
    // return http.get('dummy');
  }
  public loadLabels() {

    if (!(FormCommonComponent.labelData && FormCommonComponent.labelData['DOCUMENTS'])) { // defaulting to documents key
      // console.log("Not loaded ");
      // sessionStorage.setItem('clo-locale-loaded', 'true');

      this.services.rloui.getJSON('clo_en-IN').subscribe(data => {
        console.log('data ', data);
        this.onLabelDataReady(data);
      });

    } else {
      // console.log("Already loaded ");
    }

    // this.getTenantRequest().subscribe(data => {
    //   this.onLabelDataReady(data);
    // });
  }

  public onLabelDataReady(data: any) {
    for (const key in data) {
      this[key] = data[key];
    }
    FormCommonComponent.labelData = data;
  }

  getLabel(labelKey: string, defaultValue?: string): string {
    return (FormCommonComponent.labelData[labelKey] ? FormCommonComponent.labelData[labelKey] : (defaultValue ? defaultValue : labelKey));
  }

  defaultErrorRequired() {
    return this.getLabel('error.default.required');
  }
  defaultErrorInvalid() {
    return this.getLabel('error.default.invalid');
  }
  getErrorMessage(errorCode?: string, serviceName?: string): string {
    const errMsg = this.getLabel('error.default', 'Error occurred, please contact administrator.');
    if (errorCode) {
      let propErrKey = 'error.default';
      const nonServiceLabel = 'error.' + errorCode;
      propErrKey = nonServiceLabel;
      if (serviceName) {
        propErrKey = 'error.' + serviceName + '.' + errorCode;
      }
      const propErrMsg = this.getLabel(propErrKey);
      return this.getLabel(propErrKey) != propErrKey ? this.getLabel(propErrKey) : (this.getLabel(nonServiceLabel));
    } else { return errMsg; }
  }
  getUdfLabel(labelKey: string): string {
    const filtered = this.tenantFieldMaps.find(data => {
      return (data.fieldName == labelKey);
    });
    let defaultLabel = null;
    if (filtered && filtered.defaultLabel) {
      defaultLabel = filtered.defaultLabel;
    }
    return this.getLabel(this.serviceName + '.' + labelKey, defaultLabel);
  }
  /*
   * This method loads tenant field map metadata based on configuration
   * maintained in CLO_TENANT_FIELD_MAP_MASTER
   */
  public getFormMetadata(serviceName: string, onSuccess?: Function, onError?: Function) {
    this.serviceName = serviceName;
    this.tenantFieldMaps = new Array();

    console.log("Service Name ", serviceName);

    var formFields = this.services.rloui.getFormFields(serviceName);

    formFields.forEach(field => {
      console.log("field ", field);
    });

    // Queries for Kalpesh
    // Validation Services
    // forkJoin(this.utility.getCommonService().getTenantDAValidationDetail(serviceName),
    //   this.utility.getCommonService().LoadTenantDADetails(serviceName)).subscribe(responses => {
    //     if (responses) {
    //       this.raSimpleValidationConfig = new Array<TenantFieldMap>();
    //       if (responses[0] && responses[0]['SERVICE_RESPONSE']) {
    //         this.utility.getCommonService().setTenantDAValidationDetailCache(serviceName, responses[0]);
    //         const elemValues = responses[0]['SERVICE_RESPONSE'];
    //         Object.keys(elemValues).forEach(element => {
    //           if (elemValues[element]) {
    //             const obj = new TenantFieldMap();
    //             const elemsSplStrs = element.split('.');
    //             obj.fieldName = elemsSplStrs[elemsSplStrs.length - 1];
    //             obj.isMandatory = Number(elemValues[element]['MANDATORY']) ? true : false;
    //             obj.regex = elemValues[element]['REGEX'];
    //             obj.domainAttribute = elemValues[element]['FIELD_CODE'];
    //             this.raSimpleValidationConfig.push(obj);
    //           }
    //         });
    //       }
    //       const data = responses[1];
    //       if (data && data['TenantDetails']) {
    //         this.utility.getCommonService().setTenantDADetailsCache(serviceName, responses[1]);
    //         this.tenantFieldMaps = new Array();
    //         data['TenantDetails'].forEach(row => {
    //           const tenantFieldMap = new TenantFieldMap();
    //           tenantFieldMap.tenantName = row['TENANT_NAME'];
    //           tenantFieldMap.formName = row['FORM_NAME'];
    //           tenantFieldMap.fieldName = row['FIELD_NAME'];
    //           tenantFieldMap.isMandatory = Number(row['IS_MANDATORY']) ? true : false;
    //           tenantFieldMap.kType = Number(row['K_TYPE']);
    //           tenantFieldMap.defaultLabel = row['FIELD_LABEL'];
    //           tenantFieldMap.regex = row['REGEX'];
    //           tenantFieldMap.domainAttribute = row['DOMAIN_ATTRIBUTE'];
    //           this.tenantFieldMaps.push(tenantFieldMap);
    //           let raFieldData = this.raSimpleValidationConfig.find(raMaintenance => {
    //             return raMaintenance.fieldName === tenantFieldMap.fieldName;
    //           });
    //           if (raFieldData) {
    //             raFieldData.isMandatory = tenantFieldMap.isMandatory;
    //             raFieldData.regex = tenantFieldMap.regex;
    //             raFieldData.domainAttribute = tenantFieldMap.domainAttribute;
    //           } else {
    //             raFieldData = new TenantFieldMap();
    //             Object.assign(raFieldData, tenantFieldMap);
    //             this.raSimpleValidationConfig.push(raFieldData);
    //           }
    //         });
    //       }
    //     }
    //     this.raSimpleValidationSubject.next(this.raSimpleValidationConfig);
    this.loadDomainAttributes().subscribe(() => {
      if (onSuccess) {
        onSuccess();
      }
    }, error => {
      if (onError) {
        onError(error);
      }
    });
    //   }, error => {
    //     if (onError) {
    //       onError(error);
    //     }
    //   });
  }

  public isMandatory(fieldName: string, defaultRequired?: boolean): boolean {

    let mandatory = true;
    this.raSimpleValidationConfig.forEach(field => {
      if (field.fieldName == fieldName) {
        mandatory = field.isMandatory;
      }
    });
    return mandatory;
  }

  public validateMandatory(value, fieldName): boolean {
    if (this.isMandatory(fieldName) && (!value || (value.trim && !value.trim()))) {
      return false;
    }
    return true;
  }

  public getRegex(fieldName: any): string {
    let regex = null;
    this.raSimpleValidationConfig.forEach(map => {
      if (map.fieldName == fieldName) {
        regex = map.regex;
      }
    });
    return regex;
  }
  public validateRegex(value: any, fieldName: any): boolean {
    let valid = true;
    if (value) {
      this.raSimpleValidationConfig.forEach(map => {
        if (map.fieldName == fieldName) {
          if (map.regex) {
            valid = this.validatePattern(value, map.regex);
          }
        }
      });
    }
    return valid;
  }

  validatePattern(search: any, regex: string): boolean {
    let serchfind: boolean;
    const regexp = new RegExp(regex);
    serchfind = regexp.test(search);
    return serchfind;
  }

  // Discuss with Kalpesh
  // Create Date Model class in common
  validateField(fieldValue, fieldName, minDate?: IGCBMinMaxDateModel, maxDate?: IGCBMinMaxDateModel, uiFieldName?: string) {
    // const tooltip = new ToolTipError();
    // if (!uiFieldName) {
    //   uiFieldName = fieldName;
    // }
    // tooltip.tooltiperrorhide(uiFieldName);
    // if (!tooltip.isFieldVisible(uiFieldName)) {
    //   return;
    // }
    // if (!this.validateMandatory(fieldValue, fieldName)) {
    //   this.flag = 1;
    //   tooltip.tooltiperrorshow(uiFieldName, this.getLabel('error.' +
    //     this.serviceName + '.' + fieldName + '.required', this.getLabel('error.default.required')));
    //   return;
    // }
    // if (!this.validateRegex(fieldValue, fieldName)) {
    //   if (!minDate && !maxDate) {
    //     this.flag = 1;
    //     tooltip.tooltiperrorshow(uiFieldName, this.getLabel('error.' +
    //       this.serviceName + '.' + uiFieldName + '.invalid', this.getLabel('error.default.invalid')));
    //     return;
    //   }
    // }
    // if (fieldValue && (minDate || maxDate)) {
    //   const valid = this.validateDate(fieldValue, minDate, maxDate);
    //   if (!valid) {
    //     this.flag = 1;
    //     tooltip.tooltiperrorshow(uiFieldName, this.getLabel('error.' +
    //       this.serviceName + '.' + fieldName + '.invalid', this.getLabel('error.default.invalid')));
    //     return;
    //   }
    // }
  }

  validateDateField(fieldValue, fieldName, minDate?: IGCBMinMaxDateModel, maxDate?: IGCBMinMaxDateModel) {
    // minDate and maxDate parameters optional for this method
    // const tooltip = new ToolTipError();
    // tooltip.tooltiperrorhide(fieldName);
    // if (!tooltip.isFieldVisible(fieldName)) {
    //   return;
    // }
    // if (!this.validateMandatory(fieldValue, fieldName)) {
    //   this.flag = 1;
    //   tooltip.tooltiperrorshow(fieldName, this.getLabel('error.' +
    //     this.serviceName + '.' + fieldName + '.required', this.getLabel('error.default.required')));
    //   return;
    // }
    // if (fieldValue) {
    //   const valid = this.validateDate(fieldValue, minDate, maxDate);
    //   if (!valid) {
    //     this.flag = 1;
    //     tooltip.tooltiperrorshow(fieldName, this.getLabel('error.' +
    //       this.serviceName + '.' + fieldName + '.invalid', this.getLabel('error.default.invalid')));
    //     return;
    //   }
    // }
  }

  public validateDate(date: Date, minDate: IGCBMinMaxDateModel, maxDate: IGCBMinMaxDateModel): boolean {
    if (date && !(date instanceof Date)) {
      const momentDate = window['moment']
        (date, ['DD-MMM-YYYY', 'YYYY-MM-DD HH:mm:ss.S', 'YYYY-MM-DDTHH:mm:ssZ', 'YYYY-MM-DD HH:mm:SS.s', 'YYYYMMDD', 'DDMMYYYY'], true);
      if (momentDate.isValid()) {
        date = momentDate._d;
      } else {
        return false;
      }
    }
    if (!date || !(date instanceof Date)) { return false; }
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    let minTime = 0;
    let maxTime = 0;
    if (minDate) {
      minTime = minDate.getDate().getTime();
    } else {
      minTime = new Date("January 01, 1900").getTime();
    }
    if (maxDate) {
      maxTime = maxDate.getDate().getTime();
    }
    const selTime = date.getTime();
    const dateMatchesMinMax = (!minTime || (selTime >= minTime)) && (!maxTime || (selTime <= maxTime));
    if (dateMatchesMinMax) {
      return true;
    }
    return false;
  }

  getPlaceholder(jsonName) {
    const labelKey = "placeholder." + this.serviceName + "." + jsonName;
    const labelRespKey = this.getLabel(labelKey);
    return (labelRespKey != labelKey ? labelRespKey : "");
  }

  getK4Fields() {
    return this.tenantFieldMaps.filter(map => {
      return map.kType == 4;
    });
  }

  getFieldErrorMessageRequired(serviceName: string, fieldName: string): string {
    return this.getLabel('error.' +
      serviceName + '.' + fieldName + '.required', this.getLabel('error.default.required'));
  }

  getFieldErrorMessageInvalid(serviceName: string, fieldName: string): string {
    return this.getLabel('error.' +
      serviceName + '.' + fieldName + '.invalid', this.getLabel('error.default.invalid'));
  }

  setLogo() {
    // @CLO-RLO-Merge - Not Required AS of Now
    // this.logoPath = this.utility.getTenant().logoUrl;
  }

  getKeycloakInfo() {
    // return this.utility.getHttpClient().get("assets/json/keycloak.json");
  }

  public getLookupService(domainObjectName: string, pageNumber: number = 0, term: boolean = true, parameters?: Map<string, string>) {
    // if (FormCommonComponent.globalLookupCache[domainObjectName]) {
    //   return new Observable((resolve) => {
    //     resolve.next({ 'Data': FormCommonComponent.globalLookupCache[domainObjectName] });
    //     resolve.complete();
    //   });
    // } else {

    console.log("---------------------- CLO - getLookupService ", domainObjectName, pageNumber, term, parameters);


    // @CLO-RLO-Merge - Single line comment - Discuss with Kalpesh
    // Gets called for each dropdown
    return this.utility.getCommonService().getLookupData(domainObjectName, pageNumber, term, parameters);


    // }
  }

  public setLookupService(domainObjectName: string, pageNumber: number = 0, term: boolean = true, parameters?: Map<string, string>
    , lookupName?: string) {
    this.getLookupService(domainObjectName, pageNumber, term, parameters).subscribe(data => {
      console.warn("form common.comp.ts....", data);
      if (data && data['Data']) {
        if (lookupName) {
          this.lookupVariableOptions[lookupName] = data['Data'];

        } else {
          this.lookupVariableOptions[domainObjectName] = data['Data'];
        }
      }
    });
  }

  public loadDomainAttributes() {
    return new Observable((resolve) => {
      const domainAttributeSubjects = [];
      if (this.lookupVariables && this.lookupVariables.length > 0) {
        this.lookupVariables.forEach(elem => {
          domainAttributeSubjects.push(this.getLookupService(elem));
        });
        forkJoin(domainAttributeSubjects).subscribe(responses => {
          if (responses && responses.length === this.lookupVariables.length) {
            responses.forEach((reponse, i) => {
              if (reponse && reponse['Data']) {
                this.lookupVariableOptions[this.lookupVariables[i]] = reponse['Data'];
                FormCommonComponent.globalLookupCache[this.lookupVariables[i]] = reponse['Data'];
              }
            });
          }
          resolve.next(responses);
          resolve.complete();
        }, error => {
          resolve.next(error);
          resolve.error(error);
        });
      } else {
        resolve.next([]);
        resolve.complete();
      }
    });
  }

  // public getUtility(): UtilityService {
  //   return this.utility;
  // }

  updateContext(context) {
    this.formContext.context = context;
    this.onSave.emit(this.formContext);
  }

  public navigateToHome(router) {
    router.navigate(['/home']);
    sessionStorage.removeItem("taskName");
  }

  // public getCommonFunction() {
  //   return this.commonFunctions;
  // }


  public getEnvironmentProp() {
    return FormCommonComponent.env;
  }

  public isTabletEnv() {
    return FormCommonComponent.env.tabletEnv;
  }

}


/**
 * 
 * RLO Integration Addition - moved from different locations
 */

// Moved from igcb-datepicker.component.ts
export class IGCBMinMaxDateModel {
  year: number;
  month: number;
  day: number;

  constructor(d: number, m: number, y: number) {
    this.year = y;
    this.month = m;
    this.day = d;
  }

  getDate(): Date {
    let date = new Date(this.year, this.month - 1, this.day);
    return date;
  }
}

// Moved from igcb-datepicker.component.ts
export class IGCBMinMaxOffsetModel extends IGCBMinMaxDateModel {

  constructor(date: Date, dateOffset: number) {
    let inputDate = date;
    let outputDate = new Date(inputDate.getTime() + ((1000 * 60 * 60 * 24) * (dateOffset)));
    super(outputDate.getDate(), outputDate.getMonth() + 1, outputDate.getFullYear());
  }
}
