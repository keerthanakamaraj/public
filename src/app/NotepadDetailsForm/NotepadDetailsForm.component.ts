import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { NotepadDetailsFormModel } from './NotepadDetailsForm.model';
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
import { NotepadDetailsGridComponent } from '../NotepadDetailsGrid/NotepadDetailsGrid.component';
import { NotepadHandlerComponent } from '../NotepadDetailsForm/notepad-handler.component';

const customCss: string = '';

@Component({
    selector: 'app-NotepadDetailsForm',
    templateUrl: './NotepadDetailsForm.component.html'
})
export class NotepadDetailsFormComponent extends FormComponent implements OnInit, AfterViewInit {
    @ViewChild('ND_COMMENT_CAT', { static: false }) ND_COMMENT_CAT: ComboBoxComponent;
    @ViewChild('ND_COMMENTS', { static: false }) ND_COMMENTS: TextAreaComponent;
    @ViewChild('ND_SAVE', { static: false }) ND_SAVE: ButtonComponent;
    @ViewChild('ND_CLEAR', { static: false }) ND_CLEAR: ButtonComponent;
    @ViewChild('FieldId_7', { static: false }) FieldId_7: NotepadDetailsGridComponent;
    @ViewChild('Handler', { static: false }) Handler: NotepadHandlerComponent;
    @ViewChild('hiddenAppId', { static: false }) hiddenAppId: HiddenComponent;
    @ViewChild('hiddenKey', { static: false }) hiddenKey: HiddenComponent;
    @Input() ApplicationId: string = undefined;


    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.revalidateBasicField('ND_COMMENT_CAT'),
            this.revalidateBasicField('ND_COMMENTS'),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.errors = totalErrors;
        super.afterRevalidate();
        return totalErrors;
    }
    constructor(services: ServiceStock) {
        super(services);
        this.value = new NotepadDetailsFormModel();
        this.componentCode = 'NotepadDetailsForm';
    }
    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
    }
    async onFormLoad(event) {

        //  this.ApplicationId = event.custSeq;

        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.hiddenAppId.setValue('RLO');
        this.hiddenKey.setValue('NOTEPAD_COMMENT');
        let inputMap = new Map();
        await this.Handler.onFormLoad({
        });
        //  await this.FieldId_7.gridDataLoad({
        //      'ApplicationId':this.ApplicationId
        //   });
        this.setDependencies();
    }
    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'Notepad Details Form';
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
        this.value = new NotepadDetailsFormModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);
    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'NotepadDetailsForm'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'NotepadDetailsForm_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('NotepadDetailsForm_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            this.onFormLoad(event);
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
        this.value = new NotepadDetailsFormModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad(event);
    }
    async ND_SAVE_click(event) {
        console.log("shweta:: notepad app id ", this.ApplicationId);
        if (this.ApplicationId != undefined) {
            let inputMap = new Map();
            var numberOfErrors: number = await this.revalidate();
            if (numberOfErrors == 0) {
                inputMap.clear();
                inputMap.set('Body.NotepadDetails.CommentCategory', this.ND_COMMENT_CAT.getFieldValue());
                inputMap.set('Body.NotepadDetails.Comments', this.ND_COMMENTS.getFieldValue());
                inputMap.set('Body.NotepadDetails.ApplicationId', this.ApplicationId);
                this.services.http.fetchApi('/NotepadDetails', 'POST', inputMap).subscribe(
                    async (httpResponse: HttpResponse<any>) => {
                        var res = httpResponse.body;
                        this.services.alert.showAlert(1, 'rlo.success.save.notepad', 5000);
                    },
                    async (httpError) => {
                        var err = httpError['error']
                        if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                            if (err['ErrorElementPath'] == 'NotepadDetails.Comments') {
                                this.ND_COMMENTS.setError(err['ErrorDescription']);
                            }
                            else if (err['ErrorElementPath'] == 'NotepadDetails.CommentCategory') {
                                this.ND_COMMENT_CAT.setError(err['ErrorDescription']);
                            }
                        }
                        this.services.alert.showAlert(2, 'rlo.error.save.notepad', -1);
                    }
                );
            }
            else {
                this.services.alert.showAlert(2, 'rlo.error.invalid.form', -1);
            }
        }
    }
    async ND_CLEAR_click(event) {
        let inputMap = new Map();
        this.onReset();
    }

    fieldDependencies = {
        ND_COMMENT_CAT: {
            inDep: [
                { paramKey: "VALUE1", depFieldID: "ND_COMMENT_CAT", paramType: "PathParam" },
                { paramKey: "KEY1", depFieldID: "hiddenKey", paramType: "QueryParam" },
                { paramKey: "APPID", depFieldID: "hiddenAppId", paramType: "QueryParam" },
            ],
            outDep: [
            ]
        },
    }

}