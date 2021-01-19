import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { RloUtilService } from './rloutil.service';
import { CustomerDtlsComponent } from '../CustomerDtls/CustomerDtls.component';
import { forkJoin } from 'rxjs';
import { RlouiService } from './rloui.service';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { string } from '@amcharts/amcharts4/core';
import { ProvidehttpService } from '../providehttp.service';
import { HttpResponse } from '@angular/common/http';
import { resolve } from 'dns';
import { IModalData } from '../popup-alert/popup-interface';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

export interface subjectParamsInterface {
  action: string;
  data?: any;
}

export interface IComponentLvlData {
  name?: string;
  data: any;//eg:when used in grid(address) data contains list of added addressed
  BorrowerSeq?: string;
  sectionName?: string;//used in components which comes under application section
}


export interface IComponentSectionValidationData {
  isSectionValid: boolean,
  errorMessage: string
}

export interface IFormValidationData {
  isAppValid: boolean,
  errorsList: any
}
export interface IGlobalApllicationDtls {
  isLoanCategory?: boolean;
  TypeOfLoanCode?: string;
  TypeOfLoanName?: string;
  ProductCode?: string;
  ProductName?: string;
  SubProductCode?: string;
  SubProductName?: string;
  SchemeCode?: string;
  SchemeName?: string;
  PromotionCode?: string;
  PromotionName?: string;
  LoanTenure?: string;
  LoanTenurePeriodCode?: string;
  LoanTenurePeriodName?: string;
  ARN?: string;
  LoanAmount?: string;
  InterestRate?: string;
  Tenure?: string;
  TenurePeriodCd?: string;
  TenurePeriodName?: string;
  MinCashLimit?: any;
  MaxCashLimit?: any;
  CardType?: string;
  CardTypename?: string;
  MaxCreditLimit?: any;
  CardCustName?: string;
  PrimaryUsage?: string;
  CustomerType?: any;
  ReqCardLimit?: any;
  CamType?: any;
  SubCamType?: any;
  PrimaryBorrowerSeq?: any;
  CBSProductCode?: any;
  ApplicationPurposeName?: any;
  // #PR-38 - dev
  //MaxCredit?: any;
  //
}
@Injectable({
  providedIn: 'root'
})


export class RloCommonData {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  //used to define if the header should be expaneded or collapsed
  childToParentSubject = new Subject<subjectParamsInterface>();
  updateDdeMenuSubject = new Subject<string>();//add or remove
  modalDataSubject = new Subject<subjectParamsInterface>();//modal to invoking component data passing

  dataSavedSubject = new Subject<boolean>();//when a particular form section is saved successfully(save),subscribed in DDE

  dynamicComponentInstance: any;

  makeDdeDisabled: { ddeDisabled: boolean, previousPageOperation: boolean }
    = { ddeDisabled: false, previousPageOperation: false };//applied only when user comes to DDE from operations page

  /////////////////////////////////////////////////////////
  masterDataMap = new Map();//contains customer and address data maps used in QDE and DDE
  componentLvlDataSubject = new Subject<IComponentLvlData>();
  currentRoute: string = "";
  globalApplicationDtls: IGlobalApllicationDtls = {};

  amortizationModalDataUW: any;//stored data used for amortization schedule modal  

  reloadUWSections = new Subject<any>();

  selectedCardDetailsSubject = new Subject<any>();//in addon page -> on click of modal's row data.
  viewMode: boolean = false;//used in DDE

  constructor(public rloutil: RloUtilService, public rloui: RlouiService, public router: Router, public http: ProvidehttpService) {
    this.resetMapData();
    console.log(this.masterDataMap);
  }

  resetMapData() {
    this.masterDataMap.set("customerMap", new Map());
    this.masterDataMap.set("applicationMap", new Map());
  }

  // //action can be 'add' or 'remove'
  // updateValuesFundLineGraph(action: string) {
  //     this.updateDdeMenuSubject.next(action);
  // }

  //action can be 'add' or 'remove'
  updateValuesFundLineGraph(action: string) {
    this.updateDdeMenuSubject.next(action);
  }

  getUpdatedDdeMenu(): Observable<any> {
    return this.updateDdeMenuSubject.asObservable();
  }




  ///////////////////////////////////////////////////////////////
  //global fn to get component lvl data (grid load,customerDtls data,etc)
  globalComponentLvlDataHandler(data: IComponentLvlData) {
    this.componentLvlDataSubject.next(data);
  }

  getComponentLvlData(): Observable<any> {
    return this.componentLvlDataSubject.asObservable();
  }

