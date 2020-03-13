import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { InitiationModel } from './Initiation.model';
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
import { CustDtlsGridComponent } from '../CustDtlsGrid/CustDtlsGrid.component';

const customCss: string = '';

@Component({
selector: 'app-Initiation',
templateUrl: './Initiation.component.html'
})
export class InitiationComponent extends FormComponent implements OnInit, AfterViewInit {
@ViewChild('SRC_MOBILE_NO', {static: false}) SRC_MOBILE_NO: TextBoxComponent;
@ViewChild('SRC_TAX_ID', {static: false}) SRC_TAX_ID: TextBoxComponent;
@ViewChild('SRC_CIF_NO', {static: false}) SRC_CIF_NO: TextBoxComponent;
@ViewChild('SEARCH_CUST_BTN', {static: false}) SEARCH_CUST_BTN: ButtonComponent;
@ViewChild('BAD_PHYSICAL_FRM_NO', {static: false}) BAD_PHYSICAL_FRM_NO: TextBoxComponent;
@ViewChild('BAD_DATE_OF_RCPT', {static: false}) BAD_DATE_OF_RCPT: DateComponent;
@ViewChild('BAD_SRC_CHANNEL', {static: false}) BAD_SRC_CHANNEL: ComboBoxComponent;
@ViewChild('BAD_DSA_ID', {static: false}) BAD_DSA_ID: ComboBoxComponent;
@ViewChild('BAD_BRANCH', {static: false}) BAD_BRANCH: ComboBoxComponent;
@ViewChild('BAD_PROD_CAT', {static: false}) BAD_PROD_CAT: ComboBoxComponent;
@ViewChild('BAD_PRODUCT', {static: false}) BAD_PRODUCT: ComboBoxComponent;
@ViewChild('BAD_SUB_PROD', {static: false}) BAD_SUB_PROD: ComboBoxComponent;
@ViewChild('BAD_SCHEME', {static: false}) BAD_SCHEME: ComboBoxComponent;
@ViewChild('BAD_PROMOTION', {static: false}) BAD_PROMOTION: ComboBoxComponent;
@ViewChild('CD_CUST_TYPE', {static: false}) CD_CUST_TYPE: ComboBoxComponent;
@ViewChild('CD_EXISTING_CUST', {static: false}) CD_EXISTING_CUST: ComboBoxComponent;
@ViewChild('CD_CIF', {static: false}) CD_CIF: TextBoxComponent;
@ViewChild('CD_CUSTOMER_ID', {static: false}) CD_CUSTOMER_ID: TextBoxComponent;
@ViewChild('CD_TITLE', {static: false}) CD_TITLE: ComboBoxComponent;
@ViewChild('CD_FIRST_NAME', {static: false}) CD_FIRST_NAME: TextBoxComponent;
@ViewChild('CD_MIDDLE_NAME', {static: false}) CD_MIDDLE_NAME: TextBoxComponent;
@ViewChild('CD_THIRD_NAME', {static: false}) CD_THIRD_NAME: TextBoxComponent;
@ViewChild('CD_LAST_NAME', {static: false}) CD_LAST_NAME: TextBoxComponent;
@ViewChild('CD_FULL_NAME', {static: false}) CD_FULL_NAME: TextBoxComponent;
@ViewChild('CD_GENDER', {static: false}) CD_GENDER: ComboBoxComponent;
@ViewChild('CD_DOB', {static: false}) CD_DOB: DateComponent;
@ViewChild('CD_TAX_ID', {static: false}) CD_TAX_ID: TextBoxComponent;
@ViewChild('CD_MOBILE', {static: false}) CD_MOBILE: TextBoxComponent;
@ViewChild('CD_DEBIT_SCORE', {static: false}) CD_DEBIT_SCORE: TextBoxComponent;
@ViewChild('CD_CUST_SGMT', {static: false}) CD_CUST_SGMT: ComboBoxComponent;
@ViewChild('CD_STAFF', {static: false}) CD_STAFF: ComboBoxComponent;
@ViewChild('CD_STAFF_ID', {static: false}) CD_STAFF_ID: TextBoxComponent;
@ViewChild('CD_LOAN_OWNERSHIP', {static: false}) CD_LOAN_OWNERSHIP: AmountComponent;
@ViewChild('CD_ADD', {static: false}) CD_ADD: ButtonComponent;
@ViewChild('CD_RESET', {static: false}) CD_RESET: ButtonComponent;
@ViewChild('CUST_DTLS_GRID', {static: false}) CUST_DTLS_GRID: CustDtlsGridComponent;
@ViewChild('LD_LOAN_AMOUNT', {static: false}) LD_LOAN_AMOUNT: AmountComponent;
@ViewChild('LD_INTEREST_RATE', {static: false}) LD_INTEREST_RATE: TextBoxComponent;
@ViewChild('LD_TENURE', {static: false}) LD_TENURE: TextBoxComponent;
@ViewChild('LD_TENURE_PERIOD', {static: false}) LD_TENURE_PERIOD: ComboBoxComponent;
@ViewChild('LD_APP_PRPSE', {static: false}) LD_APP_PRPSE: ComboBoxComponent;
@ViewChild('LD_GROSS_INCOME', {static: false}) LD_GROSS_INCOME: AmountComponent;
@ViewChild('LD_EXST_LBLT_AMT', {static: false}) LD_EXST_LBLT_AMT: AmountComponent;
@ViewChild('LD_OTH_DEDUCTIONS', {static: false}) LD_OTH_DEDUCTIONS: TextBoxComponent;
@ViewChild('LD_NET_INCOME', {static: false}) LD_NET_INCOME: AmountComponent;
@ViewChild('LD_CHK_ELGBTY_BTN', {static: false}) LD_CHK_ELGBTY_BTN: ButtonComponent;
@ViewChild('LD_SYS_AMT_RCMD', {static: false}) LD_SYS_AMT_RCMD: AmountComponent;
@ViewChild('LD_USR_RCMD_AMT', {static: false}) LD_USR_RCMD_AMT: AmountComponent;
@ViewChild('LD_LTV_DBR', {static: false}) LD_LTV_DBR: TextBoxComponent;
@ViewChild('LD_EMI_AMT', {static: false}) LD_EMI_AMT: AmountComponent;
@ViewChild('RD_REFERRER_NAME', {static: false}) RD_REFERRER_NAME: TextBoxComponent;
@ViewChild('RD_REFERRER_NO', {static: false}) RD_REFERRER_NO: TextBoxComponent;
@ViewChild('SUBMIT_MAIN_BTN', {static: false}) SUBMIT_MAIN_BTN: ButtonComponent;
@ViewChild('CANCEL_MAIN_BTN', {static: false}) CANCEL_MAIN_BTN: ButtonComponent;
@ViewChild('hiddenProductId', {static: false}) hiddenProductId: HiddenComponent;
@ViewChild('hideCustomerType', {static: false}) hideCustomerType: HiddenComponent;
@ViewChild('hidAppId', {static: false}) hidAppId: HiddenComponent;
@ViewChild('hidSourceingChannel', {static: false}) hidSourceingChannel: HiddenComponent;
@ViewChild('IndexHideField', {static: false}) IndexHideField: HiddenComponent;
@ViewChild('hidYesNo', {static: false}) hidYesNo: HiddenComponent;
@ViewChild('hidDSAId', {static: false}) hidDSAId: HiddenComponent;
@ViewChild('hidAccBranch', {static: false}) hidAccBranch: HiddenComponent;
@ViewChild('hidProdCat', {static: false}) hidProdCat: HiddenComponent;
@ViewChild('hidTitle', {static: false}) hidTitle: HiddenComponent;
@ViewChild('hidGender', {static: false}) hidGender: HiddenComponent;
@ViewChild('hidCustSeg', {static: false}) hidCustSeg: HiddenComponent;
@ViewChild('hideExsCust', {static: false}) hideExsCust: HiddenComponent;
async revalidate(): Promise<number> {
var totalErrors = 0;
super.beforeRevalidate();
await Promise.all([
this.revalidateBasicField('SRC_MOBILE_NO'),
this.revalidateBasicField('SRC_TAX_ID'),
this.revalidateBasicField('SRC_CIF_NO'),
this.revalidateBasicField('BAD_PHYSICAL_FRM_NO'),
this.revalidateBasicField('BAD_DATE_OF_RCPT'),
this.revalidateBasicField('BAD_SRC_CHANNEL'),
this.revalidateBasicField('BAD_DSA_ID'),
this.revalidateBasicField('BAD_BRANCH'),
this.revalidateBasicField('BAD_PROD_CAT'),
this.revalidateBasicField('BAD_PRODUCT'),
this.revalidateBasicField('BAD_SUB_PROD'),
this.revalidateBasicField('BAD_SCHEME'),
this.revalidateBasicField('BAD_PROMOTION'),
this.revalidateBasicField('CD_CUST_TYPE'),
this.revalidateBasicField('CD_EXISTING_CUST'),
this.revalidateBasicField('CD_CIF'),
this.revalidateBasicField('CD_CUSTOMER_ID'),
this.revalidateBasicField('CD_TITLE'),
this.revalidateBasicField('CD_FIRST_NAME'),
this.revalidateBasicField('CD_MIDDLE_NAME'),
this.revalidateBasicField('CD_THIRD_NAME'),
this.revalidateBasicField('CD_LAST_NAME'),
this.revalidateBasicField('CD_FULL_NAME'),
this.revalidateBasicField('CD_GENDER'),
this.revalidateBasicField('CD_DOB'),
this.revalidateBasicField('CD_TAX_ID'),
this.revalidateBasicField('CD_MOBILE'),
this.revalidateBasicField('CD_DEBIT_SCORE'),
this.revalidateBasicField('CD_CUST_SGMT'),
this.revalidateBasicField('CD_STAFF'),
this.revalidateBasicField('CD_STAFF_ID'),
this.revalidateBasicField('CD_LOAN_OWNERSHIP'),
this.revalidateBasicField('LD_LOAN_AMOUNT'),
this.revalidateBasicField('LD_INTEREST_RATE'),
this.revalidateBasicField('LD_TENURE'),
this.revalidateBasicField('LD_TENURE_PERIOD'),
this.revalidateBasicField('LD_APP_PRPSE'),
this.revalidateBasicField('LD_GROSS_INCOME'),
this.revalidateBasicField('LD_EXST_LBLT_AMT'),
this.revalidateBasicField('LD_OTH_DEDUCTIONS'),
this.revalidateBasicField('LD_NET_INCOME'),
this.revalidateBasicField('LD_SYS_AMT_RCMD'),
this.revalidateBasicField('LD_USR_RCMD_AMT'),
this.revalidateBasicField('LD_LTV_DBR'),
this.revalidateBasicField('LD_EMI_AMT'),
this.revalidateBasicField('RD_REFERRER_NAME'),
this.revalidateBasicField('RD_REFERRER_NO'),
]).then((errorCounts) => {
errorCounts.forEach((errorCount)=>{
totalErrors+=errorCount;
});
});
this.errors = totalErrors;
super.afterRevalidate();
return totalErrors;
}
constructor(services: ServiceStock){
super(services);
this.value = new InitiationModel();
this.componentCode = 'Initiation';
}
setReadOnly(readOnly){
super.setBasicFieldsReadOnly(readOnly);
}
async onFormLoad(){
this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
//this.CD_CUST_TYPE.setValue(CIF);
this.CD_FULL_NAME.setReadOnly(true);
this.CD_LOAN_OWNERSHIP.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_LOAN_AMOUNT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_INTEREST_RATE.setReadOnly(true);
this.LD_GROSS_INCOME.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_EXST_LBLT_AMT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_NET_INCOME.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_NET_INCOME.setReadOnly(true);
this.LD_SYS_AMT_RCMD.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_SYS_AMT_RCMD.setReadOnly(true);
this.LD_USR_RCMD_AMT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_LTV_DBR.setReadOnly(true);
this.LD_EMI_AMT.setFormatOptions({currencyCode: 'INR', languageCode: 'en-US', });
this.LD_EMI_AMT.setReadOnly(true);
this.hiddenProductId.setValue('CreditCard');
this.hideCustomerType.setValue('CUSTOMER_TYPE');
this.hidAppId.setValue('RLO');
this.hidSourceingChannel.setValue('Branch');
this.IndexHideField.setValue(-1);
this.hidYesNo.setValue('Y/N');
this.hidDSAId.setValue('DSA_ID');
this.hidAccBranch.setValue('ACC_BRANCH');
this.hidProdCat.setValue('PRODUCT_CATEGORY');
this.hidTitle.setValue('TITLE');
this.hidGender.setValue('GENDER');
this.hidCustSeg.setValue('CUST_SEGMENT');
this.hideExsCust.setValue('Y/N');
this.setDependencies();
}
setInputs(param : any){
let params = this.services.http.mapToJson(param);
if(params['mode']){
this.mode = params['mode'];
}
}
async submitForm(path, apiCode, serviceCode){
this.submitData['formName'] = 'Initiation main form';
await super.submit(path, apiCode, serviceCode);
}
getFieldInfo() {
this.amountComponent.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.comboFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
this.fileUploadFields.forEach(field => {this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo();});
return this.additionalInfo;
}
getFieldValue(){
return this.value;
}
setValue(inputValue, inputDesc=undefined) {
this.setBasicFieldsValue(inputValue, inputDesc);
this.CUST_DTLS_GRID.setValue(inputValue['CUST_DTLS_GRID']);
this.value = new InitiationModel();
this.value.setValue(inputValue);
this.setDependencies();
this.passNewValue(this.value);
}
ngOnInit(){
if(this.formCode == undefined) {this.formCode = 'Initiation';}
if(this.formOnLoadError){return;}
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'Initiation_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('Initiation_customCss');
styleElement.parentNode.removeChild(styleElement);
}
ngAfterViewInit(){
setTimeout(() => {
this.subsBFldsValueUpdates();
this.onFormLoad();
this.checkForHTabOverFlow();
});
}
clearError(){
super.clearBasicFieldsError();
super.clearHTabErrors();
super.clearVTabErrors();
this.errors = 0;
this.errorMessage = [];
}
onReset(){
super.resetBasicFields();
this.clearHTabErrors();
this.clearVTabErrors();
this.errors = 0;
this.errorMessage = [];
this.additionalInfo = undefined;
this.dependencyMap.clear();
this.value = new InitiationModel();
this.passNewValue(this.value);
this.setReadOnly(false);
this.onFormLoad();
}
async SEARCH_CUST_BTN_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('MobileNo', this.SRC_MOBILE_NO.getFieldValue());
inputMap.set('TaxId', this.SRC_TAX_ID.getFieldValue());
inputMap.set('CifNo', this.SRC_CIF_NO.getFieldValue());
inputMap.set('component','SearchForm');
const modalRef = this.services.modal.open(PopupModalComponent, { windowClass: 'modal-width-lg' });
var onModalClose = async (reason)=>{
(reason==0 || reason==1)?await this.services.routing.removeOutlet():undefined;
if(this.services.dataStore.getData('selectedData')){
let tempVar:any = this.services.dataStore.getData('selectedData');
this.CD_DOB.setValue(tempVar['dob']);
this.CD_TAX_ID.setValue(tempVar['taxId']);
this.CD_FULL_NAME.setValue(tempVar['custName']);
this.CD_MOBILE.setValue(tempVar['mobileNum']);
}
this.services.dataStore.setData('selectedData', undefined);
}
modalRef.result.then(onModalClose, onModalClose);
modalRef.componentInstance.rotueToComponent(inputMap);
this.services.dataStore.setModalReference(this.services.routing.currModal, modalRef);
}
async CD_FIRST_NAME_blur(event){
let inputMap = new Map();
await this.OnBlurMethod({
});
}
async CD_MIDDLE_NAME_blur(event){
let inputMap = new Map();
await this.OnBlurMethod({
});
}
async CD_THIRD_NAME_blur(event){
let inputMap = new Map();
await this.OnBlurMethod({
});
}
async CD_LAST_NAME_blur(event){
let inputMap = new Map();
await this.OnBlurMethod({
});
}
async CD_ADD_click(event){
let inputMap = new Map();
if(this.IndexHideField.getFieldValue() == -1){
let CustArray:any = {};
CustArray['FullName'] = this.CD_FULL_NAME.getFieldValue();
CustArray['DOB'] = this.CD_DOB.getFieldValue();
CustArray['FirstName'] = this.CD_FIRST_NAME.getFieldValue();
CustArray['MiddleName'] = this.CD_MIDDLE_NAME.getFieldValue();
CustArray['LastName'] = this.CD_LAST_NAME.getFieldValue();
CustArray['Title'] = this.CD_TITLE.getFieldValue();
CustArray['Gender'] = this.CD_GENDER.getFieldValue();
CustArray['TaxId'] = this.CD_TAX_ID.getFieldValue();
CustArray['Mobile'] = this.CD_MOBILE.getFieldValue();
CustArray['DebitScore'] = this.CD_DEBIT_SCORE.getFieldValue();
CustArray['CustSgmt'] = this.CD_CUST_SGMT.getFieldValue();
CustArray['Staff'] = this.CD_STAFF.getFieldValue();
CustArray['StaffId'] = this.CD_STAFF_ID.getFieldValue();
CustArray['hideCustomerId'] = this.CD_CUST_TYPE.getFieldValue();
CustArray['Cif'] = this.CD_CIF.getFieldValue();
CustArray['CustomerId'] = this.CD_CUSTOMER_ID.getFieldValue();
CustArray['ExistingCust'] = this.CD_EXISTING_CUST.getFieldValue();
CustArray['LoanOwnership'] = this.CD_LOAN_OWNERSHIP.getFieldValue();
CustArray['CustType_Desc'] = this.CD_CUST_TYPE.getFieldInfo();
CustArray['RowIndex'] = this.CustomerDataArray.length;
this.CustomerDataArray.push(CustArray);this.CUST_DTLS_GRID.setValue(Object.assign([], this.CustomerDataArray));
}
else{
let j:any = this.IndexHideField.getFieldValue();
this.CustomerDataArray[j].FullName = this.CD_FULL_NAME.getFieldValue();
this.CustomerDataArray[j].Cif = this.CD_CIF.getFieldValue();
this.CustomerDataArray[j].Title = this.CD_TITLE.getFieldValue();
this.CustomerDataArray[j].FirstName = this.CD_FIRST_NAME.getFieldValue();
this.CustomerDataArray[j].MiddleName = this.CD_MIDDLE_NAME.getFieldValue();
this.CustomerDataArray[j].LastName = this.CD_LAST_NAME.getFieldValue();
this.CustomerDataArray[j].Gender = this.CD_GENDER.getFieldValue();
this.CustomerDataArray[j].DOB = this.CD_DOB.getFieldValue();
this.CustomerDataArray[j].Mobile = this.CD_MOBILE.getFieldValue();
this.CustomerDataArray[j].TaxId = this.CD_TAX_ID.getFieldValue();
this.CustomerDataArray[j].DebitScore = this.CD_DEBIT_SCORE.getFieldValue();
this.CustomerDataArray[j].CustSgmt = this.CD_CUST_SGMT.getFieldValue();
this.CustomerDataArray[j].Staff = this.CD_STAFF.getFieldValue();
this.CustomerDataArray[j].StaffId = this.CD_STAFF_ID.getFieldValue();
this.CustomerDataArray[j].CustType_desc = this.CD_CUST_TYPE.getFieldInfo();
this.CustomerDataArray[j].hideCustomerId = this.CD_CUST_TYPE.getFieldValue();
this.CUST_DTLS_GRID.setValue(Object.assign([], this.CustomerDataArray));
}
this.CD_CUST_TYPE.value = undefined;
this.CD_CUST_TYPE.additionalInfo = undefined;
this.CD_CIF.onReset();
this.CD_TITLE.onReset();
this.CD_FIRST_NAME.onReset();
this.CD_MIDDLE_NAME.onReset();
this.CD_LAST_NAME.onReset();
this.CD_FULL_NAME.onReset();
this.CD_GENDER.onReset();
this.CD_DOB.onReset();
this.CD_TAX_ID.onReset();
this.CD_MOBILE.onReset();
this.CD_DEBIT_SCORE.onReset();
this.CD_CUST_SGMT.onReset();
this.CD_STAFF.onReset();
this.CD_STAFF_ID.onReset();
this.IndexHideField.setValue(-1);
}
async CD_RESET_click(event){
let inputMap = new Map();
this.CD_CUST_TYPE.onReset();
this.CD_EXISTING_CUST.onReset();
this.CD_CIF.onReset();
this.CD_CUSTOMER_ID.onReset();
this.CD_TITLE.onReset();
this.CD_FIRST_NAME.onReset();
this.CD_MIDDLE_NAME.onReset();
this.CD_THIRD_NAME.onReset();
this.CD_LAST_NAME.onReset();
this.CD_FULL_NAME.onReset();
this.CD_GENDER.onReset();
this.CD_DOB.onReset();
this.CD_TAX_ID.onReset();
this.CD_MOBILE.onReset();
this.CD_DEBIT_SCORE.onReset();
this.CD_CUST_SGMT.onReset();
this.CD_STAFF.onReset();
this.CD_STAFF_ID.onReset();
this.CD_LOAN_OWNERSHIP.onReset();
this.IndexHideField.setValue(-1);
}
async CUST_DTLS_GRID_DeleteCustDetails(event){
let inputMap = new Map();
let i:any = event.DeleteIndex;
this.CustomerDataArray.splice(i, 1);
for(let k=i;k<this.CustomerDataArray;k++){
	this.CustomerDataArray[k].RowIndex--;
}this.CUST_DTLS_GRID.setValue(Object.assign([], this.CustomerDataArray));
}
async CUST_DTLS_GRID_ModifyCustDetails(event){
let inputMap = new Map();
let i:any = event.Index;
this.CD_FULL_NAME.setValue(this.CustomerDataArray[i].FullName);
this.CD_CUST_TYPE.setValue(this.CustomerDataArray[i].hideCustomerId);
this.CD_TITLE.setValue(this.CustomerDataArray[i].Title);
this.CD_FIRST_NAME.setValue(this.CustomerDataArray[i].FirstName);
this.CD_MIDDLE_NAME.setValue(this.CustomerDataArray[i].MiddleName);
this.CD_LAST_NAME.setValue(this.CustomerDataArray[i].LastName);
this.CD_GENDER.setValue(this.CustomerDataArray[i].Gender);
this.CD_DOB.setValue(this.CustomerDataArray[i].DOB);
this.CD_TAX_ID.setValue(this.CustomerDataArray[i].TaxId);
this.CD_MOBILE.setValue(this.CustomerDataArray[i].Mobile);
this.CD_DEBIT_SCORE.setValue(this.CustomerDataArray[i].DebitScore);
this.CD_CUST_SGMT.setValue(this.CustomerDataArray[i].CustSgmt);
this.CD_STAFF.setValue(this.CustomerDataArray[i].Staff);
this.CD_STAFF_ID.setValue(this.CustomerDataArray[i].StaffId);
this.CD_CIF.setValue(this.CustomerDataArray[i].Cif);
this.CD_CUSTOMER_ID.setValue(this.CustomerDataArray[i].CustomerId);
this.CD_LOAN_OWNERSHIP.setValue(this.CustomerDataArray[i].LoanOwnership);
this.CD_EXISTING_CUST.setValue(this.CustomerDataArray[i].ExsitingCust);
this.IndexHideField.setValue(i);
}
async LD_CHK_ELGBTY_BTN_click(event){
let inputMap = new Map();
var navPath = ('/home/QDE').split('/');
navPath = navPath.slice(1);
inputMap.clear();
inputMap.set('appId', '101');
this.services.dataStore.setRouteParams(this.services.routing.currModal, inputMap);
if (this.services.routing.currModal > 0) {
var routerOutlets = {};
routerOutlets[this.services.routing.currOutlet] = [navPath[navPath.length-1], 'popup'];
this.services.router.navigate([{ outlets: routerOutlets }], { skipLocationChange: true });
} else {
this.services.router.navigate(navPath);
}
}
async SUBMIT_MAIN_BTN_click(event){
let inputMap = new Map();
inputMap.clear();
inputMap.set('Body.ApplicationDetails.SourcingChannel', this.BAD_SRC_CHANNEL.getFieldValue());
inputMap.set('Body.ApplicationDetails.DSACode', this.BAD_DSA_ID.getFieldValue());
inputMap.set('Body.BorrowerDetails.Title', this.CD_TITLE.getFieldValue());
inputMap.set('Body.BorrowerDetails.FirstName', this.CD_FIRST_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.MiddleName', this.CD_MIDDLE_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.LastName', this.CD_LAST_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.FullName', this.CD_FULL_NAME.getFieldValue());
inputMap.set('Body.BorrowerDetails.Gender', this.CD_GENDER.getFieldValue());
inputMap.set('Body.BorrowerDetails.DOB', this.CD_DOB.getFieldValue());
inputMap.set('Body.BorrowerDetails.TaxID', this.CD_TAX_ID.getFieldValue());
inputMap.set('Body.BorrowerDetails.MobileNo', this.CD_MOBILE.getFieldValue());
inputMap.set('Body.BorrowerDetails.DebitScore', this.CD_DEBIT_SCORE.getFieldValue());
inputMap.set('Body.BorrowerDetails.CustomerSegment', this.CD_CUST_SGMT.getFieldValue());
inputMap.set('Body.BorrowerDetails.IsStaff', this.CD_STAFF.getFieldValue());
inputMap.set('Body.BorrowerDetails.StaffID', this.CD_STAFF_ID.getFieldValue());
inputMap.set('Body.LoanDetails.LoanAmount', this.LD_LOAN_AMOUNT.getFieldValue());
inputMap.set('Body.LoanDetails.InterestRate', this.LD_INTEREST_RATE.getFieldValue());
inputMap.set('Body.LoanDetails.ApplicationPurpose', this.LD_APP_PRPSE.getFieldValue());
inputMap.set('Body.LoanDetails.Tenure', this.LD_TENURE.getFieldValue());
inputMap.set('Body.LoanDetails.TenurePeriod', this.LD_TENURE_PERIOD.getFieldValue());
inputMap.set('Body.LoanDetails.SystemRecommendedAmount', this.LD_SYS_AMT_RCMD.getFieldValue());
inputMap.set('Body.LoanDetails.UserRecommendedAmount', this.LD_USR_RCMD_AMT.getFieldValue());
inputMap.set('Body.LoanDetails.EMIAmount', this.LD_EMI_AMT.getFieldValue());
this.services.http.fetchApi('/proposal/initiate', 'POST', inputMap, '/olive/publisher').subscribe(
async (httpResponse: HttpResponse<any>) => {
var res = httpResponse.body;
this.services.alert.showAlert(1, 'Form Saved Successfully!', 5000);
},
async (httpError)=>{
var err = httpError['error']
if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
if(err['ErrorElementPath'] == 'LoanDetails.EMIAmount'){
this.LD_EMI_AMT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.UserRecommendedAmount'){
this.LD_USR_RCMD_AMT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.SystemRecommendedAmount'){
this.LD_SYS_AMT_RCMD.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.TenurePeriod'){
this.LD_TENURE_PERIOD.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.Tenure'){
this.LD_TENURE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.ApplicationPurpose'){
this.LD_APP_PRPSE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.InterestRate'){
this.LD_INTEREST_RATE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'LoanDetails.LoanAmount'){
this.LD_LOAN_AMOUNT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.StaffID'){
this.CD_STAFF_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.IsStaff'){
this.CD_STAFF.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.CustomerSegment'){
this.CD_CUST_SGMT.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.DebitScore'){
this.CD_DEBIT_SCORE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.MobileNo'){
this.CD_MOBILE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.TaxID'){
this.CD_TAX_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.DOB'){
this.CD_DOB.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Gender'){
this.CD_GENDER.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.FullName'){
this.CD_FULL_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.LastName'){
this.CD_LAST_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.MiddleName'){
this.CD_MIDDLE_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.FirstName'){
this.CD_FIRST_NAME.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'BorrowerDetails.Title'){
this.CD_TITLE.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ApplicationDetails.DSACode'){
this.BAD_DSA_ID.setError(err['ErrorDescription']);
}
else if(err['ErrorElementPath'] == 'ApplicationDetails.SourcingChannel'){
this.BAD_SRC_CHANNEL.setError(err['ErrorDescription']);
}
}
this.services.alert.showAlert(3, 'Unable to save form!', 5000);
}
);
}
async OnBlurMethod(event){
let inputMap = new Map();
let Appendvariable:any = '';
if(this.CD_FIRST_NAME.getFieldValue() !=  undefined){
Appendvariable = this.CD_FIRST_NAME.getFieldValue();
}
if(this.CD_MIDDLE_NAME.getFieldValue() != undefined){
Appendvariable = Appendvariable + ' '+ this.CD_MIDDLE_NAME.getFieldValue();
}
if(this.CD_THIRD_NAME.getFieldValue()  !=  undefined){
Appendvariable = Appendvariable + ' '+this.CD_THIRD_NAME.getFieldValue();
}
if(this.CD_THIRD_NAME.getFieldValue()  !=  undefined){
Appendvariable = Appendvariable + ' '+this.CD_LAST_NAME.getFieldValue();
}
this.CD_FULL_NAME.setValue(Appendvariable);
}
fieldDependencies = {
BAD_SRC_CHANNEL: {
inDep: [

{paramKey: "VALUE1", depFieldID: "BAD_SRC_CHANNEL", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidSourceingChannel", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
BAD_DSA_ID: {
inDep: [

{paramKey: "VALUE1", depFieldID: "BAD_DSA_ID", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidDSAId", paramType:"QueryParam"},
],
outDep: [
]},
BAD_BRANCH: {
inDep: [

{paramKey: "BranchCd", depFieldID: "BAD_BRANCH", paramType:"PathParam"},
],
outDep: [
]},
BAD_PROD_CAT: {
inDep: [

{paramKey: "VALUE1", depFieldID: "BAD_PROD_CAT", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidProdCat", paramType:"QueryParam"},
],
outDep: [
]},
BAD_PRODUCT: {
inDep: [

{paramKey: "ProductCd", depFieldID: "BAD_PRODUCT", paramType:"PathParam"},
],
outDep: [
]},
BAD_SUB_PROD: {
inDep: [

{paramKey: "SubProductCd", depFieldID: "BAD_SUB_PROD", paramType:"PathParam"},
{paramKey: "BAD_PRODUCT", depFieldID: "BAD_PRODUCT", paramType:"QueryParam"},
],
outDep: [
]},
BAD_SCHEME: {
inDep: [

{paramKey: "SchemeCd", depFieldID: "BAD_SCHEME", paramType:"PathParam"},
{paramKey: "BAD_SUB_PROD", depFieldID: "BAD_SUB_PROD", paramType:"QueryParam"},
],
outDep: [
]},
BAD_PROMOTION: {
inDep: [

{paramKey: "PromotionCd", depFieldID: "BAD_PROMOTION", paramType:"PathParam"},
{paramKey: "BAD_PRODUCT", depFieldID: "BAD_PRODUCT", paramType:"QueryParam"},
{paramKey: "BAD_SUB_PROD", depFieldID: "BAD_SUB_PROD", paramType:"QueryParam"},
],
outDep: [
]},
CD_CUST_TYPE: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_CUST_TYPE", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hideCustomerType", paramType:"QueryParam"},
],
outDep: [
]},
CD_EXISTING_CUST: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_EXISTING_CUST", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hideExsCust", paramType:"QueryParam"},
],
outDep: [
]},
CD_TITLE: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_TITLE", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidTitle", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
CD_GENDER: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_GENDER", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidGender", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
CD_CUST_SGMT: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_CUST_SGMT", paramType:"PathParam"},
{paramKey: "KEY1", depFieldID: "hidCustSeg", paramType:"QueryParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
],
outDep: [
]},
CD_STAFF: {
inDep: [

{paramKey: "VALUE1", depFieldID: "CD_STAFF", paramType:"PathParam"},
{paramKey: "APPID", depFieldID: "hidAppId", paramType:"QueryParam"},
{paramKey: "KEY1", depFieldID: "hidYesNo", paramType:"QueryParam"},
],
outDep: [
]},
}
CustomerDataArray = [];

}