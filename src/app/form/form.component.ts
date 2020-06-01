import { Component, OnInit, ViewChildren, QueryList, Input, InjectionToken, Inject, RootRenderer } from '@angular/core';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { DateComponent } from '../date/date.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { Data } from '../DataService';
import { ProvidehttpService } from '../providehttp.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmountComponent } from '../amount/amount.component';
import { ServiceStock } from '../service-stock.service';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { FieldComponent } from '../field/field.component';
import { Subject, Observable } from 'rxjs';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { LabelComponent } from '../label/label.component';
import { takeUntil } from 'rxjs/operators';
import { HiddenComponent } from '../hidden/hidden.component';
import * as toPromise from 'rxjs/add/operator/toPromise';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
//import { ModalComponent } from 'src/app/modal/modal.component';

declare let addResizeListener: any;
declare let $: any;
window["$"] = $;
window["jQuery"] = $;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input('displayBorder') displayBorder: boolean = true;
  @Input('displayTitle') displayTitle: boolean = true;
  @Input('displayToolbar') displayToolbar: boolean = true;

  @Input('formCode') formCode: string;
  @Input('fieldID') fieldID: string;
  @Input('readOnly') readOnly: boolean = false;

  @ViewChildren(ComboBoxComponent) comboFields: QueryList<ComboBoxComponent>;
  @ViewChildren(TextBoxComponent) textboxFields: QueryList<TextBoxComponent>;
  @ViewChildren(TextAreaComponent) textareaFields: QueryList<TextAreaComponent>;
  @ViewChildren(DateComponent) dateFields: QueryList<DateComponent>;
  @ViewChildren(FileuploadComponent) fileUploadFields: QueryList<FileuploadComponent>;
  @ViewChildren(AmountComponent) amountComponent: QueryList<AmountComponent>;
  @ViewChildren(CheckBoxComponent) checkboxComponent: QueryList<CheckBoxComponent>;
  @ViewChildren(LabelComponent) labelComponent: QueryList<LabelComponent>;
  @ViewChildren(HiddenComponent) hiddenComponent: QueryList<HiddenComponent>;
  @ViewChildren(RLOUIRadioComponent) radioFields: QueryList<RLOUIRadioComponent>;

  //formCode : string;
  errors = 0;
  revalidation = false;
  draftNo: any;
  draftRemarks: any;
  mode = 'E';
  formOnLoadError = false;
  submitData = {};
  formOnLoadErrorMsg = undefined;
  repairReq = '0';
  srvRefNumG: string;
  iterSl: string;
  additionalInfo = {};
  errorMessage = [];

  fieldDependencies = {};

  csrfValue: any;
  tfaReq: any;
  tfaEncodedValue: any;

  submitServiceCode: string;
  submitGatewayCode: string;
  nextPage: string;

  hidden: boolean = false;

  private changeValue = new Subject<any>();
  public valueChangeUpdates(): Observable<any> {
    return this.changeValue.asObservable();
  }

  protected passNewValue(value: any) {
    this.changeValue.next(value);
  }

  dependencyMap = new Map<string, string>();
  protected value: any = undefined;

  constructor(public services: ServiceStock) {
    // this.formCode = "EACNOPENREQ";
    let genericData = services.dataStore.formGenericData;
    if (genericData) {
      this.csrfValue = genericData['_CSRF'];
      this.tfaReq = genericData['TFA_REQ'];
    }

    if (this.services.routing.currModal) {
      let params = this.services.http.mapToJson(services.dataStore.getData(this.services.routing.currModal));
      if (params['Repair']) {
        this.repairReq = '1';
        this.srvRefNumG = params['srvRefNum'];
        this.iterSl = params['iterSl'];
      } else if (params['iterSl']) {
        this.iterSl = params['iterSl'];
      }
    }
  }

  loadSpinner = false;
  showSpinner() {
    this.loadSpinner = true;
  }
  hideSpinner() {
    this.loadSpinner = false;
  }

  initDependency(key, paramType) { }

  getDependency(key) {
    return this.dependencyMap.get(key);
  }

  setDependency(depFldId: string, value) { //key will always be depFieldId 
    // because 1) It will always be called from parent component
    // 2) we can not take paramKey and update the dependency because 
    // more than one domain object can have same param key and every place
    // it can mean different

    // let keyToMatch = 'paramKey';
    // if(key.startsWith('@') && key.endsWith('@')){
    //   keyToMatch = 'depFieldID';
    // }

    this.dependencyMap.set(depFldId, value);
    for (let fieldId in this.fieldDependencies) {
      for (let dep of this.fieldDependencies[fieldId].inDep) {
        if (dep.depFieldID == depFldId && this[fieldId]) {
          this[fieldId].setDependency(dep.paramKey, value);
        }
      }
    }
  }

  setDependencies() { //changed 
    for (let fieldId in this.fieldDependencies) {
      for (let dep of this.fieldDependencies[fieldId].inDep) {
        this[fieldId].initDependency(dep.paramKey, dep.paramType);
        if (dep.depFieldID.startsWith('@') && dep.depFieldID.endsWith('@')) {
          this[fieldId].setDependency(dep.paramKey, this.getDependency(dep.depFieldID));
        } else {
          this[fieldId].setDependency(dep.paramKey, this.value[dep.depFieldID]); //Taking field value like this this.value[''], will not give values from custom components
        }
      }
    }
  }


  public clearBasicFieldsError() {
    this.basicFieldsOperation(field => {
      field.clearError();
    });
  }

  setHidden(value: boolean) {
    this.hidden = value;
  }

  isHidden() {
    return this.hidden;
  }

  resetBasicFields() {
    this.basicFieldsOperation(field => {
      field.onReset();
    });
  }

  protected unsubscribe$ = new Subject<void>();
  subsBFldsValueUpdates() {
    this.basicFieldsOperation(field => {
      field.valueChangeUpdates()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
        (value) => {
          this.value[field.fieldID] = value;
          this.setDependency(field.fieldID, value);
        }
        );
    });
  }

  basicFieldsOperation(fn: (field: FieldComponent) => void) {
    this.comboFields.forEach(fn);
    this.textboxFields.forEach(fn);
    this.textareaFields.forEach(fn);
    this.dateFields.forEach(fn);
    this.fileUploadFields.forEach(fn);
    this.amountComponent.forEach(fn);
    this.checkboxComponent.forEach(fn);
    this.labelComponent.forEach(fn);
    this.hiddenComponent.forEach(fn);
    this.radioFields.forEach(fn);
  }

  setBasicFieldsReadOnly(readOnly) {
    this.readOnly = readOnly;
    this.basicFieldsOperation((field) => {
      field.setReadOnly(readOnly);
    });
  }

  protected setBasicFieldsValue(inputValue, inputDesc = undefined) {
    inputDesc = (inputDesc == undefined) ? {} : inputDesc;
    if (inputValue) {
      this.basicFieldsOperation((field) => {
        if (inputValue[field.fieldID]) {
          field.setValue(inputValue[field.fieldID], inputDesc[field.fieldID + '_desc']);
        }
      });
    }
  }

  getDraftData(draftNo) {
    this.draftNo = draftNo;
    //call the draft service
    //call setValuesMethod
  }

  route(map, path) {
    this.services.dataStore.setData(this.services.routing.currModal, map);
    this.services.routing.navigateToComponent(path);
  }


  openModal(map) {
    const modalRef = this.services.modal.open(PopupModalComponent, { size: 'lg' });
    modalRef.componentInstance.rotueToComponent(map);
  }

  showMessage(map) {
    const modalRef = this.services.modal.open(PopupModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.openmsg(map);
  }

  async submit(path, apiCode, serviceCode) {
    this.nextPage = path;
    this.submitGatewayCode = apiCode;
    this.submitServiceCode = serviceCode;
    var elements = document.getElementsByClassName('btn');
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'true');
    }
    if (this.tfaReq == '1') {
      let msg = (window as any).signValues(this.services.http.tfaapplet, JSON.stringify(this.submitData['formData']));
      if (msg == "success" || msg == "SUCCESS") {
        this.tfaEncodedValue = document.getElementById('tfaEncodedValue').getAttribute('value');
        this.submitAfterTFA();
      } else {
        let response = {};
        response['Status'] = 'F';
        let resMsg = {};
        resMsg['ERROR_CODE'] = '999';
        resMsg['ERROR_DESC'] = msg;
        response['_RESPONSE_MESSAGE'] = JSON.stringify(resMsg);
        let map = new Map();
        map.set('formTitle', this.submitData['formName']);
        map.set('formCode', this.formCode);
        map.set('responseMsg', response);
        this.services.dataStore.setData(this.services.routing.currModal, map);
        this.services.routing.navigateToComponent('result');
      }
    } else {
      this.submitAfterTFA();
    }
    var elements = document.getElementsByClassName('btn');
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  }

  async submitAfterTFA() {
    this.services.http.showSpinner();
    let formData = {};
    formData['MESSAGE'] = JSON.stringify(this.submitData['formData']);
    if (this.tfaEncodedValue) {
      formData['TFA_VALUE'] = this.tfaEncodedValue;
    }
    if (this.repairReq == '1') {
      formData['RepairMode'] = 'R';
      formData['SRV_REF_NUM'] = this.srvRefNumG;
      formData['ITER_SL'] = this.iterSl;
      formData['REPAIR_REQ'] = '1';
    } else {
      formData['REPAIR_REQ'] = '0';
    }
    let res = await this.services.http.onSubmit(this.formCode, this.submitGatewayCode, this.submitServiceCode, formData, this.csrfValue);
    let map = new Map();
    map.set('formTitle', this.submitData['formName']);
    map.set('formCode', this.formCode);
    map.set('responseMsg', res);
    this.services.dataStore.setData(this.services.routing.currModal, map);
    this.services.routing.navigateToComponent(this.nextPage);
    this.services.http.hideSpinner();
  }

  async resetForm() { }

  //protected abstract submitForm(path, apiCode, serviceCode);

  beforeRevalidate() {
    var elements = document.getElementsByClassName('btn');
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'true');
    }

    var elements = document.getElementsByClassName('logo-list');
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'true');
    }

    // this.services.http.showSpinner();
    this.revalidation = true;
  }

  loadQueryData(readOnly) { }

  afterRevalidate() {
    this.revalidation = false;

    var elements = document.getElementsByClassName('btn');
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }

    var elements = document.getElementsByClassName('logo-list');
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }

    // this.services.http.hideSpinner();
  }

  serialize() {
    this["getFieldInfo"]();
    this["getFieldValue"]();
    // return {value: this[this.formCode+"ModelObject"], additionalInfo: this.additionalInfo};
    return { value: this.value, additionalInfo: this.additionalInfo };
  }

  async saveFormAsDraft() {
    this.serialize();
    let map = new Map();
    let draftData = {};
    let formData = this.submitData['formData'];
    Object.keys(formData).forEach((iKey) => {
      let key = '';
      if (iKey == 'footerDetails') {
        key = 'xmlDetails_footer';
      } else {
        key = iKey;
      }
      if (formData[key] instanceof Array) {
        let array = formData[key];
        let addnArray = this.additionalInfo[key + '_desc'];
        let newArray = [];
        if (array.length > 0) {
          if (array[0] instanceof {}.constructor) {
            for (var i = 0; i < array.length; i++) {
              let json = array[i];
              let newJson = {};
              let addnJson = {};
              if (addnArray && addnArray[i]) {
                addnJson = addnArray[i];
              }
              Object.keys(json).forEach(key => {
                if (addnJson[key]) {
                  newJson[key + '_desc'] = addnJson[key];
                }
                newJson[key] = json[key];
              });
              newArray.push(newJson);
            }
            draftData[key] = newArray;
          } else {
            draftData[key] = formData[key];
            draftData[key + '_desc'] = this.additionalInfo[key + '_desc'];
          }
        }
      } else {
        if (this.additionalInfo[key + '_desc']) {
          draftData[key + '_desc'] = this.additionalInfo[key + '_desc'];
        }
        draftData[key] = formData[key];
      }
    });
    map.set("component", "DRAFT");
    map.set("formCode", this.formCode);
    map.set("formData", JSON.stringify(draftData));
    map.set("RefNo", this.draftNo);
    map.set("remarks", this.draftRemarks);
    const modalRef = this.services.modal.open(PopupModalComponent, { size: 'sm', windowClass: 'services.modal-xl' });
    modalRef.componentInstance.rotueToComponent(map);
    modalRef.result.then(
      () => {
        this.draftNo = this.services.dataStore.draftNo;
        this.draftRemarks = this.services.dataStore.draftRemarks;
      }
    );
  }

  loadDraftValues(RefNo) {
    this.services.http.showSpinner();
    this.resetBasicFields();
    this.draftNo = RefNo.split('|')[0];
    this.draftRemarks = RefNo.split('|')[1];
    this.services.http.loadDarft(this.formCode, 'SSGW', 'DRAFT', this.draftNo).subscribe(response => {
      // this.services.http.checkForSession(response)
      let map: Map<string, string> = JSON.parse(JSON.stringify(response));
      this.setValue(JSON.parse(map['FORM_DATA']));
      this.setDependencies();
      this.services.http.hideSpinner();
    });
  }

  setValue(res) { }

  async revalidate(): Promise<number> {
    return 0;
  }

  onReset() { }
  resetSwitch(id) {
    switch (this.getIdType(id)) {
      case "FORM":
        this.onReset();
        break;
      case "BASIC_COMPONENT":
        this[id].onReset();
        break;
      case "CUSTOM_COMPONENT":
        var idSplit = id.split(".");
        if (idSplit.length > 1) {
          this[idSplit[0]].resetSwitch(id.substring(id.indexOf(".") + 1));
        } else {
          this[id].onReset();
        }
        break;
      default:
        console.error("resetSwitch(): Id '" + id + "' Not found.");
    }
  }

  setReadOnly(readOnly) { }
  setReadOnlySwitch(id, readOnly) {
    switch (this.getIdType(id)) {
      case "FORM":
        this.setReadOnly(readOnly);
        break;
      case "BASIC_COMPONENT":
        this[id].setReadOnly(readOnly);
        break;
      case "CUSTOM_COMPONENT":
        var idSplit = id.split(".");
        if (idSplit.length > 1) {
          this[idSplit[0]].setReadOnlySwitch(id.substring(id.indexOf(".") + 1), readOnly);
        } else {
          this[id].setReadOnly(readOnly);
        }
        break;
      default:
        console.error("setReadOnlySwitch(): Id '" + id + "' Not found.");
    }
  }

  setError(error) { }
  setErrorSwitch(id, error) {
    switch (this.getIdType(id)) {
      case "FORM":
        this.setError(error);
        break;
      case "BASIC_COMPONENT":
        this[id].setError(error);
        break;
      case "CUSTOM_COMPONENT":
        var idSplit = id.split(".");
        if (idSplit.length > 1) {
          this[idSplit[0]].setErrorSwitch(id.substring(id.indexOf(".") + 1), error);
        } else {
          this[id].setError(error);
        }
        break;
      default:
        console.error("setErrorSwitch(): Id '" + id + "' Not found.");
    }
  }

  async revalidateSwitch(id: string) {
    var totalErrors = 0;
    switch (this.getIdType(id)) {
      case "FORM":
        await this.revalidate().then((errors) => { totalErrors += errors; });
        break;
      case "BASIC_COMPONENT":
        await this.revalidateBasicField(id).then((errors) => { totalErrors += errors; });
        break;
      case "CUSTOM_COMPONENT":
        var idSplit = id.split(".");
        if (idSplit.length > 1) {
          await this[idSplit[0]].revalidateSwitch(id.substring(id.indexOf(".") + 1)).then((errors) => { totalErrors += errors; });
        } else {
          await this[id].revalidate().then((errors) => { totalErrors += errors; });
        }
        break;
      case "TAB":
        await this[id + "_revalidate"]().then((errors) => { totalErrors += errors; });
        break;
      default:
        console.error("revalidateSwitch(): Id '" + id + "' Not found.");
    }
    return totalErrors;
  }

  componentCode: string = '';
  getIdType(id: string) {
    if (id == this.componentCode) {
      return "FORM";
    }
    var func = this[id + "_revalidate"];//Tab 
    if (func && {}.toString.call(func) === '[object Function]') {
      return "TAB";
    }

    if (this[id] && this[id].componentCode == undefined) {//Basic Component
      return "BASIC_COMPONENT";
    }

    if (this[id] && this[id].componentCode) {//Custom Component 
      return "CUSTOM_COMPONENT";
    }

    var idSplit = id.split(".");
    if (idSplit.length > 0 && this[idSplit[0]] && this[idSplit[0]].componentCode) {//Custom Component 
      return "CUSTOM_COMPONENT";
    }

  }

  /*
    make a method:
    private _revalidateBasicField(field: FieldComponent, isOnBlur): Promise<number>{

    }
    
    redirect fields to this methods from revalidateBasicField, based on field id

    field id can be of three types
    accNum - not in for loop
    accNum& - Inside for loop and revalidate all fields with id "accNum"
    accNum&2 - Inside for loop and revalidate the field with id "accNum" and index 2
  */

  async revalidateBasicField(fieldId: string, isOnBlur: boolean = false): Promise<number> {
    var totalErrors = 0;
    this[fieldId].clearError();
    var formModelObject = this.value;


    var value = this[fieldId].componentName == 'RLOUIRadioComponent' ?
      this[fieldId].getFieldValue() : formModelObject[fieldId];

    if (value != undefined && value.toString() != "") {
      await this[fieldId].validateValue(value).then((errors) => { totalErrors += errors });
      if (totalErrors > 0) { return totalErrors }
    }

    if (this[fieldId].isMandatory() && (value == undefined || value.toString() == '' || value == 0 || value == 0.00)) {
      this[fieldId].setError("Value cannot be empty");
      return ++totalErrors;
    }

    if (value && this[fieldId].domainObjectCode && this[fieldId].doValidate) {
      await (await this[fieldId].domainObjectValidation()).toPromise().then(
        (res) => {
          if (isOnBlur && this.fieldDependencies[fieldId]) {
            for (let dep of this.fieldDependencies[fieldId].outDep) {

              var depValue = this.services.http.getContextPathValue(dep.paramKey, res);

              var temp = dep.depFieldID.split(".");
              var lastFieldId = temp[temp.length - 1];
              var targetField = this;
              for (var i = 0; i < temp.length - 1; i++) {
                targetField = targetField[temp[i]];
              }
              if (lastFieldId.startsWith('@') && lastFieldId.endsWith('@')) {
                targetField.setDependency(lastFieldId, depValue);
              } else {
                targetField[lastFieldId].setValue(depValue);
                if (temp.length == 1) {
                  this.setDependency(dep.depFieldID, depValue);
                }
              }
            }
          }
        },
        (httpError) => {
          var err = httpError['error'];
          if (err != null) {
            this[fieldId].setError(err['ErrorDescription']);
          } else {
            this[fieldId].setError("Error while field validation");
          }
          return ++totalErrors;
        }
      );
    }

    if (this[fieldId + "_blur"]) {
      var noOfErrors = this[fieldId + "_blur"]({ fieldId: fieldId, value: value, isOnBlur: isOnBlur });
      totalErrors += (noOfErrors != undefined && typeof noOfErrors == 'number' ? noOfErrors : 0);
    }

    return totalErrors;
  }

  genericOnBlur(fieldId, value) {
    this.value[fieldId] = value;
    this.setDependency(fieldId, value);
    this.revalidateBasicField(fieldId, true);
  }



  // public hTabGroups: {
  //   [key: string]: {
  //     activeTab: string,
  // errorCount: {
  //   [key: string]: number
  // }
  //   }
  // } = {};

  public hTabGroups = {};
  //New Structure
  //hTabGroups = {
  //   tabGroupId: {
  //     activeTabId: "",
  //     tabType: 1,
  //     tabs:{
  //     tabId1:{
  //       errorCount: 0,
  //       isActive: false,
  //       isDisabled: false,
  //       isHidden: false
  //     },
  //     tabId2:{
  //       errorCount: 0,
  //       isActive: false,
  //       isDisabled: false,
  //       isHidden: false
  //     }
  //     }
  //   }
  // }

  public initHTabGroup(tabGroupId: string, innerTabIds: string[], activeTabId: string, tabType: number) {
    this.hTabGroups[tabGroupId] = {};
    this.hTabGroups[tabGroupId].activeTabId = undefined;
    this.hTabGroups[tabGroupId].tabType = tabType;
    this.hTabGroups[tabGroupId].tabs = {};
    for (var i = 0; i < innerTabIds.length; i++) {
      this.hTabGroups[tabGroupId].tabs[innerTabIds[i]] = {
        errorCount: 0,
        isActive: false,
        isDisabled: false,
        isHidden: false
      };
    }
  }

  public isHTabActive(tabGroupId, tabId) {
    return this.hTabGroups[tabGroupId].tabs[tabId].isActive;
  }

  public isHTabDisabled(tabGroupId, tabId) {
    return this.hTabGroups[tabGroupId].tabs[tabId].isDisabled;
  }

  public setHTabDisabled(tabGroupId, tabId, disable: boolean) {
    this.hTabGroups[tabGroupId].tabs[tabId].isDisabled = disable;
  }

  public isHTabHidden(tabGroupId, tabId) {
    return this.hTabGroups[tabGroupId].tabs[tabId].isHidden;
  }

  public setHTabHidden(tabGroupId, tabId, hidden: boolean) {
    this.hTabGroups[tabGroupId].tabs[tabId].isHidden = hidden;
  }


  // async onHTabOpen(event) { };//only for accordians
  // async onHTabChange(event) { };

  public openHTab(tabGroupId, tabId, isOnClick: boolean = false) {

    !isOnClick ? this.scrollToHTab(tabGroupId, tabId) : undefined;

    var prevActiveTab = this.hTabGroups[tabGroupId].activeTabId;
    if (this.isHTabDisabled(tabGroupId, tabId) || (this.hTabGroups[tabGroupId].tabType != 2 && prevActiveTab == tabId)) { return }

    this.hTabGroups[tabGroupId].tabs[tabId].errorCount = 0;
    this.hTabGroups[tabGroupId].tabs[tabId].isActive = true;

    if (this.hTabGroups[tabGroupId].tabType != 2) {
      prevActiveTab != undefined ? (this.hTabGroups[tabGroupId].tabs[prevActiveTab].isActive = false) : undefined;
      this.hTabGroups[tabGroupId].activeTabId = tabId;
      // this.onHTabChange({tabGroupId: tabGroupId, currActiveTab: tabId, prevActiveTab: prevActiveTab});
      if (this[prevActiveTab + "_close"]) {
        this[prevActiveTab + "_close"]({ tabGroupId: tabGroupId, tabId: prevActiveTab });
      }
      if (this[tabGroupId + "_change"]) {
        this[tabGroupId + "_change"]({ tabGroupId: tabGroupId, currActiveTab: tabId, prevActiveTab: prevActiveTab });
      }
    }

    if (this[tabId + "_open"]) {
      this[tabId + "_open"]({ tabGroupId: tabGroupId, tabId: tabId });
    }

  }

  // async onHTabClose(event) { };//only for accordians
  public closeHTab(tabGroupId, tabId) {
    if (this.isHTabDisabled(tabGroupId, tabId)) { return; }
    this.hTabGroups[tabGroupId].tabs[tabId].isActive = false;
    if (this.hTabGroups[tabGroupId].tabType != 2 && this.hTabGroups[tabGroupId].activeTabId == tabId) {
      this.hTabGroups[tabGroupId].activeTabId = undefined;
    }

    // if(this.hTabGroups[tabGroupId].tabType == 2){
    //   this.onHTabClose({tabGroupId: tabGroupId, tabId: tabId});
    // }

    if (this[tabId + "_close"]) {
      this[tabId + "_close"]({ tabGroupId: tabGroupId, tabId: tabId });
    }
  }

  public toggleHTab(tabGroupId, tabId) {
    this.hTabGroups[tabGroupId].tabs[tabId].isActive ? this.closeHTab(tabGroupId, tabId) : this.openHTab(tabGroupId, tabId);
  }

  public hTabHasError(tabGroupId, tabId): boolean {
    return this.hTabGroups[tabGroupId].tabs[tabId].errorCount > 0;
  }

  public getHTabErrorCount(tabGroupId, tabId): number {
    return this.hTabGroups[tabGroupId].tabs[tabId].errorCount;
  }

  // public showHTab(tabGroupId, tabId) {
  //   this.hTabGroups[tabGroupId].activeTab = tabId;
  //   this.hTabGroups[tabGroupId].errorCount[tabId] = 0;
  // }

  public clearHTabErrors() {
    for (let tabGroupId in this.hTabGroups) {
      for (let tabId in this.hTabGroups[tabGroupId].tabs) {
        this.hTabGroups[tabGroupId].tabs[tabId].errorCount = 0;
      }
    }
  }

  scrollTabs(tabGroupId, direction: '+' | '-') {
    $('#' + this.componentCode + '_' + tabGroupId).animate({ scrollLeft: direction + "=200" }, 500,
      () => {
        let tabGroupElem: any = document.getElementById(this.componentCode + '_' + tabGroupId);
        tabGroupElem.getElementsByClassName('prev-arrow')['0'].style.display
          = (tabGroupElem.scrollLeft <= 0) ? 'none' : 'block';

        tabGroupElem.getElementsByClassName('next-arrow')['0'].style.display
          = (tabGroupElem.scrollWidth - (tabGroupElem.scrollLeft + tabGroupElem.offsetWidth) <= 0) ?
            'none' : 'block';
      });
  }

  checkForHTabOverFlow() {
    Object.keys(this.hTabGroups).forEach((tabGroupId) => {
      var tabGroupElem = document.getElementById(this.componentCode + '_' + tabGroupId);
      if (tabGroupElem) {
        addResizeListener(tabGroupElem, () => {
          if (tabGroupElem.scrollWidth > tabGroupElem.offsetWidth) {
            tabGroupElem.getElementsByClassName('next-arrow')['0'].style.display = 'block';
          }
        });
      }
    });
  }

  scrollToHTab(tabGroupId, TabId) {
    var tabGroupElem = document.getElementById(this.componentCode + '_' + tabGroupId);
    if (tabGroupElem) {
      let tabGroupWidth = tabGroupElem.offsetWidth;
      let childLeftPos = Math.trunc($("#" + this.componentCode + '_' + TabId).position().left);
      let childWidth = document.getElementById(this.componentCode + '_' + TabId).offsetWidth;
      if (!(childLeftPos >= 0 && (childLeftPos + childWidth) <= tabGroupWidth)) {
        $('#' + this.componentCode + '_' + tabGroupId).animate({
          scrollLeft: $("#" + this.componentCode + '_' + TabId).position().left - (tabGroupWidth / 2 - childWidth / 2)
        }, 'fast', () => {

          tabGroupElem.getElementsByClassName('prev-arrow')['0'].style.display
            = (tabGroupElem.scrollLeft <= 0) ? 'none' : 'block';

          tabGroupElem.getElementsByClassName('next-arrow')['0'].style.display
            = (tabGroupElem.scrollWidth - (tabGroupElem.scrollLeft + tabGroupElem.offsetWidth) <= 0) ?
              'none' : 'block';
        });
      }
    }
  }



  public vTabGroup = {};

  isVTabValidatedAndClear(...tabIds: string[]): boolean {
    var targetTab = this.vTabGroup[tabIds[0]].tabs;
    for (var i = 1; i < tabIds.length; i++) {
      targetTab = targetTab.descendents[tabIds[i]];
    }
    return (targetTab.isValidated && targetTab.errorCount == 0);
  }

  vTabHasError(...tabIds: string[]): boolean {
    var targetTab = this.vTabGroup[tabIds[0]].tabs;
    for (var i = 1; i < tabIds.length; i++) {
      targetTab = targetTab.descendents[tabIds[i]];
    }
    return targetTab.errorCount > 0;
  }

  getVTabClasses(...tabIds: string[]) { //Will require lot of calculations if errorCount is not saved for parent tabs
    var targetTab: TabNode = this.vTabGroup[tabIds[0]].tabs;
    for (var i = 1; i < tabIds.length; i++) {
      targetTab = targetTab.descendents[tabIds[i]];
    }
    return targetTab.tabClasses;
  }

  isVTabActive(tabGroupId: string, tabId: string): boolean { //At a time only one leaf tab can be active 
    //so saving isActive for every tab is not required
    return (this.vTabGroup[tabGroupId].activeTabIds.indexOf(tabId) > -1);
  }

  setVTabStatus(vTabGroupId) {
    var rootTab: TabNode = this.vTabGroup[vTabGroupId].tabs;
    rootTab.errorCount = this.getVTabErrorCount(rootTab);
    rootTab.tabClasses["has-errors"] = (rootTab.errorCount > 0);
  }

  getVTabErrorCount(tabNode: TabNode): number {
    tabNode.isValidated = true;
    if (Object.keys(tabNode.descendents).length == 0) {
      tabNode.tabClasses["has-errors"] = (tabNode.errorCount > 0);
      tabNode.tabClasses.saved = (tabNode.errorCount == 0);
      return tabNode.errorCount;
    }

    var totalErrors = 0;
    for (var tabId in tabNode.descendents) {
      totalErrors += this.getVTabErrorCount(tabNode.descendents[tabId]);
    }
    tabNode.errorCount = totalErrors;
    tabNode.tabClasses["has-errors"] = (tabNode.errorCount > 0);
    tabNode.tabClasses.saved = (tabNode.errorCount == 0);
    return totalErrors;
  }

  setVTabErrorCount(errorCount: number, ...tabIds: string[]) {
    var targetTab = this.vTabGroup[tabIds[0]].tabs;
    for (var i = 1; i < tabIds.length; i++) {
      targetTab = targetTab.descendents[tabIds[i]];
    }
    targetTab.errorCount = errorCount;
    targetTab.tabClasses["has-errors"] = (targetTab.errorCount > 0);
    targetTab.tabClasses.saved = (targetTab.errorCount == 0);
    targetTab.isValidated = true;
  }

  // updateSaveAndErrorList(errors, tabId) {
  //   if (errors > 0 && !(this.tabsWithError.indexOf(tabId)>-1)) {
  //     if (this.clearedTabs.indexOf(tabId)>-1) {
  //       this.clearedTabs.splice(this.clearedTabs.indexOf(tabId), 1);
  //     }
  //     this.tabsWithError.push(tabId);
  //   } else if (errors <= 0 && !(this.clearedTabs.indexOf(tabId)>-1)) {
  //     if (this.tabsWithError.indexOf(tabId)>-1) {
  //       this.tabsWithError.splice(this.tabsWithError.indexOf(tabId), 1);
  //     }
  //     this.clearedTabs.push(tabId);
  //   }
  //   setTimeout(() => {
  //     this.setTabStatus();
  //   }, 20);
  // }
  // async onVTabChange(event) { };
  openVTab(...tabIds: string[]) {

    var targetTab: TabNode = this.vTabGroup[tabIds[0]].tabs;

    for (var i = 1; i < tabIds.length; i++) {
      targetTab = targetTab.descendents[tabIds[i]];
    }

    var isTabDisabled = (targetTab.isDisabled || targetTab.isHidden);

    var childActiveTabs: string[] = [];
    if (!isTabDisabled && Object.keys(targetTab.descendents).length > 0) {
      childActiveTabs = this.getFirstNonDisableChildVTab(targetTab);
      isTabDisabled = (childActiveTabs[childActiveTabs.length - 1] == 'AllDisabled');
    }

    if (!isTabDisabled) {
      var activeTab = tabIds.slice(1).concat(childActiveTabs);

      var prevActiveTab = this.vTabGroup[tabIds[0]].activeTabIds;

      if (JSON.stringify(prevActiveTab) != JSON.stringify(activeTab)) {

        this.setTabsInactive(tabIds[0], ...this.vTabGroup[tabIds[0]].activeTabIds);

        targetTab = this.vTabGroup[tabIds[0]].tabs;
        targetTab.errorCount = 0;
        targetTab.tabClasses["has-errors"] = false;
        targetTab.isValidated = false;
        targetTab.tabClasses.saved = false;

        for (var i = 0; i < activeTab.length; i++) {
          targetTab = targetTab.descendents[activeTab[i]];
          targetTab.errorCount = 0;
          targetTab.tabClasses["has-errors"] = false;
          targetTab.isValidated = false;
          targetTab.tabClasses.saved = false;
          targetTab.tabClasses.active = false;
          targetTab.tabClasses["unfold-tab highlight-a"] = true;
        }
        targetTab.tabClasses.active = true;
        targetTab.tabClasses["unfold-tab highlight-a"] = false;
        this.vTabGroup[tabIds[0]].activeTabIds = activeTab;

        if (prevActiveTab.length > 0 && this[prevActiveTab[prevActiveTab.length - 1] + "_close"]) {
          this[prevActiveTab[prevActiveTab.length - 1] + "_close"]({
            tabGroupId: tabIds[0],
            tabId: prevActiveTab[prevActiveTab.length - 1],
            tabPath: prevActiveTab
          });
        }

        if (this[tabIds[0] + "_change"]) {
          this[tabIds[0] + "_change"]({
            tabGroupId: tabIds[0],
            currActiveTab: activeTab.length > 0 ? activeTab[activeTab.length - 1] : undefined,
            prevActiveTab: prevActiveTab.length > 0 ? prevActiveTab[prevActiveTab.length - 1] : undefined,
            currActiveTabPath: activeTab,
            prevActiveTabPath: prevActiveTab
          });
        }

        if ((tabIds.length - 1) < activeTab.length) {
          if (tabIds.length > 1 && this[tabIds[tabIds.length - 1] + "_open"]) {
            this[tabIds[tabIds.length - 1] + "_open"]({
              tabGroupId: tabIds[0],
              tabId: tabIds[tabIds.length - 1],
              tabPath: tabIds.splice(1)
            });
          }
        }

        if (activeTab.length > 0 && this[activeTab[activeTab.length - 1] + "_open"]) {
          this[activeTab[activeTab.length - 1] + "_open"]({
            tabGroupId: tabIds[0],
            tabId: activeTab[activeTab.length - 1],
            tabPath: activeTab
          });
        }

        // this.onVTabChange({tabGroupId: tabIds[0], currActiveTab: activeTab, prevActiveTab: prevActiveTab, clickedTab: tabIds});
      }
    }
  }

  setTabsInactive(tabGroupId, ...tabIds: string[]) {
    var targetTab: TabNode = this.vTabGroup[tabGroupId].tabs;
    for (var i = 0; i < tabIds.length; i++) {
      targetTab = targetTab.descendents[tabIds[i]];
      targetTab.tabClasses.active = false;
      targetTab.tabClasses["unfold-tab highlight-a"] = false;
    }
  }


  private getFirstNonDisableChildVTab(tabNode: TabNode): string[] {
    var firstTabIdArray: string[] = [];

    var targetTab: TabNode;
    var orderSl = 1000;
    for (let tabId in tabNode.descendents) {
      targetTab = tabNode.descendents[tabId];
      if (targetTab.orderSl < orderSl && !targetTab.isDisabled && !targetTab.isHidden) {
        firstTabIdArray.push(targetTab.tabId);
        // if(Object.keys(targetTab.descendents).length>0){ //Uncomment when 3 or more depth is supported
        //   firstTabIdArray = firstTabIdArray.concat(this.getFirstNonDisableChildVTab(targetTab));          
        // }
        orderSl = targetTab.orderSl;
      }
    }
    return (firstTabIdArray.length == 0) ? ["AllDisabled"] : firstTabIdArray;
  }

  public isVTabDisabled(...tabIds: string[]) {
    var targetTab: TabNode = this.vTabGroup[tabIds[0]].tabs;
    for (var i = 1; i < tabIds.length; i++) {
      targetTab = targetTab.descendents[tabIds[i]];
    }
    return (targetTab.isDisabled || targetTab.isHidden);
  }

  public setVTabDisabled(disable: boolean, ...tabIds: string[]) {
    var targetTab: TabNode = this.vTabGroup[tabIds[0]].tabs;
    for (var i = 1; i < tabIds.length; i++) {
      targetTab = targetTab.descendents[tabIds[i]];
    }
    targetTab.isDisabled = disable;
    targetTab.tabClasses.disabled = (targetTab.isDisabled || targetTab.isHidden);
  }

  public isVTabHidden(...tabIds: string[]) {
    var targetTab: TabNode = this.vTabGroup[tabIds[0]].tabs;
    for (var i = 1; i < tabIds.length; i++) {
      targetTab = targetTab.descendents[tabIds[i]];
    }
    return targetTab.isHidden;
  }

  public setVTabHidden(hidden: boolean, ...tabIds: string[]) {
    var targetTab: TabNode = this.vTabGroup[tabIds[0]].tabs;
    for (var i = 1; i < tabIds.length; i++) {
      targetTab = targetTab.descendents[tabIds[i]];
    }
    targetTab.isHidden = hidden;
    targetTab.tabClasses.disabled = (targetTab.isDisabled || targetTab.isHidden);
  }

  public clearVTabErrors() {
    for (var tabGroupId in this.vTabGroup) {
      var rootTab = this.vTabGroup[tabGroupId].tabs;
      this.resetVTabNode(rootTab);
    }
  }

  private resetVTabNode(tabNode: TabNode) {
    tabNode.isValidated = false;
    tabNode.errorCount = 0;
    tabNode.tabClasses["has-errors"] = false;
    tabNode.tabClasses.saved = false;
    for (var descendentTab in tabNode.descendents) {
      this.resetVTabNode(tabNode.descendents[descendentTab]);
    }
  }

  public TabNode = TabNode;
}

class TabNode {
  tabId: string;
  descendents = {};
  isValidated: boolean = false;
  isDisabled: boolean = false;
  isHidden: boolean = false;
  errorCount: number = 0;
  orderSl: number = 0;
  tabClasses = {
    active: false,
    'has-errors': false,
    disabled: false,
    saved: false,
    'unfold-tab highlight-a': false
  }
  constructor(tabId) {
    this.tabId = tabId;
  }
  setDescendents(...descendents: TabNode[]) {
    for (var i = 0; i < descendents.length; i++) {
      descendents[i].orderSl = (i + 1);
      this.descendents[descendents[i].tabId] = descendents[i];
    }
  }
}
