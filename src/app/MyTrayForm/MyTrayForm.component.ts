import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { MyTrayFormModel } from './MyTrayForm.model';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { HiddenComponent } from '../hidden/hidden.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { DateComponent } from '../date/date.component';
import { ButtonComponent } from '../button/button.component';
import { AmountComponent } from '../amount/amount.component';
import { FormComponent } from '../form/form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';
import { LabelComponent } from '../label/label.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MyTrayGridComponent } from '../MyTrayGrid/MyTrayGrid.component';
import { Router } from "@angular/router";

const customCss: string = '';

@Component({
  selector: 'app-MyTrayForm',
  templateUrl: './MyTrayForm.component.html'
})
export class MyTrayFormComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('MT_SLIDER', { static: false }) MT_SLIDER: CheckBoxComponent;
  @ViewChild('MT_GRID', { static: false }) MT_GRID: MyTrayGridComponent;
  @ViewChild('MT_Proposal', { static: false }) MT_Proposal: ButtonComponent;
  menuList = [];
  async revalidate(): Promise<number> {
    var totalErrors = 0;
    super.beforeRevalidate();
    await Promise.all([
      this.revalidateBasicField('MT_SLIDER'),
    ]).then((errorCounts) => {
      errorCounts.forEach((errorCount) => {
        totalErrors += errorCount;
      });
    });
    this.errors = totalErrors;
    super.afterRevalidate();
    return totalErrors;
  }
  constructor(services: ServiceStock, private router: Router) {
    super(services);
    this.value = new MyTrayFormModel();
    this.componentCode = 'MyTrayForm';
    this.displayBorder = false;
    // this.menuList = [{ Menu: 'MODIFICATION', MenuList: [{ id: 'Initiation', text: 'Initiate' }]}]
  }
  setReadOnly(readOnly) {
    super.setBasicFieldsReadOnly(readOnly);
  }
  async onFormLoad() {
    this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
    this.MT_SLIDER.setValue(true);
    let inputMap = new Map();
    //this.MT_SLIDER.setValue('true');
    await this.MT_GRID.gridDataLoad({
      'sliderVal': this.MT_SLIDER.getFieldValue(),
    });

    // await this.MT_GRID.gridDataLoad({
    // });
    // this.setDependencies();
  }
  setInputs(param: any) {
    let params = this.services.http.mapToJson(param);
    if (params['mode']) {
      this.mode = params['mode'];
    }
  }
  async submitForm(path, apiCode, serviceCode) {
    this.submitData['formName'] = 'My Tray';
    await super.submit(path, apiCode, serviceCode);
  }
  getFieldInfo() {
    this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
    return this.additionalInfo;
  }
  getFieldValue() {
    return this.value;
  }
  setValue(inputValue, inputDesc = undefined) {
    this.setBasicFieldsValue(inputValue, inputDesc);
    this.value = new MyTrayFormModel();
    this.value.setValue(inputValue);
    this.setDependencies();
    this.passNewValue(this.value);
  }
  ngOnInit() {
    if (this.formCode == undefined) { this.formCode = 'MyTrayForm'; }
    if (this.formOnLoadError) { return; }
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'MyTrayForm_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('MyTrayForm_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
      this.onFormLoad();
      this.checkForHTabOverFlow();
    });
  }
  clearError() {
    super.clearBasicFieldsError();
    super.clearHTabErrors();
    super.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
  }
  onReset() {
    super.resetBasicFields();
    this.clearHTabErrors();
    this.clearVTabErrors();
    this.errors = 0;
    this.errorMessage = [];
    this.additionalInfo = undefined;
    this.dependencyMap.clear();
    this.value = new MyTrayFormModel();
    this.passNewValue(this.value);
    this.setReadOnly(false);
    this.onFormLoad();
  }
  async MT_SLIDER_change(event) {
    let inputMap = new Map();
    if (event) {
      await this.MT_GRID.gridDataLoad({
        'sliderVal': this.MT_SLIDER.getFieldValue()
      });
    }
  }
  fieldDependencies = {
  }
  MT_Proposal_click() {
    let inputMap = new Map();
    this.redirect();
  }
  navigateToHome() {
    this.router.navigate(['/home/LANDING']);
  }
  redirect() {
    var id = "Initiation";
    if (id && id != "") {
      this.router.navigate(['/home/' + id]);
    } else {
      this.navigateToHome();
    }
  }
  
  underWriter(){
    this.router.navigate(['/home/Underwriter']);
  }
}