  async updateMasterDataMap(componentData: any, isCustomerTabSelected: boolean) {
    console.warn("------------------------------ deep ===", componentData, isCustomerTabSelected);

    let mapValue = new Map();
    let tempStoreMap = new Map();
    let mapName = undefined;
    let mapKey = undefined;
    let functionalResponseObj: Promise<IComponentSectionValidationData>

    if (isCustomerTabSelected) {
      mapName = "customerMap";
      mapKey = componentData.BorrowerSeq;
    } else {
      mapName = "applicationMap";
      mapKey = componentData.sectionName;
    }

    tempStoreMap.set(mapName, this.masterDataMap.get(mapName));

    if (componentData.data.length > 0) {
      if (tempStoreMap.get(mapName)) {
        if ((tempStoreMap.get(mapName)).has(mapKey)) {
          mapValue = tempStoreMap.get(mapName).get(mapKey);
        }
      }

      switch (componentData.name) {
        case 'CustomerDetails': // for customer tab
          let oldCustomerDetails = mapValue.get('CustomerDetails');
          if (oldCustomerDetails && oldCustomerDetails.isValid) { // Check if old data has been validated and maintain the state
            componentData.data[0].isValid = true;
          }

          // Check if new data has basic details and then only replace old data
          if (componentData.data[0].BorrowerSeq != undefined || componentData.data[0].BorrowerSeq != null) {
            mapValue.set('CustomerDetails', componentData.data[0]);
          } else if (componentData.data[0].isValid) {
            oldCustomerDetails.isValid = true;
            mapValue.set('CustomerDetails', oldCustomerDetails);
          }
          if (this.currentRoute == "DDE")
            functionalResponseObj = this.validateCustomerDetailSection(mapValue).then(data => { return data });

          break;
        case 'AddressDetails':
          mapValue.set('AddressDetails', componentData.data);
          if (this.currentRoute == "DDE")
            functionalResponseObj = this.validateAddressDetailSection(mapValue).then(data => { return data });
          break;
        case 'OccupationDetails':
          mapValue.set('OccupationDetails', componentData.data);
          if (this.currentRoute == "DDE")
            functionalResponseObj = this.validateOccupationDetailsSection(mapValue).then(data => { return data });
          break;
        case 'FamilyDetails':
          mapValue.set('FamilyDetails', componentData.data);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'LiabilityDetails':
          mapValue.set('LiabilityDetails', componentData.data);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'AssetDetails':
          mapValue.set('AssetDetails', componentData.data);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'IncomeSummary':
          mapValue.set('IncomeSummary', componentData.data);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'CollateralDetails':
          mapValue.set('CollateralDetails', componentData.data);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'PersonalInterviewDetails':
          mapValue.set('PersonalInterviewDetails', componentData.data);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation(componentData.data[0].isValid).then(data => { return data });
          break;
        case 'RmVisitDetails':
          mapValue.set('RmVisitDetails', componentData.data);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'BusinessDetails':
          mapValue.set('BusinessDetails', componentData.data);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        ///APPLICATION SECTIONS

        case 'GoNoGoDetails':
          mapValue = componentData.data;
          console.log(" shweta :: in service switch gng case", mapValue);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation(mapValue[0].isValid).then(data => { return data });
          break;
        case 'Notes':
          mapValue = componentData.data;
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'LoanDetails':
          mapValue = componentData.data;
          console.log(" shweta :: in service switch Loan dtls case", mapValue);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation(mapValue[0].isValid).then(data => { return data });
          break;
        case 'CreditCardDetails':
          mapValue = componentData.data;
          console.log(" shweta :: in service switch ccd case", mapValue);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation(mapValue[0].isValid).then(data => { return data });
          break;
        case 'ReferrerDetails':
          mapValue = componentData.data;
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'ApplicationDetails':
          mapValue = componentData.data;
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'PropertyDetails':
          mapValue = componentData.data;
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'PolicyCheckResults':
          mapValue = componentData.data;
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'ScorecardResults':
          mapValue = componentData.data;
          functionalResponseObj = this.tabularOrNonTabularSectionValidation().then(data => { return data });
          break;
        case 'InterfaceResults':
          mapValue = componentData.data;
          console.log(" DEEP | InterfaceResults", mapValue);
          functionalResponseObj = this.tabularOrNonTabularSectionValidation(mapValue[0].isValid).then(data => { return data });
          break;
      }

      tempStoreMap.get(mapName).set(mapKey, mapValue);
    }
    else if (componentData.name !== 'CustomerDetails') {
      let customerDetails = new Map();
      if (tempStoreMap.get(mapName).has(mapKey)) {


        if (mapName == "customerMap") {
          customerDetails = tempStoreMap.get(mapName).get(mapKey);
          if (tempStoreMap.get(mapName).get(mapKey).get(componentData.name) != undefined) {
            customerDetails.delete(componentData.name);
            functionalResponseObj = this.tabularOrNonTabularSectionValidation(false).then(data => { return data });
          }
          else {
            // no data found in component ie. either tabular or no-tabular component
            functionalResponseObj = this.tabularOrNonTabularSectionValidation(false).then(data => { return data });
          }
        }
        else {
          customerDetails = tempStoreMap.get(mapName);
          if (tempStoreMap.get(mapName).get(mapKey) != undefined) {
            customerDetails.delete(componentData.name);
            functionalResponseObj = this.tabularOrNonTabularSectionValidation(false).then(data => { return data });
          }
          else {
            // no data found in component ie. either tabular or no-tabular component
            functionalResponseObj = this.tabularOrNonTabularSectionValidation(false).then(data => { return data });
          }
        }
      }
      else {
        functionalResponseObj = this.tabularOrNonTabularSectionValidation(false).then(data => { return data });
      }
    }
    console.log("shweta :: in update services temp map", tempStoreMap);
    console.log("shweta :: masterDataMap", this.masterDataMap);

    return functionalResponseObj;
  }

