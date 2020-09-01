import { Component, OnInit, ElementRef, Renderer2, ViewChildren, QueryList, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { HttpResponse } from '@angular/common/http';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { IPolicy } from './PolicyCheckInterface';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-policy-check-result',
  templateUrl: './policy-check-result.component.html',
  styleUrls: ['./policy-check-result.component.css']
})

export class PolicyCheckResultComponent implements OnInit {
  // if (this.formCode == undefined) { this.formCode = 'PolicyCheckResultDtls'; }
  ErrorSet = new Set([]);
  @ViewChildren('tbData') domRef: QueryList<ElementRef>;
  @ViewChild('PCR_Filter', { static: false }) PCR_Filter: ComboBoxComponent;
  @ViewChild('PCR_RETRIGGER_BTN', { static: false }) PCR_RETRIGGER_BTN: ButtonComponent;

  @Input() ApplicationId: string = undefined;
  parentFormCode: string = undefined;
  activePolicyResultList: IPolicy[] = undefined;
  mainBorrower: string = undefined;
  FilterOptions = [];
  MstPolicyResultMap: Map<string, IPolicy[]> = new Map();
  openInModal: boolean = false;//set true if wanna open in modal.UW header scores

  constructor(private services: ServiceStock, private renderer2: Renderer2) { }

  ngOnInit() {
    this.setFilterbyOptions();
    this.retriggerPolicyResult();

    // this.invokeInterface();
    // this.loadPolicyResult();
  }
  setFilterbyOptions() {
    this.FilterOptions = [];
    if (this.openInModal) {
      this.FilterOptions = this.services.rloui.customerDataDropDown;
      console.log(this.FilterOptions);
      this.FilterOptions.forEach(element => {
        let customerType = element.text.split("-")[0];
        if (customerType == "B") {
          this.mainBorrower = element.id.split("_")[1];
        }
      });
    }
    else {
      let tempCustomerList = this.services.rloCommonData.getCustomerList();
      console.log("shweta :: in score section", tempCustomerList);

      this.FilterOptions.push({ id: 'A_' + this.ApplicationId, text: 'Application' });
      tempCustomerList.forEach(element => {
        if (element.CustomerType == 'B') {
          // this.FilterOptions.push({ id: 'A_' + element.CustSeq, text: 'Application' });
          this.mainBorrower = element.BorrowerSeq;
        }
        this.FilterOptions.push({ id: 'C_' + element.BorrowerSeq, text: element.CustomerType + '-' + element.FullName });
      });
    }
    console.log("shweta :: score options list", this.FilterOptions);
  }

