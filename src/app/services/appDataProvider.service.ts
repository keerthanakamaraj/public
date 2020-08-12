import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
// import 'rxjs/add/operator/filter';
// import { Subject } from 'rxjs/Subject';
// import { ApplicationDetails } from '../application-details/application-details.model';
// import { Alert, AlertNotification } from '../alert-notification/alert-notification.model';

@Injectable()
export class appDataProvider {
  selectedCollateral = new BehaviorSubject<string>(null);
  productDtlsArray = new Array<any>();
  firmVintageDiff: any;
  agediff: any;
  // applicationDetail: ApplicationDetails;
  userId: string;
  appRefNumber: string;
  custName: string;
  taskID: string;
  taskName: string;
  processID: string;
  currentTaskId: string;
  bpmStatus: string;
  taskOwner: string;
  ICIFNum: string;
  CIFNum: string;
  proposalEditFlag: string;
  applicationActionMode: string;
  custType: string;
  custSubType: string;
  AppFormNum: string;
  CADLocation: string;
  assignRA: string;
  ProposalId: string;
  CADLocationList = [];
  borrowersList = new Array<Object>();
  productDetails = new Array<Object>();
  borrowerCompany: boolean = false;
  coBorrowerCompany: boolean = false;
  quarenterCompany: boolean = false;
  borrowerIndividual: boolean = false;
  coBorrwQuarIndividualPromoter: boolean = false;
  bankFlag: boolean = false;
  borrowerValFlag: boolean = false;
  demoGraphicActionMode: boolean = false;
  addressDtlsActionMode: boolean = false;
  genericActionMode: boolean = false;
  enableDemographicTabFlag: boolean = false;
  enableAddrDtlsTabFlag: boolean = false;
  enableGenericDtlsTabFlag: boolean = false;
  // private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;
  viewMode: boolean = false;
  userHasRights: boolean = true;
  editMode: boolean = false;
  faciltyCode: string = "";
  commentsCategory: string;
  currentCustomer: any;
  customerSearchAttr: any;
  searchBorrower: any;
  backTo: any;
  otfwViewMode: boolean = false;
  allowedDateFormats = ["YYYY-MM-DDTHH:m,m:ssZ", "YYYY-MM-DD HH:mm:SS.s", "YYYYMMDD", "DDMMYYYY", "DD-MMM-YYYY"];
  customerBorrower: any;
  customerCoBorrower: any;
  customerGuarantor: any;
  customerOthers: any;
  constructor(private router: Router) {
    this.allowedDateFormats.push(this.getDisplayDateFormat().dateInputFormat);
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     if (this.keepAfterRouteChange) {
    //       // only keep for a single route change
    //       this.keepAfterRouteChange = false;
    //     } else {
    //       // clear alert messages
    //       this.clear();
    //     }
    //   }
    // });
  }

  // public getSubject() {
  //   return this.subject;
  // }
  // subscribe to alerts
  // getAlert(alertId?: string): Observable<any> {
  //   return this.subject.asObservable().filter((x: Alert) => x && x.alertId === alertId);
  // }
  getFacilitycode(data) {
    this.faciltyCode = data;
  }
  setBorrowersList(BorrowersList) {
    this.borrowersList.push(BorrowersList);
  }

  setProductDetails(productDetail) {
    this.productDetails = productDetail;
  }
  // convenience methods
  // success(message: string) {
  //   this.alert(new Alert({ message, type: AlertNotification.Success }));
  // }

  // getUserID() {
  //   return sessionStorage.getItem("USERID");
  // }

  // error(message: string, onOkClick?: Function) {
  //   this.alert(new Alert({ message, type: AlertNotification.Error, onOkClick: onOkClick }));
  // }

  // info(message: string) {
  //   this.alert(new Alert({ message, type: AlertNotification.Info }));
  // }

  // warn(message: string, onOkClick?: Function) {
  //   this.alert(new Alert({ message, type: AlertNotification.Warning, onOkClick: onOkClick }));
  // }

  // delete(message: string, onProceedDelete?: Function) {
  //   this.alert(new Alert({ message, type: AlertNotification.Delete, onProceedDelete: onProceedDelete }));
  // }

  // alertWarning(message: string, onProceedWarning?: Function) {
  //   this.alert(new Alert({ message, type: AlertNotification.WarningConfirm, onProceedWarning: onProceedWarning }));
  // }

  // closeAlert() {
  //   this.alert(new Alert());
  // }

  // // main alert method    
  // alert(alert: Alert) {
  //   this.keepAfterRouteChange = alert.keepAfterRouteChange;
  //   this.subject.next(alert);
  // }

  // clear alerts
  // clear(alertId?: string) {
  //   this.subject.next(new Alert({ alertId }));
  // }


  setViewMode(data) {
    this.viewMode = data
  }

  setEditMode(data) {
    this.editMode = data
  }

  setBorrowerCompany(data) {
    this.borrowerCompany = data
  }
  setCoBorrowerCompany(data) {
    this.coBorrowerCompany = data
  }
  setQuarenterCompany(data) {
    this.quarenterCompany = data
  }
  setBorrowerIndividual(data) {
    this.borrowerIndividual = data
  }
  setbankFlag(data) {
    this.bankFlag = data;
  }
  setCoBorrwQuarIndividualPromoter(data) {
    this.coBorrwQuarIndividualPromoter = data
  }

  setCustName(data) {
    this.custName = data
  }

  getCustName() {
    return this.custName;
  }

  setCADLocation(data) {
    this.CADLocation = data
  }

  setCADLocationList(data) {
    this.CADLocationList = data
  }

  setUserId(data) {
    this.userId = data
  }
  setAssignRA(data) {
    this.assignRA = data
  }

  getUserRoles() {
    return sessionStorage.getItem("USER_ROLES");
  }

  getUserName() {
    return sessionStorage.getItem("USERNAME");
  }
  valBorrowerFlag(data) {
    this.borrowerValFlag = data
  }
  setAppRefNumber(data) {
    this.appRefNumber = data
  }

  getAppRefNumber() {
    return this.appRefNumber
  }

  setProposalId(data) {
    this.ProposalId = data;
  }

  setICIFNum(data) {
    this.ICIFNum = data
  }

  setCIFNum(data) {
    this.CIFNum = data
  }

  setProposalEditFlag(data) {
    this.proposalEditFlag = data
  }

  setTaskID(data) {
    this.taskID = data
  }


  setTaskName(data) {
    this.taskName = data
  }

  setProcessID(data) {
    this.processID = data
  }

  settaskOwner(data) {
    this.taskOwner = data
  }

  setcurrentTaskId(data) {
    this.currentTaskId = data
  }

  setbpmStatus(data) {
    this.bpmStatus = data
  }


  setApplicationActionMode(data) {
    this.applicationActionMode = data
  }
  setDemoGraphicActionMode(data) {
    this.demoGraphicActionMode = data
  }
  setAddressDtlsActionMode(data) {
    this.addressDtlsActionMode = data
  }
  setGenericActionMode(data) {
    this.genericActionMode = data
  }

  setCustType(data) {
    this.custType = data
  }

  setCustSubType(data) {
    this.custSubType = data
  }

  setAppFormNum(data) {
    this.AppFormNum = data
  }

  setEnableDemographicTabFlag(data) {
    this.enableDemographicTabFlag = data
  }
  setEnableAddrDtlsTabFlag(data) {
    this.enableAddrDtlsTabFlag = data
  }
  setEnableGenericDtlsTabFlag(data) {
    this.enableGenericDtlsTabFlag = data
  }

  getFormattedDate(model) {
    return (model.day <= 9 ? ("0" + model.day) : model.day)
      + "-" + (model.month <= 9 ? ("0" + model.month) : model.month) + "-" + model.year;
  }

  getDisplayDateFormat() {
    return { dateInputFormat: "dd-MMM-YYYY" };
  }

  setCommentsCategory(data) {
    this.commentsCategory = data;
  }
  setDemographicData(borrower: any, coborrower: any, guarantor: any, others: any) {
    this.customerBorrower = borrower;
    this.customerCoBorrower = coborrower;
    this.customerGuarantor = guarantor;
    this.customerOthers = others;
    /*this.demographicDetail = data;
    Object.assign(this.demographicDetail, data);
    let momentDate = window["moment"](this.demographicDetail.DateOfIncorporation, this.allowedDateFormats);
    let momentDOB = window["moment"](this.demographicDetail.DateOfBirth, this.allowedDateFormats);
     this.demographicDetail.DateOfIncorporation = momentDate._d;
     this.demographicDetail.DateOfBirth = momentDOB._d;
         this.firmVintageDiff = this.getDemographicDOIDifference();
    this.agediff=this.getDemographicAgeDifference();*/
  }

  getDemographicData(): any {
    return {
      "borrower": this.customerBorrower,
      "coBorrower": this.customerCoBorrower,
      "guarantor": this.customerGuarantor,
      "otherRelated": this.customerOthers
    };
  }

  hasBorrower(): boolean {
    //return this.demographicDetail;
    return this.customerBorrower && this.customerBorrower.length > 0;
  }

  // setApplicationData(data: ApplicationDetails) {
  //   if (!this.applicationDetail) {
  //     this.applicationDetail = new ApplicationDetails();
  //   }
  //   Object.assign(this.applicationDetail, data);
  //   let momentDate = window["moment"](this.applicationDetail.CAMRenewalDate, this.allowedDateFormats);
  //   this.applicationDetail.CAMRenewalDate = momentDate._d;
  // }

  // getApplicationData(): ApplicationDetails {
  //   return this.applicationDetail;
  // }

  getDateDifference(greaterDate: Date, lesserDate: Date) {
    greaterDate.setHours(0);
    greaterDate.setMinutes(0);
    greaterDate.setSeconds(0);
    greaterDate.setMilliseconds(0);

    lesserDate.setHours(0);
    lesserDate.setMinutes(0);
    lesserDate.setSeconds(0);
    lesserDate.setMilliseconds(0);
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = lesserDate.getTime();
    var date2_ms = greaterDate.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    let a = Math.round(difference_ms / one_day) / 365;
    return a.toFixed(2);
  }

  getDemographicDOIDifference() {
    if (this.getDemographicData() && this.getDemographicData().DateOfIncorporation) {
      return this.getDateDifference(new Date(), this.getDemographicData().DateOfIncorporation);
    }
    return "0";
  }

  getDemographicAgeDifference() {
    if (this.getDemographicData() && this.getDemographicData().DateOfBirth) {
      console.log(this.getDemographicData().DateOfBirth);
      return this.getDateDifference(new Date(), this.getDemographicData().DateOfBirth);
    }
    return "0";
  }

  setOtfwViewMode(data) {
    this.otfwViewMode = data
  }

  setCollateral(collateralDetail: string) {
    this.selectedCollateral.next(collateralDetail);
  }
  getCollateral() {
    return this.selectedCollateral;
  }
}
