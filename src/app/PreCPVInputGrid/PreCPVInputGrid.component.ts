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
import { verificationInterface, customerInterface } from '../pre-cpv/pre-cpv-interface';
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';

const customCss: string = '';
@Component({
  selector: 'app-PreCPVInputGrid',
  templateUrl: './PreCPVInputGrid.component.html'
})
export class PreCPVInputGridComponent extends GridComponent implements OnInit {
  @ViewChildren('CustomerName') CustomerName: QueryList<ComboBoxComponent>;
  @ViewChildren('VerificationType') VerificationType: QueryList<ComboBoxComponent>;
  // @ViewChildren('Details') Details: QueryList<TextAreaComponent>;
  @ViewChildren('Details') Details: QueryList<ReadOnlyComponent>;
  @ViewChildren('City') City: QueryList<ComboBoxComponent>;
  @ViewChildren('Agency') Agency: QueryList<ComboBoxComponent>;
  @ViewChildren('RemarksForAgency') RemarksForAgency: QueryList<TextBoxComponent>;
  @ViewChildren('WaiveOff') WaiveOff: QueryList<CheckBoxComponent>;
  @ViewChildren('RetriggerStatus') RetriggerStatus: QueryList<ReadOnlyComponent>;
  @ViewChildren('AddVerificationType') AddVerificationType: QueryList<ButtonComponent>;
  @ViewChildren('Initiate') Initiate: QueryList<ButtonComponent>;

  MstDataMap: Map<string, customerInterface> = new Map();
  customerDropDownList = [];
  vrfnDropDownList = [];
  ApplicationId = undefined;

  constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
    super(services, cdRef);
    this.value = new PreCPVInputGridModel();
    this.componentCode = 'PreCPVInputGrid';
    this.initRowCount = 0;
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
    this.Details.toArray()[rowNo].setReadOnly(true);
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