  //TAGS
  //updateTags
  async updateAddressTags(event) {
    const tags = [];
    event.data.forEach(address => {
      let tagText = '';
      // if (address.MailingAddress.id === 'Y') {
      //   if (address.AddressType === 'OF') {
      //     tagText = 'Office; ';
      //   } else if (address.AddressType === 'RS') {
      //     tagText = 'Residence; ';
      //   }
      // }
      if (address.AddressType === 'ML') {
        if (this.globalApplicationDtls.CustomerType == 'C') {
          tagText = 'Registered; ';
        } else {
          tagText = 'Mailing; ';
        }


        tagText = tagText + this.rloutil.concatenate([address.AddressLine1, address.Region, address.City, address.State, address.PinCode], ', ');
        tags.push({ text: tagText });
      }
    });
    return this.trimTagsIfRequired(tags, 2);
  }

  trimTagsIfRequired(tags, maxAllowedTags) {
    if (tags.length > maxAllowedTags) {
      const totalAddresses = tags.length;
      tags.length = maxAllowedTags;
      tags.push({ text: '+ ' + (totalAddresses - maxAllowedTags) + ' more' });
    }
    return tags;
  }

  async UpdateOccupationTags(event) {
    const tags = [];
    const maxAddress = 2;
    console.log("shweta :: occ tags ", event.data);
    event.data.forEach(occupation => {
      if (this.globalApplicationDtls.CustomerType == 'C') {
        tags.push({ text: occupation.EmployeeID + ', ' + occupation.Designation });

      } else {
        switch (occupation.Occupation.id) {
          case 'RT': tags.push({ text: 'Retired' }); break;
          case 'HW': tags.push({ text: 'Housewife' }); break;
          case 'ST': tags.push({ text: 'Student' }); break;
          case 'SL': tags.push({ text: 'Salaried' }); break;
          case 'SE': tags.push({ text: 'Self Employed' }); break;
          case 'OT': tags.push({ text: 'Others' }); break;
          default: tags.push({ text: occupation.Occupation.id });
        }
      }
    });
    return this.trimTagsIfRequired(tags, 4);
  }

  async getLiabilityTags(event) {
    const tags = [];
    event.data.forEach(liability => {
      // console.log('Liability ' , liability);

      const formattedAmount = this.rloui.formatAmount(liability.LocalEquivalentAmt);
      tags.push({ label: liability.LiabilityType.text, text: formattedAmount });
    });
    return this.trimTagsIfRequired(tags, 3);
  }

