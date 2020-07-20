import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { AmortizationScheduleModel } from './AmortizationSchedule.model';
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
import { AmortizationGridComponent } from '../AmortizationGrid/AmortizationGrid.component';
import { AmortizationScheduleHandlerComponent } from './AmortizationSchedule-handler.component';


const customCss: string = '';

@Component({
	selector: 'app-ammortization-schedule',
	templateUrl: './AmortizationSchedule.component.html'
})
export class AmortizationScheduleComponent extends FormComponent implements OnInit, AfterViewInit {
  @ViewChild('LoanAmountRequested', { static: false }) LoanAmountRequested: TextBoxComponent;
  @ViewChild('NetInterestRate', { static: false }) NetInterestRate: TextBoxComponent;
  @ViewChild('Tenure', { static: false }) Tenure: TextBoxComponent;
  @ViewChild('BLoanOwnership', { static: false }) BLoanOwnership: TextBoxComponent;
  @ViewChild('CBLoanOwnership', { static: false }) CBLoanOwnership: TextBoxComponent;
  @ViewChild('BLoanAmtShare', { static: false })BLoanAmtShare: TextBoxComponent;
  @ViewChild('CBLoanAmountShare', { static: false }) CBLoanAmountShare: TextBoxComponent;
  @ViewChild('DisbursalDate', { static: false }) DisbursalDate: DateComponent;
  @ViewChild('ScheduleType', { static: false }) ScheduleType: TextBoxComponent;
  @ViewChild('RepaymentStartDate', { static: false }) RepaymentStartDate: DateComponent;
  @ViewChild('NoOfInstallments', { static: false }) NoOfInstallments: TextBoxComponent;
  @ViewChild('RequiredEMIAmt', { static: false }) RequiredEMIAmt: TextBoxComponent;
	@ViewChild('Generate', { static: false }) Generate: ButtonComponent;
	@ViewChild('Clear', { static: false }) Clear: ButtonComponent;
	@ViewChild('AmortizationGrid', { static: false }) AmortizationGrid: AmortizationGridComponent;
	@ViewChild('Handler', { static: false }) Handler: AmortizationScheduleHandlerComponent;

//	@ViewChild('hidRelation', { static: false }) hidRelation: HiddenComponent;
	@Input() ApplicationId: string = undefined;
	@Input() activeBorrowerSeq: string = undefined;
	//@Input() CustomerDetailsArray: any = undefined;
	cust_name: string;
	cust_dob: string;
	async revalidate(): Promise<number> {
		var totalErrors = 0;
		super.beforeRevalidate();
		await Promise.all([
			//this.revalidateBasicField('RD_REF_NAME'),
			
		]).then((errorCounts) => {
			errorCounts.forEach((errorCount) => {
				totalErrors += errorCount;
			});
		});
		this.errors = totalErrors;
		super.afterRevalidate();
		return totalErrors;
	}
	constructor(services: ServiceStock,private cdRef: ChangeDetectorRef) {
		super(services);
		this.value = new AmortizationScheduleModel();
    this.componentCode = 'AmortizationSchedule';
	}
	setReadOnly(readOnly) {
		super.setBasicFieldsReadOnly(readOnly);
	}
	async onFormLoad() {
		// this.ApplicationId = '2221';
		this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
		let inputMap = new Map();
	//	this.hidAppId.setValue('RLO');
		
		if (this.ApplicationId) {
			await this.AmortizationGrid.gridDataLoad({
				'ApplicationId': this.ApplicationId,
			});
		}
		//	console.log("shweta :: referrer", this.CustomerDetailsArray);
		await this.Handler.onFormLoad({});
		this.setDependencies();
	}
	setInputs(param: any) {
		let params = this.services.http.mapToJson(param);
		if (params['mode']) {
			this.mode = params['mode'];
		}
	}
	async submitForm(path, apiCode, serviceCode) {
		this.submitData['formName'] = 'AmortizationSchedule';
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
		this.value = new AmortizationScheduleModel();
		this.value.setValue(inputValue);
		this.setDependencies();
		this.passNewValue(this.value);
	}
	ngOnInit() {
		if (this.formCode == undefined) { this.formCode = 'AmortizationSchedule'; }
		if (this.formOnLoadError) { return; }
		var styleElement = document.createElement('style');
		styleElement.type = 'text/css';
		styleElement.innerHTML = customCss;
		styleElement.id = 'AmortizationSchedule_customCss';
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		var styleElement = document.getElementById('AmortizationSchedule_customCss');
		styleElement.parentNode.removeChild(styleElement);
	}
	ngAfterViewInit() {
    setTimeout(() => {
      this.subsBFldsValueUpdates();
			this.onFormLoad();
			this.checkForHTabOverFlow();
     // this.cdRef.detectChanges();
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
		this.value = new AmortizationScheduleModel();
		this.passNewValue(this.value);
		this.setReadOnly(false);
		this.onFormLoad();
	}
	

	RD_RESET_click(event) {
		this.onReset();
	}
	
	fieldDependencies = {
		// RD_REFERRER_RELATION: {
		// 	inDep: [
		// 		{ paramKey: "VALUE1", depFieldID: "RD_REFERRER_RELATION", paramType: "PathParam" },
		// 		{ paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
		// 		{ paramKey: "KEY1", depFieldID: "hidRelation", paramType: "QueryParam" },
		// 	],
		// 	outDep: [
		// 	]
		// }
	}

}
