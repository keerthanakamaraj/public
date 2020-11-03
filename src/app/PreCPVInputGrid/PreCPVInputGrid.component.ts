import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, QueryList, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PreCPVInputGridModel } from './PreCPVInputGrid.model';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { DateComponent } from '../date/date.component';
import { AmountComponent } from '../amount/amount.component';
import { GridComponent } from '../grid/grid.component';
import { ServiceStock } from '../service-stock.service';
import { HiddenComponent } from '../hidden/hidden.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../button/button.component';
import { DefaultDataInterface, verificationInterface } from '../pre-cpv/pre-cpv-interface';

const customCss: string = '';
@Component({
  selector: 'app-PreCPVInputGrid',
  templateUrl: './PreCPVInputGrid.component.html'
})
export class PreCPVInputGridComponent extends GridComponent implements OnInit {
  @ViewChildren('CustomerName') CustomerName: QueryList<ComboBoxComponent>;
  @ViewChildren('VerificationType') VerificationType: QueryList<ComboBoxComponent>;
  @ViewChildren('Details') Details: QueryList<TextAreaComponent>;
  @ViewChildren('City') City: QueryList<ComboBoxComponent>;
  @ViewChildren('Agency') Agency: QueryList<ComboBoxComponent>;
  @ViewChildren('RemarksForAgency') RemarksForAgency: QueryList<TextBoxComponent>;
  @ViewChildren('WaiveOff') WaiveOff: QueryList<CheckBoxComponent>;
  @ViewChildren('RetriggerStatus') RetriggerStatus: QueryList<TextBoxComponent>;
  @ViewChildren('AddVerificationType') AddVerificationType: QueryList<ButtonComponent>;
  @ViewChildren('Initiate') Initiate: QueryList<ButtonComponent>;

  MstDataMap: Map<string, DefaultDataInterface> = new Map();
  customerDropDownList = [];
  vrfnDropDownList = [];
  cityDropDownList = [];
  agencyDropDownList = [];
  ApplicationId = undefined;

  constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
    super(services, cdRef);
    this.value = new PreCPVInputGridModel();
    this.componentCode = 'PreCPVInputGrid';
    this.initRowCount = 1;
    this.uniqueColumns = [];
    this.primaryColumns = [];
  }
  ngOnInit() {
    if (this.gridType == 1) { this.initRows(); }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'PreCPVInputGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    this.fetchVrfnCodeList();
    //this.fetchMstCityList();
  }
  ngOnDestroy() {
    for (var i = 0; i < this.unsubscribeRow$.length; i++) {
      this.unsubscribeRow$[i].next();
      this.unsubscribeRow$[i].complete();
      // this.unsubscribeHidField.next();
      // this.unsubscribeHidField.complete();
    }
    var styleElement = document.getElementById('PreCPVInputGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      //  this.subsToHiddenFieldValues();
      this.gridLoad();
    });
  }
  async gridLoad() {

  }
  async onRowAdd(rowNo) {
    this.RetriggerStatus.toArray()[rowNo].setReadOnly(true);
  }
  async onRowDelete(rowNo) {
  }
  getFieldInfo() {
    let addInfo = [];
    for (var i = 0; i < this.getRowsCount(); i++) {
      let row = {};
      row['CustomerName_desc'] = this.CustomerName.toArray()[i].getFieldInfo();
      row['VerificationType_desc'] = this.VerificationType.toArray()[i].getFieldInfo();
      row['Details_desc'] = this.Details.toArray()[i].getFieldInfo();
      row['City_desc'] = this.City.toArray()[i].getFieldInfo();
      row['Agency_desc'] = this.Agency.toArray()[i].getFieldInfo();
      addInfo.push(row);
    }
    this.additionalInfo = addInfo;
    return addInfo;
  }

  async fetchMstCityList() {
    let inputMap = new Map();
    this.cityDropDownList = [];
    inputMap.set('QueryParam.lookup', 1);
    this.services.http.fetchApi('/MstCityDetails', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        let res = httpResponse.body;
        let tempList = res['Data'];
        if (tempList) {
          this.cityDropDownList = tempList;
          this.cityDropDownList.unshift({ id: undefined, text: "" });
          this.City.forEach(element => {
            element.setStaticListOptions(this.cityDropDownList);
          });
          // tempList.forEach(element => {
          //   this.vrfnDropDownList.push({id: element.id, text: element.text });
          // });
        }
      }
    );
  }


  async fetchVrfnCodeList() {
    let inputMap = new Map();
    this.vrfnDropDownList = [];
    // const MstDescList :CostOrFundsInterface[]=[];
    inputMap.set('QueryParam.lookup', 1);
    inputMap.set('QueryParam.APPID', 'RLO');
    inputMap.set('QueryParam.KEY1', 'VERIFICATION_CODE');
    this.services.http.fetchApi('/MSTGENERALPARAM', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        let res = httpResponse.body;
        let tempList = res['Data'];
        if (tempList) {
          this.vrfnDropDownList = tempList;
          this.vrfnDropDownList.unshift({ id: undefined, text: "" });
          this.VerificationType.forEach(element => {
            element.setStaticListOptions(this.vrfnDropDownList);
          });
          // tempList.forEach(element => {
          //   this.vrfnDropDownList.push({id: element.id, text: element.text });
          // });
        }
      }
    );
  }

  VerificationType_blur(selectedCode, $event, rowNo) {
    this.Details.toArray()[selectedCode.rowNo].onReset();
    let customerId = this.CustomerName.toArray()[selectedCode.rowNo].getFieldValue();
    console.log("shweta :: selected cust ", this.MstDataMap.get(customerId).verificationList);
    let tempVeification = this.MstDataMap.get(customerId).verificationList.find(element => element.verificationCode == selectedCode.value);
    if (tempVeification == undefined) {
      this.VerificationType.toArray()[selectedCode.rowNo].setError('rlo.error.vrfndtls-not-found');
      return 1;
    }
    this.Details.toArray()[selectedCode.rowNo].setValue(tempVeification.details);
  }

  fetchDefaultData() {
    if (this.ApplicationId != undefined) {
      let inputMap = new Map();
      if (this.ApplicationId) {
        this.ClearMapsAndList();
        /*
        http://10.11.12.53:9090/los-verification/v1/proposal/3322/CPV/verification?
        ProposalId=3322&verificationtype=CPV
        */
        inputMap.set('PathParam.proposal-id', this.ApplicationId);
        inputMap.set('PathParam.verification-type', 'CPV');
        inputMap.set('QueryParam.ProposalId', this.ApplicationId);
        inputMap.set('QueryParam.verificationtype', 'CPV');
        this.services.http.fetchApi('/v1/proposal/3322/CPV/verification', 'GET', inputMap, "/los-verification").subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            let defaultData = res['verfReqDataList'];
            console.log("shweta :: verification data", defaultData);
            this.parseDefaultData(defaultData);
          },
          async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
            }
            this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
          }
        );
      }
    }
  }


  parseDefaultData(defaultDataJson) {
    this.customerDropDownList.push({ id: undefined, text: "" });
    defaultDataJson.forEach(element => {
      let customerDtls: DefaultDataInterface = {}
      let newCustomerFlag: boolean = false;
      if (this.MstDataMap.has(element.verfAdditionalDetails.field1)) {
        customerDtls = this.MstDataMap.get(element.verfAdditionalDetails.field1);
      } else {
        customerDtls.mobileNumberflag = false;
        newCustomerFlag = true;
      }
      customerDtls.customerSeq = element.verfAdditionalDetails.field1;
      customerDtls.customerType = element.verfAdditionalDetails.field2;
      customerDtls.customerName = element.verfAdditionalDetails.field3;
      if (newCustomerFlag) {
        this.customerDropDownList.push({
          id: customerDtls.customerSeq,
          text: customerDtls.customerType + '-' + customerDtls.customerName
        });
      }
      if (customerDtls.verificationList == undefined) {
        customerDtls.verificationList = [];
      }

      if (element.verfAdditionalDetails.field7 != undefined) {
        let verificationDtls: verificationInterface = {}
        verificationDtls.verificationCode = 'AD' + element.verfAdditionalDetails.field5 + element.verfAdditionalDetails.field6;
        verificationDtls.details = element.verfAdditionalDetails.field7;
        customerDtls.verificationList.push(verificationDtls);

      }
      if (!customerDtls.mobileNumberflag && element.verfAdditionalDetails.field4 != undefined) {
        let verificationDtls: verificationInterface = {}
        verificationDtls.verificationCode = 'MBPR';
        verificationDtls.details = element.verfAdditionalDetails.field4;
        customerDtls.verificationList.push(verificationDtls);
        customerDtls.mobileNumberflag = true;
      }

      this.MstDataMap.set(element.verfAdditionalDetails.field1, customerDtls);
    });
    this.CustomerName.forEach(element => {
      element.setStaticListOptions(this.customerDropDownList);
    });

    console.log("shweta :: mstDataMap", this.MstDataMap);
    console.log("shweta :: mstDataMap", this.customerDropDownList);

    // this.PreCPVGrid.setDropdownLists(this.MstDataMap);
  }
  ClearMapsAndList() {
    this.MstDataMap.clear();
    this.customerDropDownList = [];
  }

  Initiate_click(rowNo, $event) {
    console.log("row clicked", rowNo, ' : ', event);
    let inputMap = new Map();
    var noOfError: number = 0;
    if (noOfError == 0) {
      this.Initiate.toArray()[rowNo].setDisabled(true);
      inputMap = this.generateInitiateReqJSON(inputMap, rowNo);
      
      console.log("shweta :: intiation req json", inputMap)
      inputMap.set('PathParam.proposal-id', this.ApplicationId);
      this.services.http.fetchApi('/v1/proposal/{proposal-id}/verification/CPV/initiate', 'POST', inputMap, '/los-verification').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          this.services.alert.showAlert(1, 'rlo.success.precpv-initiate', 5000);
          this.onReset();
          this.Initiate.toArray()[rowNo].setDisabled(true);
        },
        async (httpError) => {
          // this.parseResponseError(httpError['error']);
          this.services.alert.showAlert(2, 'rlo.error.precpv-initiate', -1);
          this.Initiate.toArray()[rowNo].setDisabled(false);
        }
      );
    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
      this.Initiate.toArray()[rowNo].setDisabled(false);
    }


  }

  generateInitiateReqJSON(inputMap, rowNo) {
    inputMap.clear();
    inputMap.set('Body.ProposalVerfnHolder.ProposalId', this.ApplicationId);
    inputMap.set('Body.ProposalVerfnHolder.AppRefNum', '1030MOR08840990');
    // inputMap.set('Body.ProposalVerfnHolder.CreatedBy', this.TotalLocalCurEq.getFieldValue());
    inputMap.set('Body.ProposalVerfnHolder.ProposalVerfn', this.GenerateProposalVrfnJson(rowNo));
    return inputMap;
  }

  GenerateProposalVrfnJson(rowNo) {
    let verificationSummList = [];
    let vrfnSummObj = {}
    vrfnSummObj['BorrowerSeq'] = this.CustomerName.toArray()[rowNo].getFieldValue();
    vrfnSummObj['CpvType'] = this.VerificationType.toArray()[rowNo].getFieldValue();
    // vrfnSummObj['City']=this.City.toArray()[rowNo].getFieldValue();
    vrfnSummObj['AgencyName'] = this.Agency.toArray()[rowNo].getFieldValue();
    vrfnSummObj['SpecificInstructions'] = this.RemarksForAgency.toArray()[rowNo].getFieldValue();
    vrfnSummObj['VerificationWaived'] = this.WaiveOff.toArray()[rowNo].getFieldValue();
    vrfnSummObj['ProposalVerificationID'] = ''

    vrfnSummObj['AppRefNum'] = '1030MOR08840990';
    vrfnSummObj['ProposalId'] = this.ApplicationId;
    vrfnSummObj['VerificationType'] = 'CpvReq';
    vrfnSummObj['VerificationStatus'] = 'Initiated';
   // vrfnSummObj['CpvReq'] = CPVReqObj;

    verificationSummList.push(vrfnSummObj);
    return verificationSummList;
  }

  fieldDependencies = {
    City: {
      inDep: [

        { paramKey: "CityCd", depFieldID: "City", paramType: "PathParam" },
      ],
      outDep: [
      ]
    },
    Agency: {
      inDep: [

        { paramKey: "AgencySeq", depFieldID: "Agency", paramType: "PathParam" },
        { paramKey: "CityCode", depFieldID: "City", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    }
  }


}