  async getAssetTags(event) {
    const tags = [];
    event.data.forEach(asset => {
      console.log('Asset ', asset);

      const formattedAmount = this.rloui.formatAmount(asset.EquivalentAmt);
      tags.push({ label: asset.AssetType.text, text: formattedAmount });
    });
    return this.trimTagsIfRequired(tags, 3);
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async validateCustomer(CUSTOMER_DETAILS: CustomerDtlsComponent) {
    const noOfErrors: number = await CUSTOMER_DETAILS.revalidate();
    return (noOfErrors > 0) ? false : true;
  }

  //all validation fn()
  async validateCustomerDetailsSection(customerData) {
    let dataObject = {
      isAppValidFlag: true,
      errorsList: []
    }

    let errorMessage;
    let custFullName = customerData.FullName;
    let isCustomerValid = await this.validateCustomer(this.dynamicComponentInstance);


    if (!isCustomerValid) {
      errorMessage = errorMessage + ' All mandatory fields for the customer';
    }

    if (!isCustomerValid) {
      errorMessage = 'Please fill all the pending Details for Customer' + custFullName + ' : ' + errorMessage;
      dataObject.errorsList.push(errorMessage);
      dataObject.isAppValidFlag = false;
    }

    return dataObject;
  }

  getCustomerList() {
    let CustomerList = [];
    if (this.masterDataMap.has('customerMap')) {
      const customerMap = this.masterDataMap.get('customerMap');
      customerMap.forEach(entry => {
        if (entry.has('CustomerDetails')) {
          CustomerList.push(entry.get('CustomerDetails'));
        }
      });
    }
    return CustomerList;
  }

  async UpdateRmVisitDetailsTags(event) {
    const tags = [];
    event.data.forEach(Visit => {
      let tagText = '';
      let vistPlace = '';
      console.log("RM Visit Tags : ", Visit);
      switch (Visit.PlaceofVisit.id) {
        case 'OF': vistPlace = 'Office'; break;
        case 'PL': vistPlace = 'Plant'; break;
        case 'RS': vistPlace = 'Residence'; break;
        case 'WH': vistPlace = 'Warehouse'; break;
        default: vistPlace = Visit.PlaceofVisit.id;
      }
      tagText = tagText + this.rloutil.concatenate([Visit.NameOfPerson, vistPlace], '; ');
      tags.push({ text: tagText });
    });
    return this.trimTagsIfRequired(tags, 3);
  }














  //88888888888888888888888888888888888888888888888888888888888888888888888888888

  //used in both QDE and DDE -> customer sections
  async isFormValid() {
    let dataObject: IFormValidationData = {
      isAppValid: true,
      errorsList: []
    }

    var dataToValidate: Map<any, any>;
    dataToValidate = this.masterDataMap.get("customerMap");

    await this.asyncForEach(Array.from(dataToValidate.entries()), async (entry) => {
      let isAddressValid = true;
      let isOccupationValid = true;
      let isCustomerValid = true;
      let isIncomeSummaryValid = true;
      let errorMessage = '';
      let custFullName = '';

      if (entry[1].has('CustomerDetails')) {
        const customer = entry[1].get('CustomerDetails');
        custFullName = customer.FullName;

        forkJoin(
          this.validateCustomerDetailSection(entry[1]),
          this.validateAddressDetailSection(entry[1]),
          this.validateOccupationDetailsSection(entry[1]),
          this.validateIncomeSummary(entry[1])
        ).subscribe((data) => {
          console.error(data);
          isCustomerValid = data[0].isSectionValid;
          isAddressValid = data[1].isSectionValid;
          isOccupationValid = data[2].isSectionValid;
          isIncomeSummaryValid = data[3].isSectionValid;

          let errorCounter = 1;
          for (let i = 0; i < data.length; i++) {
            const element = data[i];

            if (!element.isSectionValid) {
              errorMessage += "<p>" + (errorCounter++) + ". " + element.errorMessage + "</p>";
            }
          }

          if (!(isCustomerValid && isAddressValid && isOccupationValid && isIncomeSummaryValid)) {
            let msg = "<p>The following details for " + custFullName + " need to be filled in order to submit: " + "</p>" + errorMessage + "<br>";
            dataObject.errorsList.push(msg);
            dataObject.isAppValid = false;
          }
        });
      }
    });

    console.warn(dataObject.errorsList);
    return dataObject;
  }

  async validateCustomerDetailSection(sectionData: Map<any, any>) {
    let commonObj: IComponentSectionValidationData = {
      isSectionValid: false,
      errorMessage: ''
    }
    let customerData = sectionData.get('CustomerDetails');

    console.log("-------- customerData ", customerData);
    // if (customerData.CustomerType != "G") {  //comented beacause logically technically not proper
    if (customerData.isValid) {
      commonObj.isSectionValid = true;
    } else {
      commonObj.errorMessage += 'All mandatory fields in Customer Details';
    }
    // }
    return commonObj;
  }


  async validateOccupationDetailsSection(customerSectionData: Map<any, any>) {
    let customerData = customerSectionData.get('CustomerDetails');
    let commonObj: IComponentSectionValidationData = {
      isSectionValid: true,
      errorMessage: ''
    }

    const LoanOwnership = customerData.LoanOwnership;
    const applicantType = customerData.CustomerType;
    // if (this.globalApplicationDtls.CustomerType == 'C') {
    //   commonObj.isSectionValid = false;
    //   if (customerSectionData.has('OccupationDetails') || customerSectionData.has('BusinessDetails')) {
    //     commonObj.isSectionValid = true;
    //   }
    // } 
    if (this.globalApplicationDtls.CustomerType == 'C' && applicantType == 'B') {
      commonObj.isSectionValid = false;
      if (customerSectionData.has('BusinessDetails')) {
        commonObj.isSectionValid = true;
      }
    }
    else if (LoanOwnership !== undefined && LoanOwnership > 0) {
      commonObj.isSectionValid = false;
      if (customerSectionData.has('OccupationDetails')) {
        const occupationList = customerSectionData.get('OccupationDetails');
        console.log("shweta :: occ list", occupationList);
        for (const eachOccupation of occupationList) {

          if (eachOccupation.NetIncome != undefined && parseFloat(eachOccupation.NetIncome) > 0) {
            commonObj.isSectionValid = true;
          }
          // if (eachOccupation.IncomeType.id && 'PRI' === eachOccupation.IncomeType.id.toString()) {
          //   commonObj.isSectionValid = true;
          // }
        }
      }
    }
    if (!commonObj.isSectionValid) {
      if (this.globalApplicationDtls.CustomerType == 'C' && applicantType == 'B') {
        commonObj.errorMessage = "Business Details";
      } else if (LoanOwnership != undefined && LoanOwnership != 0) {
        commonObj.errorMessage = "Atleast 1 occupation with Net Income";
      }
    }
    return commonObj;
  }


  async validateAddressDetailSection(sectionData: Map<any, any>) {
    let commonObj: IComponentSectionValidationData = {
      isSectionValid: true,
      errorMessage: ''
    }
    let customerData = sectionData.get('CustomerDetails');

    const LoanOwnership = customerData.LoanOwnership;
    const applicantType = customerData.CustomerType;

    if (!sectionData.has('AddressDetails')) { //added for canara
      commonObj.isSectionValid = false;
    } else {
      const addressList = sectionData.get('AddressDetails');
      const addrValidationObj = { isMailing: false, isPermenet: true };
      for (const eachAddress of addressList) {
        if ('ML' === ('' + eachAddress.AddressType)) {
          addrValidationObj.isMailing = true;
        }
        // if ('PR' === ('' + eachAddress.AddressType)) {
        //   addrValidationObj.isPermenet = true;
        // }
      }
      // if (applicantType == 'A' && this.globalApplicationDtls.CustomerType == 'C') {
      //   addrValidationObj.isMailing = true;
      // }
      // commented for Canara
      /*const addrValidationObj = { isMailing: false, isPermenet: false, isCurrent: false, isOffice: false };  
      for (const eachAddress of addressList) {
        if (eachAddress.MailingAddress.id && eachAddress.MailingAddress.id === 'Y') {
          addrValidationObj.isMailing = true;
        }
        if ('CR' === ('' + eachAddress.OccupancyType.id) ) {
          addrValidationObj.isCurrent = true;
        }
        if ('PR' === ('' + eachAddress.OccupancyType.id)) {
          addrValidationObj.isPermenet = true;
        }
        if ('OF' === ('' + eachAddress.AddressType.id)) {
          addrValidationObj.isOffice = true;
        }
      }

      if ((LoanOwnership == undefined || LoanOwnership == 0) && custType !== 'B' && custType !== 'CB') {
        addrValidationObj.isOffice = true;
      }*/

      for (const flag in addrValidationObj) {
        if (!addrValidationObj[flag]) {
          commonObj.isSectionValid = false;
        }
      }
    }
    // commented for canara
    /*if (!commonObj.isSectionValid) {
      commonObj.errorMessage += ((LoanOwnership == undefined || LoanOwnership == 0) && custType !== 'B' && custType !== 'CB') ?
        '1 correspondence address'
        : '1 permanent and 1 current residence address, at least 1 office address and 1 correspondence address';
    }*/
    if (!commonObj.isSectionValid) {
      if (this.globalApplicationDtls.CustomerType == 'C' && applicantType == 'B') {
        commonObj.errorMessage += '1 Registered';
      }
      else {
        commonObj.errorMessage += '1 Mailing';
      }

    }
    return commonObj;
  }

  async getCustomerDetails(activeBorrowerSeq) {
    let CustomerDtls = {};
    if (this.masterDataMap.has('customerMap')) {
      const customerMap = this.masterDataMap.get('customerMap');
      if (customerMap.has(activeBorrowerSeq)) {
        let customer = customerMap.get(activeBorrowerSeq);
        CustomerDtls = customer.get('CustomerDetails');
      }
    }
    return CustomerDtls;
  }


  //used for non-manditory sections AND manditory section if all records gets deleted or if no record is added on component load
  async tabularOrNonTabularSectionValidation(isValid: boolean = true) {
    let commonObj: IComponentSectionValidationData = {
      isSectionValid: isValid,
      errorMessage: ''
    }
    return commonObj;
  }

  getCurrentRoute() {
    this.currentRoute = this.router.url.slice(this.router.url.lastIndexOf("/") + 1, this.router.url.length);
  }

  getActiveRouteName(): string {
    return this.router.url.slice(this.router.url.lastIndexOf("/") + 1, this.router.url.length)
  }

  async validateApplicationSections(isCategoryTypeLoan: boolean) {
    let dataObject: IFormValidationData = {
      isAppValid: true,
      errorsList: []
    }
    var dataToValidate: Map<any, any>;
    dataToValidate = this.masterDataMap.get("applicationMap");

    if (dataToValidate.size) {

      let isGoNoGoSectionValid = true;
      let isLoadOrCreditCardValid = true;
      let isPropertyDetailsValid = true;
      let isScoreCardDetailsValid = true;
      let isPolicyCheckValid = true;
      let errorMessage = '';

      forkJoin(
        //this.validateGoNoGoSection(dataToValidate), //removed for canara
        this.validateLoanOrCreditCardSection(dataToValidate, isCategoryTypeLoan),
        this.validatePropertyDetailsSection(dataToValidate),
        // this.validateScoreCard(dataToValidate),
        // this.validatePolicyCheck(dataToValidate)
      ).subscribe((data) => {
        console.error(data);
        //isGoNoGoSectionValid = data[0].isSectionValid;  //removed for canara
        isLoadOrCreditCardValid = data[0].isSectionValid;
        isPropertyDetailsValid = data[1].isSectionValid;
        // isScoreCardDetailsValid = data[3].isSectionValid;
        // isPolicyCheckValid = data[4].isSectionValid;

        let errorCounter = 1;
        for (let i = 0; i < data.length; i++) {
          // const element = data[i];
          // if (!element.isSectionValid) {
          //   errorMessage = errorMessage !== '' ? errorMessage + ', ' : errorMessage;
          // }
          // errorMessage += element.errorMessage;
          const element = data[i];

          if (!element.isSectionValid) {
            errorMessage += "<p>" + (errorCounter++) + ". " + element.errorMessage + "</p>";
          }
        }

        if (!(isGoNoGoSectionValid && isLoadOrCreditCardValid && isPropertyDetailsValid && isScoreCardDetailsValid && isPolicyCheckValid)) {
          // let msg = errorMessage + "\r\n";
          let msg = "<p>The following details of Application tab need to be filled in order to submit: " + "</p>" + errorMessage + "<br>";
          dataObject.errorsList.push(msg);
          dataObject.isAppValid = false;
        }
      });

    }
    else {
      dataObject.isAppValid = false;
      dataObject.errorsList.push('<p>Kindly fill application section.</p>');
    }

    console.log(dataObject);
    return dataObject;
  }

  async testValidation(data) {
    let commonObj: IComponentSectionValidationData = {
      isSectionValid: false,
      errorMessage: ''
    }
    return commonObj;
  }

  isDdeFormValid(isCategoryTypeLoan: boolean = false) {
    console.log(isCategoryTypeLoan);
    const promise = new Promise((resolve, reject) => {
      let dataObject: IFormValidationData = {
        isAppValid: true,
        errorsList: []
      }
      let totalLoanOwnership: number = this.calculateLoanOwnership();
      if (100 != totalLoanOwnership && !this.globalApplicationDtls.isLoanCategory) {
        dataObject.isAppValid = false;
        dataObject.errorsList.push("Total Loan ownership should be 100%");
        console.log("shweta :: error list", dataObject.errorsList);
        resolve(dataObject);
        return promise;
      }
      this.isFormValid().then((customerData) => {
        dataObject.errorsList = customerData.errorsList;
        this.validateApplicationSections(isCategoryTypeLoan).then((applicationData) => {
          console.log(customerData, applicationData);
          if (customerData.isAppValid && applicationData.isAppValid) {
            dataObject.isAppValid = true;
          }
          else {
            dataObject.isAppValid = false;
            applicationData.errorsList.forEach(element => {
              dataObject.errorsList.push(element)
            });
          }
          resolve(dataObject)
        });
      });
    });
    return promise;
  }

  async validateGoNoGoSection(applicationSectionData: Map<any, any>) {
    let commonObj: IComponentSectionValidationData = {
      isSectionValid: false,
      errorMessage: ''
    }
    console.log("-------- GNG data ", applicationSectionData.get("GoNoGoDetails"));

    if (applicationSectionData.has("GoNoGoDetails")) {
      let sectionData = applicationSectionData.get("GoNoGoDetails");
      if (sectionData[0].isValid) {
        commonObj.isSectionValid = true;
      } else {
        commonObj.errorMessage = 'Decisions for all questions in Go/No-Go section are mandatory.';
      }
    }
    else {
      commonObj.errorMessage = "Answer all questions in Go/No-Go section.";
    }

    return commonObj;
  }

  async validateLoanOrCreditCardSection(applicationData: Map<any, any>, isCategoryTypeLoan: boolean) {
    let commonObj: IComponentSectionValidationData = {
      isSectionValid: false,
      errorMessage: ''
    }

    if (isCategoryTypeLoan) {
      commonObj.errorMessage = 'Please fill all the mandatory fields of loan details';
      if (applicationData.has("LoanDetails")) {
        let loanDetails = applicationData.get("LoanDetails");
        if (loanDetails[0].isValid) {
          commonObj.errorMessage = "";
          commonObj.isSectionValid = true;
        }
      }
    } else {
      commonObj.errorMessage = 'Please fill all the mandatory fields of credit card details';
      if (applicationData.has("CreditCardDetails")) {
        let creditCardDetails = applicationData.get("CreditCardDetails");
        if (creditCardDetails[0].isValid) {
          commonObj.errorMessage = "";
          commonObj.isSectionValid = true;
        }
      }
    }

    return commonObj;
  }

  async validateIncomeSummary(customerTabSectionData: Map<any, any>) {
    let commonObj: IComponentSectionValidationData = {
      isSectionValid: true,
      errorMessage: ''
    }
    let customerData = customerTabSectionData.get("CustomerDetails");
    if (this.currentRoute == "DDE") {
      if (this.globalApplicationDtls.CustomerType == 'C') {
        commonObj.isSectionValid = true;
      }
      else if (customerData.CustomerType == "B" || customerData.CustomerType == "CB") {
        if (!customerTabSectionData.has('IncomeSummary')) {
          commonObj.isSectionValid = false;
          commonObj.errorMessage = "Details from income summary section required";
        }
        return commonObj;
      }
    }
   // changes done
   return commonObj;
  }

  goBack() {
    console.log("BACK");
    if (confirm("Are you sure you want to cancel?")) {
      this.router.navigate(['home', 'LANDING']);
    }
  }

  removeCustomerFromMap(deletedCustomer) {
    if (this.masterDataMap.has("customerMap")) {
      if (this.masterDataMap.get("customerMap").has(deletedCustomer)) {
        this.masterDataMap.get("customerMap").delete(deletedCustomer);
        // console.log("shweta :: customer deleted from map", this.masterDataMap);
      }
    }
  }

  calculateLoanOwnership(activeBorSeq?: string) {
    let totalLoanOwnership: number = 0;
    console.log("shweta :: totalLoanOwnership : ", totalLoanOwnership);
    if (this.masterDataMap.has("customerMap")) {
      const customerMap = this.masterDataMap.get("customerMap");
      customerMap.forEach(entry => {
        if (entry.has('CustomerDetails')) {
          let customer = entry.get('CustomerDetails');
          if (customer.BorrowerSeq != activeBorSeq && customer.LoanOwnership) {
            totalLoanOwnership += parseFloat(customer.LoanOwnership);
          }
        }
      });
    }
    //console.log("shweta :: totalLoanOwnership : ", totalLoanOwnership);
    return totalLoanOwnership;
  }

  async validatePropertyDetailsSection(applicationData: Map<any, any>) {
    let commonObj: IComponentSectionValidationData = {
      isSectionValid: true,
      errorMessage: ''
    }
    if (this.globalApplicationDtls.TypeOfLoanCode == 'ML') {

      if (applicationData.has("PropertyDetails")) {
        let propertyDetails = applicationData.get("PropertyDetails");
        if (!propertyDetails[0].isValid) {
          commonObj.errorMessage = "Please fill all the mandatory fields of property details";
          commonObj.isSectionValid = false;
        }
      }
      else {
        commonObj.errorMessage = "Please fill all the mandatory fields of property details";
        commonObj.isSectionValid = false;
      }
    }
    return commonObj;
  }

  //from operation to DDE
  makeDdePageDisabled() {
    this.makeDdeDisabled.ddeDisabled = true;
  }

  //scoreCard(apllication score) invoke interface and score card api
  generateRetriggerRequestJson(applicationId: any, interfaceId: string) {
    let inputMap = new Map();
    inputMap.set('Body.interfaceId', interfaceId);
    inputMap.set('Body.prposalid', applicationId);
    // inputMap.set('Body.inputdata.SCHEME_CD', 'HOUSEC');
    inputMap.set('Body.inputdata.SCHEME_CD', this.globalApplicationDtls.SchemeCode);
    return inputMap;
  }

  //called in scorecard.component on refresh btn policyScore->scorecard
  invokeInterface(applicationId: any, type: "policyScore" | "applicationScore") {
    const promise = new Promise((resolve, reject) => {
      let interfaceId, apiName;

      if (type == "applicationScore") {
        interfaceId = "INT008";
        apiName = "/ScoreCard";
      }
      else {
        interfaceId = "INT007";
        apiName = "/policyCheck";
      }

      let inputMap = this.generateRetriggerRequestJson(applicationId, interfaceId);

      // this.http.fetchApi('/api/invokeInterface', 'POST', inputMap, '/los-integrator').subscribe(
      //   async (httpResponse: HttpResponse<any>) => {
      //     let res = httpResponse.body;
      //     resolve(res);
      //     this.retriggerScoreResult(res, apiName);
      //   }, async (httpError) => {
      //     resolve(null);
      //     var err = httpError['error']
      //     if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
      //     }
      //     //this.alert.showAlert(2, 'rlo.error.load.form', -1);
      //   }
      // );

      this.http.fetchApi(apiName, 'POST', inputMap, '/initiation').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          let res = httpResponse.body['ouputdata'];
          if (res.OVERALLSCORE) {
            resolve(res);
          } else if (res.error) {
            //this.alert.showAlert(2, 'rlo.error.bre-exception', -1);
          } else {
            //this.alert.showAlert(2, 'rlo.error.load.form', -1);
          }
        },
        async (httpError) => {
          var err = httpError['error']
          if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
          }
          //this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
        }
      );

    });
    return promise;
  }

  // retriggerScoreResult(res, apiName: string) {
  //   let inputMap = this.generateScoreCheckReq(res);

  //   this.http.fetchApi('/' + apiName, 'POST', inputMap, '/initiation').subscribe(
  //     async (httpResponse: HttpResponse<any>) => {
  //       let res = httpResponse.body;
  //     },
  //     async (httpError) => {
  //       var err = httpError['error']
  //       if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
  //       }
  //       //this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
  //     });
  // }

  generateScoreCheckReq(res) {
    let inputMap = new Map();
    inputMap.set('Body.prposalid', res['prposalid']);
    inputMap.set('Body.interfaceId', res['interfaceId']);
    inputMap.set('Body.ouputdata', res['ouputdata']);
    return inputMap;
  }
  //scoreCard invoke interface and score card api

  //get score data in DDE and UW
  getInitialScores(applicationId: any) {
    const promise = new Promise((resolve, reject) => {
      let inputMap = new Map();
      inputMap.clear();
      let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };

      criteriaJson.FilterCriteria.push({
        "columnName": "ApplicationId",
        "columnType": "String",
        "conditions": {
          "searchType": "equals",
          "searchText": applicationId
        }
      });
      inputMap.set('QueryParam.criteriaDetails.FilterCriteria', criteriaJson.FilterCriteria);
      inputMap.set('QueryParam.ApplicationId', applicationId);

      console.log(inputMap);

      let url = "/ApplicationScoreDetails";
      //url = "/ApplicationScoreDetails/2483"; '/LiabilityDetails', 'GET', inputMap, '/rlo-de'
      this.http.fetchApi(url, 'GET', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          const res = httpResponse.body;
          console.warn("Application details api")
          console.log(res);
          resolve(res);
        },
        async (httpError) => {
          resolve(null);
        });
    });
    return promise;
  }

  async validateScoreCard(applicationData: Map<any, any>) {
    let commonObj: IComponentSectionValidationData = {
      isSectionValid: true,
      errorMessage: ''
    }

    if (applicationData.has("ScorecardResults")) {
      let ScorecardResults = applicationData.get("ScorecardResults");
      if (!ScorecardResults[0].isValid) {
        commonObj.errorMessage = "Please fill all the mandatory fields of Scorecard Results";
        commonObj.isSectionValid = false;
      }
    }
    else {
      commonObj.errorMessage = "Please fill all the mandatory fields of Scorecard Results";
      commonObj.isSectionValid = false;
    }
    return commonObj;
  }

  async validatePolicyCheck(applicationData: Map<any, any>) {
    let commonObj: IComponentSectionValidationData = {
      isSectionValid: true,
      errorMessage: ''
    }

    if (applicationData.has("PolicyCheckResults")) {
      let ScorecardResults = applicationData.get("PolicyCheckResults");
      if (!ScorecardResults[0].isValid) {
        commonObj.errorMessage = "Please fill all the mandatory fields of PolicyCheck Results";
        commonObj.isSectionValid = false;
      }
    }
    else {
      commonObj.errorMessage = "Please fill all the mandatory fields of PolicyCheck Results";
      commonObj.isSectionValid = false;
    }
    return commonObj;
  }

  async getSearchedCustomerData(searchType: 'Internal' | 'External', inputMap: any) {
    const promise = new Promise((resolve, reject) => {
      if (searchType == 'Internal') {
        this.http.fetchApi('/dedupe', 'GET', inputMap, "/initiation").subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            console.log("Deep | Service - getSearchedCustomerData() INTERNAL SEARCH RESPONSE:", res);
            resolve(res);
          },
          async (httpError) => {
            resolve(null);
          }
        );
      } else {
        this.http.fetchApi('/api/invokeInterface', 'POST', inputMap, '/los-integrator').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            console.log("Deep | Service - getSearchedCustomerData() EXTERNAL SEARCH RESPONSE:", res);
            resolve(res);
          },
          async (httpError) => {
            resolve(null);
          }
        );
      }
    });
    return promise;
  }

  setViewMode(data: boolean) {
    this.viewMode = data
  }

  getInterfaceResposes(inputMap) {
    const promise = new Promise((resolve, reject) => {
      this.http.fetchApi('/CIBILResponse', 'GET', inputMap, "/rlo-de").subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          console.log("Deep | Service - getInterfaceResposes()", res);
          resolve(res);
        },
        async (httpError) => {
          resolve(null);
        }
      );
    });
    return promise;
  }

  getInterfaceModalData(appId: any) {
    console.log(appId);
    let inputMap = new Map();
    inputMap.set('Body.proposalId', appId);

    this.getInterfaceResposes(inputMap).then((response: any) => {
      let responseData = response.CIBILResponse.filter((data) => data.ProposalId == Number(appId));
      //let rawHtml = window.atob(this.testCibilResponse);//testing
      console.log("DEEP | Interface modal response", responseData);
      let rawHtml = window.atob(responseData[0].BureauResponseXml);

      if (rawHtml.length) {
        const modalObj: IModalData = {
          title: "Interface Result",
          rawHtml: rawHtml,
          modalSize: "modal-width-lg",
          buttons: []
        }

        this.rloui.confirmationModal(modalObj).then((response) => {
          console.log(response);
          if (response != null) {
            if (response.id === 1) {
              this.rloui.closeAllConfirmationModal();
            }
          }
        });
      }
    });
  }

  //get member card details
  getMultipleCustomerIcif(multipleIcif: Array<any>) {
    // {
    //   "interfaceId": "CIF_SEARCH",
    //   "prposalid": "1234",
    //  "inputdata": {
    // "ICIFNumber":
    // [
    // "1234","5678","4585"
    // ]

    //  }
    // }

    let inputMap = new Map();
    inputMap.clear();

    let testData = ["4585"];
    inputMap.set('Body.inputdata.ICIFNumber', multipleIcif);
    inputMap.set('Body.interfaceId', 'CIF_SEARCH');
    inputMap.set('Body.prposalid', '1234');

    const promise = new Promise((resolve, reject) => {
      this.http.fetchApi('/api/invokeInterface', 'POST', inputMap, '/los-integrator').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          console.log("Deep | Service - getInterfaceResposes()", res);
          resolve(res);
        },
        async (httpError) => {
          resolve(null);
        }
      );
    });
    return promise;
  }

  getMemberCardDetail() {
    let inputMap = new Map();
    inputMap.clear();

    let testData = "4585";
    inputMap.set('Body.inputdata.CifID', testData);
    inputMap.set('Body.interfaceId', 'CUSTOMER_360');
    inputMap.set('Body.prposalid', '3322');

    const promise = new Promise((resolve, reject) => {
      this.http.fetchApi('/api/invokeInterface', 'POST', inputMap, '/los-integrator').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          console.log("Deep | Service - getMemberCardDetail()", res);
          resolve(res);
        },
        async (httpError) => {
          resolve(null);
        }
      );
    });
    return promise;
  }


}
