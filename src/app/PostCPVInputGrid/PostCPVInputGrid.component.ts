import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, QueryList, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PostCPVInputGridModel } from './PostCPVInputGrid.model';
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
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';
import { ButtonComponent } from '../button/button.component';
import { verificationInterface, customerInterface } from '../pre-cpv/pre-cpv-interface';

const customCss: string = '';
@Component({
  selector: 'app-PostCPVInputGrid',
  templateUrl: './PostCPVInputGrid.component.html'
})
export class PostCPVInputGridComponent extends GridComponent implements OnInit {
  // @ViewChildren('SrNo') SrNo: QueryList<ReadOnlyComponent>;
  @ViewChildren('CustomerName') CustomerName: QueryList<ReadOnlyComponent>;
  @ViewChildren('VerificationType') VerificationType: QueryList<ReadOnlyComponent>;
  @ViewChildren('Details') Details: QueryList<ReadOnlyComponent>;
  @ViewChildren('Agency') Agency: QueryList<ReadOnlyComponent>;
  @ViewChildren('InitiatorRemarks') InitiatorRemarks: QueryList<ReadOnlyComponent>;
  @ViewChildren('VerificationResult') VerificationResult: QueryList<ReadOnlyComponent>;
  @ViewChildren('VerificationRemarks') VerificationRemarks: QueryList<ReadOnlyComponent>;
  @ViewChildren('CompletionResult') CompletionResult: QueryList<ComboBoxComponent>;
  @ViewChildren('CompletionRemarks') CompletionRemarks: QueryList<TextBoxComponent>;
  @ViewChildren('SaveVrfn') SaveVrfn: QueryList<ButtonComponent>;
  //@ViewChildren('hidAppId') hidAppId: QueryList<HiddenComponent>;
  //@ViewChild('hidCompletionResult', { static: false }) hidCompletionResult: HiddenComponent;

  MstDataMap: Map<string, customerInterface> = new Map();
  customerDropDownList = [];
  ApplicationId = undefined;
  ComplnRsltDropDownList = [];
  ARN = '1030MOR08840990';

  constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
    super(services, cdRef);
    this.value = new PostCPVInputGridModel();
    this.componentCode = 'PostCPVInputGrid';
    this.initRowCount = 0;
    this.uniqueColumns = [];
    this.primaryColumns = [];
  }
  ngOnInit() {
    if (this.gridType == 1) { this.initRows(); }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'PostCPVInputGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    this.fetchMstComplnRsltList();
  }
  ngOnDestroy() {
    for (var i = 0; i < this.unsubscribeRow$.length; i++) {
      this.unsubscribeRow$[i].next();
      this.unsubscribeRow$[i].complete();
      // this.unsubscribeHidField.next();
      // this.unsubscribeHidField.complete();
    }
    var styleElement = document.getElementById('PostCPVInputGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      // this.subsToHiddenFieldValues();
      this.gridLoad();
    });
  }
  async gridLoad() {
    // this.hidAppId.setValue('RLO');
    // this.hidCompletionResult.setValue('VRFN_CMPLTN_RSLT');

  }
  async onRowAdd(rowNo) {
  }
  async onRowDelete(rowNo) {
  }
  getFieldInfo() {
    let addInfo = [];
    for (var i = 0; i < this.getRowsCount(); i++) {
      let row = {};
      row['POSTCPV_CompletionResult_desc'] = this.CompletionResult.toArray()[i].getFieldInfo();
      addInfo.push(row);
    }
    this.additionalInfo = addInfo;
    return addInfo;
  }
  async fetchMstComplnRsltList() {
    let inputMap = new Map();
    this.ComplnRsltDropDownList = [];
    // const MstDescList :CostOrFundsInterface[]=[];
    inputMap.set('QueryParam.lookup', 1);
    inputMap.set('QueryParam.APPID', 'RLO');
    inputMap.set('QueryParam.KEY1', 'VRFN_CMPLTN_RSLT');
    this.services.http.fetchApi('/MSTGENERALPARAM', 'GET', inputMap, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        let res = httpResponse.body;
        let tempList = res['Data'];
        if (tempList) {
          this.ComplnRsltDropDownList = tempList;
          this.ComplnRsltDropDownList.unshift({ id: undefined, text: "" });
          this.CompletionResult.forEach(element => {
            element.setStaticListOptions(this.ComplnRsltDropDownList);
          });
          if (this.ComplnRsltDropDownList != undefined) {
            this.fetchDefaultData();
          }

          // tempList.forEach(element => {
          //   this.vrfnDropDownList.push({id: element.id, text: element.text });
          // });
        }
      }
    );
  }

  fetchDefaultData() {
    if (this.ApplicationId != undefined) {
      let inputMap = new Map();
      if (this.ApplicationId) {
        this.MstDataMap.clear();
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
          customerDtls.verificationList = this.mergeCustAndVrfnDtls('BVR', eachCustomer.FIELD6, existingVrfnList, customerDtls);
          if (eachCustomer.FIELD6 == eachCustomer.FIELD8 || eachCustomer.FIELD6 == eachCustomer.FIELD10) {
            // customerDtls.verificationList.push(
            //   this.mergeCustAndVrfnDtls('ROVR', eachCustomer.FIELD6, existingVrfnList, customerDtls.customerSeq));
            customerDtls.verificationList = this.mergeCustAndVrfnDtls('ROVR', eachCustomer.FIELD6, existingVrfnList, customerDtls);

          }
        }
        if (eachCustomer.FIELD8 != undefined) {
          // customerDtls.verificationList.push(
          //   this.mergeCustAndVrfnDtls('RVR', eachCustomer.FIELD8, existingVrfnList, customerDtls.customerSeq));
          customerDtls.verificationList = this.mergeCustAndVrfnDtls('RVR', eachCustomer.FIELD8, existingVrfnList, customerDtls);

        }
        this.MstDataMap.set(eachCustomer.FIELD1, customerDtls);
      });
      this.loadRecords();

    }
  }

  mergeCustAndVrfnDtls(tempVrfnCode, details, ExistingVrfnList, customer) {
    let tempVerificationList = customer.verificationList;

    if (ExistingVrfnList != undefined) {
      let filteredVrfns = ExistingVrfnList.filter(eachRecord => eachRecord.VerfnCode == tempVrfnCode && eachRecord.BorrowerSeq == customer.customerSeq);

      if (filteredVrfns != undefined) {
        filteredVrfns.forEach(eachVrfn => {
          let verificationDtls: verificationInterface = {}
          verificationDtls.verificationCode = tempVrfnCode;
          verificationDtls.details = details;
          verificationDtls.ProposalVerificationID = eachVrfn.ProposalVerificationID;
          verificationDtls.VerificationStatus = eachVrfn.VerificationStatus;
          verificationDtls.SpecificInstructions = eachVrfn.SpecificInstructions;
          verificationDtls.VerificationTxnId = eachVrfn.VerificationTxnId;
          verificationDtls.VerificationType = eachVrfn.VerificationType;
          verificationDtls.VerificationWaived = eachVrfn.VerificationWaived;
          verificationDtls.VerificationRemark = eachVrfn.VerificationRemark;
          verificationDtls.OverallAssessment = eachVrfn.OverallAssessment;
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
    return tempVerificationList;
  }

  loadRecords() {
    let rowCounter = 0;
    this.MstDataMap.forEach(eachCustomer => {
      if (eachCustomer.verificationList.length > 0) {
        eachCustomer.verificationList.forEach(eachVrfn => {
          let rowData = {};
          if (eachVrfn.ProposalVerificationID) {
            rowData['CustomerName'] = eachCustomer.customerType + '-' + eachCustomer.customerName;
            rowData['VerificationType'] = eachVrfn.verificationCode;
            rowData['Details'] = eachVrfn.details;
            rowData['Agency'] = eachVrfn.AgencyCode;
            rowData['InitiatorRemarks'] = eachVrfn.SpecificInstructions;
            rowData['VerificationResult'] = eachVrfn.OverallAssessment;
            rowData['VerificationRemarks'] = eachVrfn.VerificationRemark;
            rowData['CompletionResult'] = eachVrfn.RLODecision;
            rowData['CompletionRemarks'] = eachVrfn.DecisionRemarks;
            // rowData['SaveVrfn'] = eachVrfn.SpecificInstructions;
            rowCounter = this.addRow(rowData);
            eachVrfn.rowNumber = rowCounter;

            if (eachVrfn.RLODecision != undefined) {
              this.disableRow(rowCounter);
            }

          }
        });
      }
    });
  }

  SaveVrfn_click(rowNo, $event) {
    console.log("row clicked", rowNo, ' : ', event);
    let inputMap = new Map();
    var noOfError: number = 0;
    if (noOfError == 0) {
      this.SaveVrfn.toArray()[rowNo].setDisabled(true);
      inputMap = this.generateSaveVrfnReqJSON(inputMap, rowNo);


      inputMap.set('PathParam.proposal-id', this.ApplicationId);
      this.services.http.fetchApi('/v1/proposal/{proposal-id}/verification/CPV/accept/save', 'POST', inputMap, '/los-verification').subscribe(
        async (httpResponse: HttpResponse<any>) => {
          var res = httpResponse.body;
          this.services.alert.showAlert(1, 'rlo.success.postcpv-dicisionsave', 5000);
          //  this.onReset();
          //  this.fetchVrfnCodeList();
          this.disableRow(rowNo);
          //  this.SaveVrfn.toArray()[rowNo].setDisabled(true);
        },
        async (httpError) => {
          // this.parseResponseError(httpError['error']);
          this.services.alert.showAlert(2, 'rlo.error.postcpv-dicisionsave', -1);
          this.SaveVrfn.toArray()[rowNo].setDisabled(false);
        }
      );
    }
    else {
      this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
      this.SaveVrfn.toArray()[rowNo].setDisabled(false);
    }
  }

  disableRow(rowNo) {
    this.CustomerName.toArray()[rowNo].setReadOnly(true);
    this.VerificationType.toArray()[rowNo].setReadOnly(true);
    this.Details.toArray()[rowNo].setReadOnly(true);
    this.Agency.toArray()[rowNo].setReadOnly(true);
    this.InitiatorRemarks.toArray()[rowNo].setReadOnly(true);
    this.VerificationResult.toArray()[rowNo].setReadOnly(true);
    this.VerificationRemarks.toArray()[rowNo].setReadOnly(true);
    this.CompletionResult.toArray()[rowNo].setReadOnly(true);
    this.CompletionRemarks.toArray()[rowNo].setReadOnly(true);
    this.SaveVrfn.toArray()[rowNo].setDisabled(true);
  }
  generateSaveVrfnReqJSON(inputMap, rowNo) {
    this.services.rloCommonData.globalApplicationDtls.ARN = '1030MOR08840990';
    inputMap.clear();
    inputMap.set('Body.ProposalVerfnHolder.ProposalId', this.ApplicationId);
    inputMap.set('Body.ProposalVerfnHolder.AppRefNum', this.services.rloCommonData.globalApplicationDtls.ARN);
    //inputMap.set('Body.ProposalVerfnHolder.VerificationTxnId', this.VerificationTxnId);

    // inputMap.set('Body.ProposalVerfnHolder.CreatedBy', this.TotalLocalCurEq.getFieldValue());
    inputMap.set('Body.ProposalVerfnHolder.ProposalVerfn', this.GenerateProposalVrfnJson(rowNo));
    return inputMap;
  }


  GenerateProposalVrfnJson(rowNo) {
    let verificationSummList = [];
    let vrfnSummObj = {}

    vrfnSummObj['ProposalVerificationID'] = this.getProposalVrfnId(rowNo);
    vrfnSummObj['DecisionType'] = this.CompletionResult.toArray()[rowNo].getFieldValue();
    vrfnSummObj['DecisionRemarks'] = this.CompletionRemarks.toArray()[rowNo].getFieldValue();
    vrfnSummObj['AppRefNum'] = this.services.rloCommonData.globalApplicationDtls.ARN;
    vrfnSummObj['ProposalId'] = this.ApplicationId;
    vrfnSummObj['VerificationType'] = 'CpvReq';
    vrfnSummObj['VerificationStatus'] = 'SaveCPV';
    vrfnSummObj['DecisionBy'] = 'CpvReq';


    // vrfnSummObj['CpvReq'] = CPVReqObj;

    verificationSummList.push(vrfnSummObj);
    return verificationSummList;
  }

  getProposalVrfnId(rowNo) {
    let vrfnProposalId = undefined;
    this.CustomerName.toArray()[rowNo].getFieldValue();
    for (let customerDtls of Array.from(this.MstDataMap.values())) {
      //console.log(customerDtls);
      if (customerDtls.verificationList.length > 0) {
        let selectedVrfn = customerDtls.verificationList.find(eachVrfn =>
          eachVrfn.rowNumber == rowNo
        );
        if (selectedVrfn != undefined) {
          vrfnProposalId = selectedVrfn.ProposalVerificationID;
          return selectedVrfn.ProposalVerificationID;
        }
      }
    }

    return vrfnProposalId;
  }

  fieldDependencies = {
    //   CompletionResult: {
    //     inDep: [
    //       { paramKey: "VALUE1", depFieldID: "CompletionResult", paramType: "PathParam" },
    //       { paramKey: "APPID", depFieldID: "hidAppId_{{rowNo}}", paramType: "QueryParam" },
    //       { paramKey: "KEY1", depFieldID: "hidCompletionResult", paramType: "QueryParam" },
    //     ],
    //     outDep: [
    //     ]
    //   }
  }


}
