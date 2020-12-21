import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { DecisionAlertModel } from './DecisionAlert.model';
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
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import { IPopUpModalResponse } from '../Interface/masterInterface';
import { UtilityService } from '../services/utility.service';


const customCss: string = '';

@Component({
    selector: 'app-DecisionAlert',
    templateUrl: './DecisionAlert.component.html'
})
export class DecisionAlertComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('DecisionReason', { static: false }) DecisionReason: ComboBoxComponent;
    @ViewChild('Remarks', { static: false }) Remarks: TextAreaComponent;
    @ViewChild('hidAppId', { static: false }) hidAppId: HiddenComponent;
    @ViewChild('hidDecisionRem', { static: false }) hidDecisionRem: HiddenComponent;
    @ViewChild('ApprovalReq', { static: false }) ApprovalReq: RLOUIRadioComponent;
    @ViewChild('DesignationAuthority', { static: false }) DesignationAuthority: ComboBoxComponent;
    @ViewChild('ApproverName', { static: false }) ApproverName: TextBoxComponent;
    @ViewChild('hidApprovalReq', { static: false }) hidApprovalReq: HiddenComponent;

    @Input() parentFormCode: string;
    @Input() parentData: string;
    @Input() ApplicationId: number;
    @Output() decisionAction: EventEmitter<any> = new EventEmitter<any>();

    showUW: boolean = false;
    fieldDependencies = {};
    uplodedDocs: Array<{ docType: string }> = [];

    constructor(services: ServiceStock, public utility: UtilityService) {
        super(services);
        this.value = new DecisionAlertModel();
        this.componentCode = 'DecisionAlert';
    }

    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'DecisionAlert'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'DecisionAlert_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('DecisionAlert_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            this.onFormLoad();
            this.checkForHTabOverFlow();
            console.log(this.parentFormCode, this.parentData);
            this.getUplodedDocuments();
        });
    }

    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            // this.revalidateBasicField('DecisionReason'),
            // this.revalidateBasicField('Remarks'),
            this.revalidateBasicField('ApprovalReq'),
            this.revalidateBasicField('DesignationAuthority'),
            this.revalidateBasicField('ApproverName'),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.errors = totalErrors;
        super.afterRevalidate();
        return totalErrors;
    }

    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.hidAppId.setValue('RLO');
        console.log("nhj", this.fieldDependencies);
        if (this.parentData == 'sentBack') {
            let object = {
                inDep: [
                    { paramKey: "VALUE1", depFieldID: "DecisionReason", paramType: "PathParam" },
                    { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                    { paramKey: "KEY1", depFieldID: "hidDecisionRem", paramType: "QueryParam" },
                ],
                outDep: [
                ]
            }
            this.fieldDependencies['DecisionReason'] = object;
            this.hidDecisionRem.setValue('DESICION');
        }
        else {

            let ApprovalReq = {
                inDep: [
                    { paramKey: "VALUE1", depFieldID: "ApprovalReq", paramType: "PathParam" },
                    { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
                    { paramKey: "KEY1", depFieldID: "hidApprovalReq", paramType: "QueryParam" },
                ],
                outDep: [
                ]
            }
            let DesignationAuthority = {
                inDep: [

                    { paramKey: "AuthoritySeq", depFieldID: "DesignationAuthority", paramType: "PathParam" },
                ],
                outDep: [
                ]
            }
            this.fieldDependencies['ApprovalReq'] = ApprovalReq;
            this.fieldDependencies['DesignationAuthority'] = DesignationAuthority;
            this.hidApprovalReq.setValue('Y_N');
            this.DesignationAuthority.setHidden(true);
            this.ApproverName.setHidden(true);
        }
        setTimeout(() => {
            this.setDependencies();
        }, 1000);

    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'DecisionAlert';
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
        this.value = new DecisionAlertModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
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
        this.value = new DecisionAlertModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }

    async ApprovalReq_blur() {
        if (this.ApprovalReq.getFieldValue() == 'Y') {
            this.DesignationAuthority.setHidden(false);
            this.ApproverName.setHidden(false);
            //   setTimeout(() => {
            //    let focusName = document.getElementById("ApproverName");  
            //    console.log(focusName);
            //    const firstInput = focusName.getElementsByTagName('input')[0];
            //    firstInput.focus();
            //   }, 0);

        }
        else {
            this.DesignationAuthority.setHidden(true);
            this.ApproverName.setHidden(true);
        }
    }
    async ALTER_SUBMIT_click(event) {
        var numberOfErrors: number = await this.revalidate();
        let Decision = {
            'ApprovalReq': this.ApprovalReq.getFieldValue(),
            'DesignationAuthority': this.DesignationAuthority.getFieldValue(),
            'ApproverName': this.ApproverName.getFieldValue()
        }

        if (numberOfErrors == 0) {
            if (!this.uplodedDocs.length) {
                alert("upload a Doc")
            }
            else {
                let obj: IPopUpModalResponse = {
                    "action": "btn-submit",
                    "response": Decision
                }
                this.decisionAction.emit(obj);
            }
        }
    }

    async pageSpecificData() {

        const inputMap = new Map();
        let Decision;
        Decision = {
            'DecisionReason': this.DecisionReason.getFieldValue(),
            'Remarks': this.Remarks.getFieldValue()
        }
        if (this.parentFormCode == 'UnderWriter') {
            Decision = {
                // 'DecisionReason': this.DecisionReason.getFieldValue(),
                // 'Remarks' : this.Remarks.getFieldValue(),
                'ApprovalReq': this.ApprovalReq.getFieldValue(),
                'DesignationAuthority': this.DesignationAuthority.getFieldValue(),
                'ApproverName': this.ApproverName.getFieldValue()
            }
        }
        else {
            Decision = {
                'DecisionReason': this.DecisionReason.getFieldValue(),
                'Remarks': this.Remarks.getFieldValue()
            }
        }
        return Promise.resolve(Decision);
    }

    close() {
        let obj: IPopUpModalResponse = {
            "action": "btn-close",
            "response": null
        }
        this.decisionAction.emit(obj);
    }

    //upload document before submitting
    uploadDoc() {
        this.services.rloui.openFileUpload(this.ApplicationId).then((response: any) => {
            console.error(response);
            this.getUplodedDocuments();
        });
    }

    getUplodedDocuments() {
        this.utility.getCommonService().getDocumentUploadDtls(this.ApplicationId).subscribe(
            data => {
                if (data['status'] === 'F' || data['Status_Cd'] === 'F') {
                    //this.services.alert.showAlert(2, '', 3000, 'Unable to get records.');
                } else {
                    let documents = data['DocList'];
                    if (documents) {
                        documents.forEach(element => {
                            if (element.docTypeDesc == "Card Approval Document") {
                                let obj = {
                                    "docType": element.docTypeDesc
                                };
                                this.uplodedDocs.push(obj);
                            }
                        });
                    } else {
                        this.uplodedDocs = [];
                    }
                    console.log("DEEP | uplodedDocs", this.uplodedDocs);
                }
            });
    }

    uploadDocument() {
        this.uploadDoc();
    }
}