  loadPolicyResult() {
    let inputMap = new Map();
    if (this.ApplicationId != undefined) {
      inputMap.clear();
      let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
      if (this.ApplicationId) {
        criteriaJson.FilterCriteria.push({
          "columnName": "ApplicationId",
          "columnType": "String",
          "conditions": {
            "searchType": "equals",
            "searchText": this.ApplicationId
          }
        });
        // inputMap.set('QueryParam.ApplicationId', this.ApplicationId);
        inputMap.set('QueryParam.criteriaDetails', criteriaJson);
        this.services.http.fetchApi('/PolicyResult', 'GET', inputMap, '/rlo-de').subscribe(
          async (httpResponse: HttpResponse<any>) => {
            let res = httpResponse.body;
            let tempPolicyResultList = res['PolicyResult'];
            this.parsePolicyResultJson(tempPolicyResultList);
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
  parsePolicyResultJson(tempPolicyResultList) {
    let newPolicyResultList = [];
    this.activePolicyResultList = [];
    
    console.log("shweta :: policy Resp:", tempPolicyResultList);
    tempPolicyResultList.forEach(eachPolicy => {
      if (this.parentFormCode == eachPolicy.Stage) {
        let newMapKey = undefined;
        if (eachPolicy.CustSeq) {
          newMapKey = 'C_' + eachPolicy.CustSeq;
        } else {
          newMapKey = 'A_' + this.ApplicationId;
        }
        if (this.MstPolicyResultMap.has(newMapKey)) {
          newPolicyResultList = this.MstPolicyResultMap.get(newMapKey);
        } else {
          newPolicyResultList = [];
        }
        let policy: IPolicy = eachPolicy;
        newPolicyResultList.push(policy);
        if (newMapKey != undefined) {
          this.MstPolicyResultMap.set(newMapKey, newPolicyResultList);
        }
      }
    });
    this.mergeBorAndAppRecords();
    this.removeEmptyOptions();

    this.activePolicyResultList = this.MstPolicyResultMap.get(this.PCR_Filter.getFieldValue());
    console.log("shweta :: mstPolicy list", this.MstPolicyResultMap);
    console.warn(this.activePolicyResultList);

    if (this.activePolicyResultList.length) {
      //store data in map
      var array = [];
      array.push({ isValid: true, sectionData: this.activePolicyResultList });

      let obj = {
        "name": "PolicyCheckResults",
        "data": array,
        "sectionName": "PolicyCheckResults"
      }
      this.services.rloCommonData.globalComponentLvlDataHandler(obj);
    }

  }

  mergeBorAndAppRecords() {
    let appPolicyResultList = [];
    if (this.MstPolicyResultMap.has('C_' + this.mainBorrower)) {
      if (this.MstPolicyResultMap.has('A_' + this.ApplicationId)) {
        appPolicyResultList = this.MstPolicyResultMap.get('A_' + this.ApplicationId).concat(
          this.MstPolicyResultMap.get('C_' + this.mainBorrower));
      }
      else {
        appPolicyResultList = this.MstPolicyResultMap.get('C_' + this.mainBorrower);
      }
      this.MstPolicyResultMap.set('A_' + this.ApplicationId, appPolicyResultList);
    }
  }
  removeEmptyOptions() {
    this.FilterOptions.forEach(element => {
      console.log('shweta :: reducer method', element.id);
      if (!this.MstPolicyResultMap.has(element.id)) {
        const index = this.FilterOptions.indexOf(element);
        if (index > -1) {
          this.FilterOptions.splice(index, 1);
        }
      }
    });
  }

  // invokeInterface() {
  //   this.MstPolicyResultMap.clear();
  //   let inputMap = this.generateRetriggerRequestJson();
  //   this.services.http.fetchApi('/api/invokeInterface', 'POST', inputMap, '/los-integrator').subscribe(
  //     async (httpResponse: HttpResponse<any>) => {
  //       let res = httpResponse.body;
  //       this.retriggerPolicyResult(res);

  //       //do UW validation here 
  //     }, async (httpError) => {
  //       var err = httpError['error']
  //       if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
  //       }
  //       this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
  //     }
  //   );
  // }

  retriggerPolicyResult() {

    // let inputMap = this.generateRetriggerRequestJson();
    // console.log("shweta :: input map",inputMap);
    //  let inputMap = this.generatepolicyCheckReq(res);
    this.MstPolicyResultMap.clear();
    let inputMap = this.generateRetriggerRequestJson();
    this.services.http.fetchApi('/policyCheck', 'POST', inputMap, '/initiation').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        let res = httpResponse.body['ouputdata'];
        if (res.OVERALLSCORE) {
          console.log("Shweta :: BRE response ", res.OVERALLRESULT, " : ", res.OVERALLRESULT);
          this.loadPolicyResult();
        } else if (res.error) {
          this.services.alert.showAlert(2, 'rlo.error.bre-exception', -1);
        } else {
          this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
        }
      },
      async (httpError) => {
        var err = httpError['error']
        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
        }
        this.services.alert.showAlert(2, 'rlo.error.load.form', -1);
      }
    );
  }

  generatepolicyCheckReq(res) {
    let inputMap = new Map();
    inputMap.set('Body.prposalid', res['prposalid']);
    inputMap.set('Body.interfaceId', res['interfaceId']);
    inputMap.set('Body.ouputdata', res['ouputdata']);

    return inputMap;
  }
  generateRetriggerRequestJson() {
    let inputMap = new Map();
    inputMap.set('Body.interfaceId', 'INT007');
    inputMap.set('Body.prposalid', this.ApplicationId);
    // inputMap.set('Body.inputdata.SCHEME_CD', 'HOUSEC');
    inputMap.set('Body.inputdata.SCHEME_CD', this.services.rloCommonData.globalApplicationDtls.SchemeCode);
    return inputMap;
  }

  PCR_Filter_Blur() {
    console.log("shweta :: selected option", this.PCR_Filter.getFieldValue());
    this.activePolicyResultList = this.MstPolicyResultMap.get(this.PCR_Filter.getFieldValue());
  }
}