  // async fetchMstCityList() {
  //   let inputMap = new Map();
  //   this.cityDropDownList = [];
  //   inputMap.set('QueryParam.lookup', 1);
  //   this.services.http.fetchApi('/MstCityDetails', 'GET', inputMap, '/masters').subscribe(
  //     async (httpResponse: HttpResponse<any>) => {
  //       let res = httpResponse.body;
  //       let tempList = res['Data'];
  //       if (tempList) {
  //         this.cityDropDownList = tempList;
  //         this.cityDropDownList.unshift({ id: undefined, text: "" });
  //         this.City.forEach(element => {
  //           element.setStaticListOptions(this.cityDropDownList);
  //         });
  //         // tempList.forEach(element => {
  //         //   this.vrfnDropDownList.push({id: element.id, text: element.text });
  //         // });
  //       }
  //     }
  //   );
  // }


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
          if (this.vrfnDropDownList != undefined) {
            this.fetchDefaultData();
          }

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
        this.services.http.fetchApi('/v1/proposal/{proposal-id}/CPV/verification', 'GET', inputMap, "/los-verification").subscribe(
          async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
            let defaultData = res['CPVResp'];
            
            // this.parseDefaultData(defaultData);
            this.parseVerificationResp(defaultData);
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

  parseVerificationResp(defaultData) {
    let existingVrfnList = undefined;
    if (defaultData['CustomerRecords'] != undefined) {
      if (defaultData['CPVRecords'] != undefined) {
        existingVrfnList = defaultData['CPVRecords'];
      }
      defaultData['CustomerRecords'].forEach(eachCustomer => {
        let customerDtls: customerInterface = {}
        let newCustomerFlag: boolean = false;
        if (this.MstDataMap.has(eachCustomer.FIELD1)) {
          customerDtls = this.MstDataMap.get(eachCustomer.FIELD1);
        } else {
          newCustomerFlag = true;
        }
        customerDtls.customerSeq = eachCustomer.FIELD1;
        customerDtls.customerType = eachCustomer.FIELD2;
        customerDtls.customerName = eachCustomer.FIELD3;

        if (newCustomerFlag) {
          this.customerDropDownList.push({
            id: customerDtls.customerSeq,
            text: customerDtls.customerType + '-' + customerDtls.customerName
          });
        }

        if (customerDtls.verificationList == undefined) {
          customerDtls.verificationList = [];
        }

        if (eachCustomer.FIELD4 != undefined) {
          customerDtls.verificationList = this.mergeCustAndVrfnDtls('MOBVR', eachCustomer.FIELD4, existingVrfnList, customerDtls);
        }
        if (eachCustomer.FIELD6 != undefined) {
          // customerDtls.verificationList.push(
          //   this.mergeCustAndVrfnDtls('BVR', eachCustomer.FIELD6, existingVrfnList, customerDtls.customerSeq));
          customerDtls.verificationList = this.mergeCustAndVrfnDtls('BVR', eachCustomer.FIELD6, existingVrfnList, customerDtls, eachCustomer.OF_SEQ);
          if (eachCustomer.FIELD6 == eachCustomer.FIELD8 || eachCustomer.FIELD6 == eachCustomer.FIELD10) {
            // customerDtls.verificationList.push(
            //   this.mergeCustAndVrfnDtls('ROVR', eachCustomer.FIELD6, existingVrfnList, customerDtls.customerSeq));
            customerDtls.verificationList = this.mergeCustAndVrfnDtls('ROVR', eachCustomer.FIELD6, existingVrfnList, customerDtls, eachCustomer.OF_SEQ);

          }
        }
        if (eachCustomer.FIELD8 != undefined) {
          // customerDtls.verificationList.push(
          //   this.mergeCustAndVrfnDtls('RVR', eachCustomer.FIELD8, existingVrfnList, customerDtls.customerSeq));
          customerDtls.verificationList = this.mergeCustAndVrfnDtls('RVR', eachCustomer.FIELD8, existingVrfnList, customerDtls,eachCustomer.RSCR_SEQ);

        }
        this.MstDataMap.set(eachCustomer.FIELD1, customerDtls);
      });
      this.customerDropDownList.unshift({ id: undefined, text: "" });
      this.CustomerName.forEach(element => {
        element.setStaticListOptions(this.customerDropDownList);
      });
      this.loadRecords();
      
    }
  }

  loadRecords() {
    let rowCounter = 0;
    this.MstDataMap.forEach(eachCustomer => {
      if (eachCustomer.verificationList.length > 0) {
        eachCustomer.verificationList.forEach(eachVrfn => {
          let rowData = {};
          if (eachVrfn.ProposalVerificationID) {
            rowData['CustomerName'] = eachCustomer.customerSeq;
            rowData['VerificationType'] = eachVrfn.verificationCode;
            rowData['Details'] = eachVrfn.details;
            rowData['City'] = eachVrfn.City;
            rowData['Agency'] = eachVrfn.AgencyCode;
            rowData['RemarksForAgency'] = eachVrfn.SpecificInstructions;
            rowData['WaiveOff'] = eachVrfn.VerificationWaived == 'true' ? true : false;
            if (eachVrfn.RLODecision == 'RET') {
              rowData['RetriggerStatus'] = eachVrfn.RLODecision;
            }
            else if (eachVrfn.RLODecision == 'RETD') {
              rowData['RetriggerStatus'] = eachVrfn.RLODecision;
            }

            rowCounter = this.addRow(rowData);
            this.disableRow(rowCounter);

          }
        });
      }
    });
    this.addEmptyRow(rowCounter);
  }
  disableRow(rowNo) {
    this.CustomerName.toArray()[rowNo].setReadOnly(true);
    this.VerificationType.toArray()[rowNo].setReadOnly(true);
    this.Details.toArray()[rowNo].setReadOnly(true);
    this.City.toArray()[rowNo].setReadOnly(true);
    this.Agency.toArray()[rowNo].setReadOnly(true);
    this.RemarksForAgency.toArray()[rowNo].setReadOnly(true);
    this.WaiveOff.toArray()[rowNo].setReadOnly(true);
    this.RetriggerStatus.toArray()[rowNo].setReadOnly(true);
    this.AddVerificationType.toArray()[rowNo].setDisabled(true);
    this.Initiate.toArray()[rowNo].setDisabled(true);
  }
  mergeCustAndVrfnDtls(tempVrfnCode, details, ExistingVrfnList, customer, addresSeq?:number) {
    let tempVerificationList = customer.verificationList;

    if (ExistingVrfnList != undefined) {
      let filteredVrfns = ExistingVrfnList.filter(eachRecord => eachRecord.VerfnCode == tempVrfnCode && eachRecord.BorrowerSeq == customer.customerSeq);

      if (filteredVrfns != undefined && filteredVrfns.length != 0) {
        filteredVrfns.forEach(eachVrfn => {
          let verificationDtls: verificationInterface = {}
          verificationDtls.verificationCode = tempVrfnCode;
          if(addresSeq!=undefined){
            verificationDtls.AddressSequence=addresSeq;
          }
          verificationDtls.details = details;
          verificationDtls.ProposalVerificationID = eachVrfn.ProposalVerificationID;
          verificationDtls.VerificationStatus = eachVrfn.VerificationStatus;
          verificationDtls.SpecificInstructions = eachVrfn.SpecificInstructions;
          verificationDtls.VerificationTxnId = eachVrfn.VerificationTxnId;
          verificationDtls.VerificationType = eachVrfn.VerificationType;
          verificationDtls.VerificationWaived = eachVrfn.VerificationWaived;
          verificationDtls.City = eachVrfn.City;
          verificationDtls.AgencyCode = eachVrfn.AgencyCode;
          verificationDtls.RedoVersion = eachVrfn.RedoVersion;
          verificationDtls.RedoAddressLine1 = eachVrfn.RedoAddressLine1;
          verificationDtls.RedoAddressLine2 = eachVrfn.RedoAddressLine2;
          verificationDtls.RedoAddressLine3 = eachVrfn.RedoAddressLine3;
          verificationDtls.RedoAddressLine4 = eachVrfn.RedoAddressLine4;
          verificationDtls.RedoPhoneNumber = eachVrfn.RedoPhoneNumber;
          verificationDtls.RedoDate = eachVrfn.RedoDate;
          verificationDtls.RedoCity = eachVrfn.RedoCity;
          verificationDtls.RedoPinCode = eachVrfn.RedoPinCode;
          verificationDtls.RedoSpecificInstructions = eachVrfn.RedoSpecificInstructions;
          verificationDtls.DecisionType = eachVrfn.DecisionType;
          verificationDtls.RLODecision = eachVrfn.RLODecision;
          verificationDtls.DecisionRemarks = eachVrfn.DecisionRemarks;
          tempVerificationList.push(verificationDtls);
        });
      }
    }
    let verificationDtls: verificationInterface = {}
    verificationDtls.verificationCode = tempVrfnCode;
    verificationDtls.details = details;
    tempVerificationList.push(verificationDtls);
    return tempVerificationList;
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
      // this.checkDuplicates(rowNo);
      inputMap = this.generateInitiateReqJSON(inputMap, rowNo);

      
      inputMap.set('PathParam.proposal-id', this.ApplicationId);
      this.services.http.fetchApi('/v1/proposal/{proposal-id}/verification/CPV/initiate', 'POST', inputMap, '/los-verification').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          this.services.alert.showAlert(1, 'rlo.success.precpv-initiate', 5000);
          //  this.onReset();
          //  this.fetchVrfnCodeList();
          this.disableRow(rowNo);
          this.addEmptyRow(rowNo);
          //  this.Initiate.toArray()[rowNo].setDisabled(true);
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

  checkDuplicates(rowNo) {

    let customerSeq = this.CustomerName.toArray()[rowNo].getFieldValue();
    let vrfnCode = this.VerificationType.toArray()[rowNo].getFieldValue();
    let duplicateList = this.MstDataMap.get(customerSeq).verificationList.filter(eachVrfn =>
      eachVrfn.verificationCode == vrfnCode && eachVrfn.AgencyCode != undefined
    );
    
    return duplicateList != undefined && duplicateList.length != 0 ? duplicateList.length : undefined;
  }
  getAddressSequence(rowNo){
    let customerSeq = this.CustomerName.toArray()[rowNo].getFieldValue();
    let vrfnCode = this.VerificationType.toArray()[rowNo].getFieldValue();
    let tempVrfnObj = this.MstDataMap.get(customerSeq).verificationList.find(eachVrfn =>
      eachVrfn.verificationCode == vrfnCode 
    );
    return tempVrfnObj.AddressSequence;
  }
  generateInitiateReqJSON(inputMap, rowNo) {
    inputMap.clear();
    inputMap.set('Body.ProposalVerfnHolder.ProposalId', this.ApplicationId);
    inputMap.set('Body.ProposalVerfnHolder.AppRefNum', this.services.rloCommonData.globalApplicationDtls.ARN);
    // inputMap.set('Body.ProposalVerfnHolder.CreatedBy', this.TotalLocalCurEq.getFieldValue());
    inputMap.set('Body.ProposalVerfnHolder.ProposalVerfn', this.GenerateProposalVrfnJson(rowNo));
    return inputMap;
  }

  GenerateProposalVrfnJson(rowNo) {
    let verificationSummList = [];
    let vrfnSummObj = {}
    vrfnSummObj['BorrowerSeq'] = this.CustomerName.toArray()[rowNo].getFieldValue();
    vrfnSummObj['CpvType'] = this.VerificationType.toArray()[rowNo].getFieldValue();
    vrfnSummObj['City'] = this.City.toArray()[rowNo].getFieldValue();
    vrfnSummObj['AgencyName'] = this.Agency.toArray()[rowNo].getFieldValue();
    vrfnSummObj['SpecificInstructions'] = this.RemarksForAgency.toArray()[rowNo].getFieldValue();
    vrfnSummObj['VerificationWaived'] = this.WaiveOff.toArray()[rowNo].getFieldValue();
    if( this.VerificationType.toArray()[rowNo].getFieldValue()!='MOBVR'){
    vrfnSummObj['ADDRESS_DETAILS_SEQ'] = this.getAddressSequence(rowNo);
    }
    vrfnSummObj['ProposalVerificationID'] = '';
    vrfnSummObj['AppRefNum'] = this.services.rloCommonData.globalApplicationDtls.ARN;
    vrfnSummObj['ProposalId'] = this.ApplicationId;
    vrfnSummObj['VerificationType'] = 'CpvReq';
    vrfnSummObj['VerificationStatus'] = 'Initiated';
    vrfnSummObj['RedoVerification'] = this.checkDuplicates(rowNo);

    // vrfnSummObj['CpvReq'] = CPVReqObj;

    verificationSummList.push(vrfnSummObj);
    return verificationSummList;
  }

  City_blur(City, event, rowNo) {
   
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

