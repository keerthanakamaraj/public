import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input, ComponentFactoryResolver, ViewContainerRef, HostListener } from '@angular/core';
import { DDEModel, AddSpecificComponent } from './DDE.model';
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
import { HeaderComponent } from '../Header/Header.component';
import { CustomerDtlsComponent } from '../CustomerDtls/CustomerDtls.component';
import { FamilyDetailsFormComponent } from '../FamilyDetailsForm/FamilyDetailsForm.component';
import { AssetDetailsFormComponent } from '../AssetDetailsForm/AssetDetailsForm.component';
import { LiabilityDtlsFormComponent } from '../LiabilityDtlsForm/LiabilityDtlsForm.component';
import { OtherDeductionFormComponent } from '../OtherDeductionForm/OtherDeductionForm.component';
import { IncomeSummaryFormComponent } from '../IncomeSummaryForm/IncomeSummaryForm.component';
import { VisitReportFormComponent } from '../VisitReportForm/VisitReportForm.component';
import { GoNoGoComponent } from '../go-no-go/go-no-go.component';
import { NotepadDetailsFormComponent } from '../NotepadDetailsForm/NotepadDetailsForm.component';
import { DDEHandlerComponent } from '../DDE/DDE-handler.component';
import { CustomerGridDTLSComponent } from '../CustomerGridDTLS/CustomerGridDTLS.component';
import { FamilyDetailsGridComponent } from '../FamilyDetailsGrid/FamilyDetailsGrid.component';
import { ReferralDetailsFormComponent } from '../ReferralDetailsForm/ReferralDetailsForm.component';
import { HeaderProgressComponent } from '../header-progress/header-progress.component';
//import { ReferralDetailsGridComponent } from '../ReferralDetailsGrid/ReferralDetailsGrid.component';
import { each } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
import { ReferralDetailsGridComponent } from '../ReferralDetailsGrid/ReferralDetailsGrid.component';
import { CreditCardDetailsComponent } from '../CreditCardDetails/CreditCardDetails.component';
import { OccupationDtlsFormComponent } from '../OccupationDtlsForm/OccupationDtlsForm.component';
import { AddressDetailsComponent } from '../AddressDetails/AddressDetails.component';
import { PersonalInterviewComponent } from '../PersonalInterview/personal-interview.component'
import { LoanDetailsFormComponent } from '../LoanDetailsForm/LoanDetailsForm.component';
import { LoanDetailsGridComponent } from '../LoanDetailsGrid/LoanDetailsGrid.component';
import { Subscription } from 'rxjs';
import cloneDeep from 'lodash/cloneDeep';
import { IComponentLvlData } from '../rlo-services/rloCommonData.service';
import { ScoreCardComponent } from '../score-card/score-card.component';
//import * as cloneDeep from 'lodash/cloneDeep';


const customCss: string = '';

@Component({
    selector: 'app-DDE',
    templateUrl: './DDE.component.html'
})
export class DDEComponent extends FormComponent implements OnInit, AfterViewInit {

    @HostListener('window:scroll', ['$event'])
    handleScroll() {
        let windowScroll = window.pageYOffset;
        if (windowScroll >= 280) {
            this.showExpandedHeader = false;
        }
    }

    @ViewChild('FieldId_1', { static: false }) FieldId_1: HeaderComponent;
    @ViewChild('CUST_DTLS', { static: false }) CUST_DTLS: CustomerDtlsComponent;
    @ViewChild('FAMILY_DTLS', { static: false }) FAMILY_DTLS: FamilyDetailsFormComponent;
    @ViewChild('FAMILY_GRID', { static: false }) FAMILY_GRID: FamilyDetailsGridComponent;
    @ViewChild('REFERRER_DTLS', { static: false }) REFERRER_DTLS: ReferralDetailsFormComponent;
    @ViewChild('ReferralDetailsGrid', { static: false }) ReferralDetailsGrid: ReferralDetailsGridComponent;
    @ViewChild('FieldId_14', { static: false }) FieldId_14: AssetDetailsFormComponent;
    @ViewChild('FieldId_15', { static: false }) FieldId_15: LiabilityDtlsFormComponent;
    @ViewChild('FieldId_6', { static: false }) FieldId_6: OtherDeductionFormComponent;
    @ViewChild('FieldId_9', { static: false }) FieldId_9: IncomeSummaryFormComponent;
    @ViewChild('FieldId_16', { static: false }) FieldId_16: VisitReportFormComponent;
    @ViewChild('GoNoGo_Dtls', { static: false }) GoNoGo_Dtls: GoNoGoComponent;
    @ViewChild('CreditCard', { static: false }) CreditCard: CreditCardDetailsComponent;
    @ViewChild('FieldId_13', { static: false }) FieldId_13: NotepadDetailsFormComponent;
    @ViewChild('Submit', { static: false }) Submit: ButtonComponent;
    @ViewChild('Cancel', { static: false }) Cancel: ButtonComponent;
    @ViewChild('Handler', { static: false }) Handler: DDEHandlerComponent;
    @ViewChild('HideProcessId', { static: false }) HideProcessId: HiddenComponent;
    @ViewChild('HideServiceCode', { static: false }) HideServiceCode: HiddenComponent;
    @ViewChild('HideTaskId', { static: false }) HideTaskId: HiddenComponent;
    @ViewChild('HideTenantId', { static: false }) HideTenantId: HiddenComponent;
    @ViewChild('HideUserId', { static: false }) HideUserId: HiddenComponent;
    @ViewChild('CUSTOMER_GRID', { static: false }) CUSTOMER_GRID: CustomerGridDTLSComponent;
    @ViewChild('appDDEFormDirective', { static: true, read: ViewContainerRef }) FormHost: ViewContainerRef;
    @ViewChild('headerProgressBar', { static: false }) headerProgressBar: HeaderProgressComponent;
    @ViewChild('LOAN_DTLS', { static: false }) LOAN_DTLS: LoanDetailsFormComponent;
    @ViewChild('FieldId_26', { static: false }) LOAN_GRID: LoanDetailsGridComponent;
    @ViewChild('scorecard', { static: false }) scoreCardComponent: ScoreCardComponent;

    @Output() familyblur: EventEmitter<any> = new EventEmitter<any>();
    ApplicationId: string = undefined;
    ActiveBorrowerSeq: string = undefined;
    ActiveCustomerDtls: {} = undefined;
    CustomerDetailsArray: any;
    // fullName: string = undefined;
    // Cust_DOB: string = undefined;
    // ActiveCustomerName: string = undefined;
    // ActiveCustomerDOB: string = undefined;
    // ActiveCustomerMobile: string = undefined;
    isCustomerTab: boolean = true;
    fullName: string = undefined;
    Cust_DOB: string = undefined;
    //ActiveCustomerDtls: {} = undefined;
    //ActiveBorrowerSeq: string = undefined;
    //ActiveCustomerName: string = undefined;
    //ActiveCustomerDOB: string = undefined;
    //ActiveCustomerMobile: string = undefined;
    //isCustomerTab: boolean = true;
    CustomerType: string = undefined;
    isLoanCategory: any = undefined;
    taskId: any;
    instanceId: any;
    userId: any;
    appId: any;
    initialLoadDone: boolean = false;
    mouseOvered: boolean = false;
    currentCompInstance;
    formMenuObject: {
        selectedMenuId: string,
        selectedMenuComponent: string,
        activeBorrowerSeq?: string,
        validCoBorrowerId?: string,//loanOwnership > 0
        isCustomerTabSelected: boolean,
        firstArr?: number,
        secondArr?: number
    } =
    {
        selectedMenuId: "",
        selectedMenuComponent: "",
        isCustomerTabSelected: true,
        firstArr: 0,
        secondArr: 0
    };


    //list of selected customer and application sections
    completedMenuSectionList = {
        customerSection: new Map(),
        applicationSection: new Map()
    };

    async revalidate(): Promise<number> {
        var totalErrors = 0;
        super.beforeRevalidate();
        await Promise.all([
            this.FieldId_1.revalidate(),
            this.FieldId_10_revalidate(),
            // this.CUSTOMER_GRID.revalidate(),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.errors = totalErrors;
        super.afterRevalidate();
        return totalErrors;
    }

    //ON FIRST TIME LOAD get all customer details and set menu acc.
    // initGetAllCustomerDetails(customerData: any, customerType: string = '') {
    //     this.CustomerDetailsArray = customerData.data;
    //     if (!this.initialLoadDone) {
    //         console.log("initGetAllCustomerDetails");
    //         console.error("deep-", customerData);
    //         let list = customerData.data;
    //         list.forEach(customer => {
    //             if (customer.CustomerType == "CB" && customer.LoanOwnership > 0) {
    //                 this.progressStatus.manditorySection += 4;
    //                 this.formMenuObject.validCoBorrowerId = this.getCustomerId(customer.CustomerType, customer.BorrowerSeq)
    //             }
    //         });
    //         console.log("deep", this.progressStatus);
    //         this.formsMenuList = JSON.parse(JSON.stringify(this.customerMenu));;
    //         console.log("deep ===", this.formsMenuList);
    //         this.initialLoadDone = true;
    //     }
    // }

    // getAllCustomerDetails(customerData) {
    //     console.error("deep-", customerData);
    //     let list = customerData.data;
    //     list.forEach(customer => {
    //         if (customer.CustomerType == "B" || customer.CustomerType == "CB") {
    //             this.progressStatus.borrowers += 1;
    //         }
    //     });
    //     this.createMenuForCustomers().then(() => {
    //         this.formsMenuList = this.setMenuAccToCustomer('borrower');
    //         console.error("deep ====", this.formsMenuList);
    //         this.injectDynamicComponent('CustomDetails', 2, 0);
    //     });
    // }

    customerMenu = [
        [
            { id: "CustomerDetails", name: "Customer Details", completed: true, iconClass: "icon-Customer-Details", isActive: false, isOptional: false },
            { id: "AddressDetails", name: "Address Details", completed: false, iconClass: "icon-Address-Details", isActive: false, isOptional: false },
            { id: "OccupationDetails", name: "Occupation Details", completed: false, iconClass: "icon-Occupation-Details", isActive: false, isOptional: false },
            { id: "FamilyDetails", name: "Family Details", completed: false, iconClass: "icon-Family-Details", isActive: false, isOptional: true }
        ],
        [
            { id: "LiabilityDetails", name: "Liability Details", completed: false, iconClass: "icon-Liability-Details", isActive: false, isOptional: true },
            { id: "AssetDetails", name: "Asset Details", completed: false, iconClass: "icon-Asset-Details", isActive: false, isOptional: true },
            { id: "IncomeSummary", name: "Income Summary", completed: false, iconClass: "icon-Income-Summary", isActive: false, isOptional: false },
            // { id: "CollateralDetails", name: "Collateral Details", completed: false, iconClass: "icon-Collateral-Details", isActive: false, isOptional: true }
        ],
        [
            { id: "PersonalInterviewDetails", name: "Personal Interview Details", completed: false, iconClass: "icon-Personal-Interview-Details", isActive: false, isOptional: true },
            { id: "RmVisitDetails", name: "RM Visit Details", completed: false, iconClass: "icon-RM-Visit-Details", isActive: false, isOptional: true },
        ]
    ];

    applicationMenu = [
        [
            // { id: "ApplicationDetails", name: "Application Details", completed: false, iconClass: "icon-Application-Details", isActive: false, isOptional: false },
            // { id: "GoldLoanDetails", name: "Gold Loan Details", completed: false, iconClass: "icon-Gold-Loan-Details", isActive: true, isOptional: true },
            // { id: "VehicalLoanDetails", name: "Vehical Loan Details", completed: false, iconClass: "icon-Vehicle-Loan-Details", isActive: false, isOptional: true },
            // { id: "EducationLoanDetails", name: "Education Loan Details", completed: false, iconClass: "icon-Education-Loan-Details", isActive: false, isOptional: true },
            { id: "LoanDetails", name: "Loan Details", completed: false, iconClass: "icon-Loan-Details", isActive: false, isOptional: false },
            { id: "CreditCardDetails", name: "Credit Card Details", completed: false, iconClass: "icon-Credit-Card-Details", isActive: false, isOptional: false },
        ],
        [
            // { id: "InterfaceResults", name: "Interface Results", completed: false, iconClass: "icon-Interface-Results", isActive: false, isOptional: false },
            // { id: "ScorecardResults", name: "Scorecard Results", completed: false, iconClass: "icon-Scorecard-Results", isActive: false, isOptional: false },
            // { id: "PolicyCheckResults", name: "Poicy Check Results", completed: false, iconClass: "icon-Policy-Check-Results", isActive: false, isOptional: false },
            { id: "GoNoGoDetails", name: "Go/No-Go Details", completed: false, iconClass: "icon-No-Go-Details", isActive: false, isOptional: false },
        ],
        [
            { id: "ReferrerDetails", name: "Referral Details", completed: false, iconClass: "icon-Referrer-Details", isActive: false, isOptional: true },
            { id: "Notes", name: "Notes", completed: false, iconClass: "icon-Notes", isActive: false, isOptional: true }
        ]
    ];

    formsMenuList: Array<any> = [];
    showExpandedHeader: boolean = true;//state of header i.e expanded-1 or collapsed-0 

    progressStatusObject: any = {
        manditorySection: 6,
        completedSection: 0,
        borrowers: 0
    };

    masterDataSubscription: Subscription;

    constructor(services: ServiceStock, private componentFactoryResolver: ComponentFactoryResolver) {
        super(services);
        this.value = new DDEModel();
        this.componentCode = 'DDE';
        this.initHTabGroup('FieldId_10', ['BORROWER_TAB', 'VISIT_REF', 'COLATTERAL', 'GO_NO_GO', 'COMMENTS_TAB',], 'GO_NO_GO', 1);

        //only added for customerDTLS
        this.services.rloCommonData.childToParentSubject.subscribe((event) => {
            switch (event.action) {
                case 'updateCustGrid': // on customer update/save success
                    console.log("shweta :: grid update ", event.data);
                    this.CUSTOMER_GRID.doAPIForCustomerList(event.data);
                    event.action = undefined;
                    break;
            }
        });

        //////////////////////////////
        this.masterDataSubscription = this.services.rloCommonData.getComponentLvlData().subscribe(data => {
            console.warn("deep === masterDataSubscription", data);
            if (!this.initialLoadDone) {
                this.setInitialObjectData(data)
            }
            var clonedMasterDataMap = cloneDeep(this.services.rloCommonData.masterDataMap);
            console.error(clonedMasterDataMap);

            this.services.rloCommonData.updateMasterDataMap(data, this.formMenuObject.isCustomerTabSelected);
            console.log(this.services.rloCommonData.masterDataMap);

            this.addOrRemoveCompletedSection(clonedMasterDataMap, data);
        });
    }

    setReadOnly(readOnly) {
        super.setBasicFieldsReadOnly(readOnly);
        this.FieldId_1.setReadOnly(readOnly);
        this.CUST_DTLS.setReadOnly(readOnly);
        this.FAMILY_DTLS.setReadOnly(readOnly);
        this.FieldId_14.setReadOnly(readOnly);
        this.FieldId_15.setReadOnly(readOnly);
        this.FieldId_6.setReadOnly(readOnly);
        this.FieldId_9.setReadOnly(readOnly);
        this.FieldId_16.setReadOnly(readOnly);
        this.FieldId_13.setReadOnly(readOnly);
        this.CUSTOMER_GRID.setReadOnly(readOnly);
    }
    async onFormLoad() {
        this.setInputs(this.services.dataStore.getData(this.services.routing.currModal));
        this.HideProcessId.setValue('RLO_Process');
        this.HideServiceCode.setValue('ClaimTask');
        this.HideTenantId.setValue('SB1');
        this.taskId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'taskId');
        this.instanceId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'instanceId');
        this.userId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'userId');
        this.ApplicationId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');


        this.CUSTOMER_GRID.ApplicationId = this.ApplicationId;
        this.CUSTOMER_GRID.parentFormCode = this.componentCode;
        this.CUSTOMER_GRID.doAPIForCustomerList({});

        if (this.userId === undefined || this.userId == '') {
            this.claimTask(this.taskId);
        }
        this.setDependencies();
    }

    async claimTask(taskId) {
        const inputMap = new Map();
        inputMap.clear();
        inputMap.set('Body.UserId', sessionStorage.getItem('userId'));
        inputMap.set('Body.TENANT_ID', this.HideTenantId.getFieldValue());
        inputMap.set('Body.TaskId', taskId);
        inputMap.set('HeaderParam.ProcessId', this.HideProcessId.getFieldValue());
        inputMap.set('HeaderParam.ServiceCode', this.HideServiceCode.getFieldValue());
        this.services.http.fetchApi('/ClaimTask', 'POST', inputMap, '/los-wf').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                const res = httpResponse.body;

                if (res.Status == 'S') {
                    this.services.alert.showAlert(1, 'rlo.success.claim.dde', 5000);
                } else {
                    this.services.alert.showAlert(2, 'rlo.error.claim.dde', -1);
                }
            },
            async (httpError) => {
                const err = httpError['error'];
                if (err != null && err['ErrorElementPath'] !== undefined && err['ErrorDescription'] !== undefined) {
                    if (err['ErrorElementPath'] === 'ServiceCode') {
                        this.HideServiceCode.setError(err['ErrorDescription']);
                    } else if (err['ErrorElementPath'] === 'ProcessId') {
                        this.HideProcessId.setError(err['ErrorDescription']);
                    } else if (err['ErrorElementPath'] === 'TaskId') {
                        this.HideTaskId.setError(err['ErrorDescription']);
                    } else if (err['ErrorElementPath'] === 'TENANT_ID') {
                        this.HideTenantId.setError(err['ErrorDescription']);
                    } else if (err['ErrorElementPath'] === 'UserId') {
                        this.HideUserId.setError(err['ErrorDescription']);
                    }
                }
                this.services.alert.showAlert(2, 'rlo.error.claim.dde', -1);
            }
        );
    }

    setInputs(param: any) {
        let params = this.services.http.mapToJson(param);
        if (params['mode']) {
            this.mode = params['mode'];
        }
    }
    async submitForm(path, apiCode, serviceCode) {
        this.submitData['formName'] = 'Details Data Entry';
        await super.submit(path, apiCode, serviceCode);
    }
    getFieldInfo() {
        this.amountComponent.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.comboFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.fileUploadFields.forEach(field => { this.additionalInfo[field.fieldID + '_desc'] = field.getFieldInfo(); });
        this.additionalInfo['FieldId_1_desc'] = this.FieldId_1.getFieldInfo();
        this.additionalInfo['CUST_DTLS_desc'] = this.CUST_DTLS.getFieldInfo();
        this.additionalInfo['FAMILY_DTLS_desc'] = this.FAMILY_DTLS.getFieldInfo();
        this.additionalInfo['FieldId_14_desc'] = this.FieldId_14.getFieldInfo();
        this.additionalInfo['FieldId_15_desc'] = this.FieldId_15.getFieldInfo();
        this.additionalInfo['FieldId_6_desc'] = this.FieldId_6.getFieldInfo();
        this.additionalInfo['FieldId_9_desc'] = this.FieldId_9.getFieldInfo();
        this.additionalInfo['FieldId_16_desc'] = this.FieldId_16.getFieldInfo();
        this.additionalInfo['FieldId_13_desc'] = this.FieldId_13.getFieldInfo();
        this.additionalInfo['CUSTOMER_GRID_desc'] = this.CUSTOMER_GRID.getFieldInfo();
        return this.additionalInfo;
    }
    getFieldValue() {
        this.value.FieldId_1 = this.FieldId_1.getFieldValue();
        this.value.CUST_DTLS = this.CUST_DTLS.getFieldValue();
        this.value.FAMILY_DTLS = this.FAMILY_DTLS.getFieldValue();
        this.value.FieldId_14 = this.FieldId_14.getFieldValue();
        this.value.FieldId_15 = this.FieldId_15.getFieldValue();
        this.value.FieldId_6 = this.FieldId_6.getFieldValue();
        this.value.FieldId_9 = this.FieldId_9.getFieldValue();
        this.value.FieldId_16 = this.FieldId_16.getFieldValue();
        this.value.FieldId_13 = this.FieldId_13.getFieldValue();
        this.value.CUSTOMER_GRID = this.CUSTOMER_GRID.getFieldValue();
        return this.value;
    }
    setValue(inputValue, inputDesc = undefined) {
        this.setBasicFieldsValue(inputValue, inputDesc);
        this.FieldId_1.setValue(inputValue['FieldId_1'], inputDesc['FieldId_1_desc']);
        this.CUST_DTLS.setValue(inputValue['CUST_DTLS'], inputDesc['CUST_DTLS_desc']);
        this.FAMILY_DTLS.setValue(inputValue['FAMILY_DTLS'], inputDesc['FAMILY_DTLS_desc']);
        this.FieldId_14.setValue(inputValue['FieldId_14'], inputDesc['FieldId_14_desc']);
        this.FieldId_15.setValue(inputValue['FieldId_15'], inputDesc['FieldId_15_desc']);
        this.FieldId_6.setValue(inputValue['FieldId_6'], inputDesc['FieldId_6_desc']);
        this.FieldId_9.setValue(inputValue['FieldId_9'], inputDesc['FieldId_9_desc']);
        this.FieldId_16.setValue(inputValue['FieldId_16'], inputDesc['FieldId_16_desc']);
        this.FieldId_13.setValue(inputValue['FieldId_13'], inputDesc['FieldId_13_desc']);
        this.CUSTOMER_GRID.setValue(inputValue['CUSTOMER_GRID'], inputDesc['CUSTOMER_GRID_desc']);
        this.value = new DDEModel();
        this.value.setValue(inputValue);
        this.setDependencies();
        this.passNewValue(this.value);

    }
    ngOnInit() {
        if (this.formCode == undefined) { this.formCode = 'DDE'; }
        if (this.formOnLoadError) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'DDE_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
        //this.onFormLoad();
        this.ApplicationId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');
        this.formsMenuList = JSON.parse(JSON.stringify(this.customerMenu));
        this.injectDynamicComponent('CustomerDetails', 0, 0);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        var styleElement = document.getElementById('DDE_customCss');
        styleElement.parentNode.removeChild(styleElement);
        this.services.rloCommonData.resetMapData();
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.subsBFldsValueUpdates();
            this.value.FieldId_1 = this.FieldId_1.getFieldValue();
            this.FieldId_1.valueChangeUpdates().subscribe((value) => { this.value.FieldId_1 = value; });
            //  this.value.CUST_DTLS = this.CUST_DTLS.getFieldValue();
            //  this.CUST_DTLS.valueChangeUpdates().subscribe((value) => { this.value.CUST_DTLS = value; });
            // this.value.FAMILY_DTLS = this.FAMILY_DTLS.getFieldValue();
            // this.FAMILY_DTLS.valueChangeUpdates().subscribe((value) => { this.value.FAMILY_DTLS = value; });
            // this.value.FieldId_14 = this.FieldId_14.getFieldValue();
            // this.FieldId_14.valueChangeUpdates().subscribe((value) => { this.value.FieldId_14 = value; });
            // this.value.FieldId_15 = this.FieldId_15.getFieldValue();
            // this.FieldId_15.valueChangeUpdates().subscribe((value) => { this.value.FieldId_15 = value; });
            // this.value.FieldId_6 = this.FieldId_6.getFieldValue();
            // this.FieldId_6.valueChangeUpdates().subscribe((value) => { this.value.FieldId_6 = value; });
            // this.value.FieldId_9 = this.FieldId_9.getFieldValue();
            // this.FieldId_9.valueChangeUpdates().subscribe((value) => { this.value.FieldId_9 = value; });
            // this.value.FieldId_16 = this.FieldId_16.getFieldValue();
            // this.FieldId_16.valueChangeUpdates().subscribe((value) => { this.value.FieldId_16 = value; });
            // this.value.FieldId_13 = this.FieldId_13.getFieldValue();
            // this.FieldId_13.valueChangeUpdates().subscribe((value) => { this.value.FieldId_13 = value; });
            this.value.CUSTOMER_GRID = this.CUSTOMER_GRID.getFieldValue();
            this.CUSTOMER_GRID.valueChangeUpdates().subscribe((value) => { this.value.CUSTOMER_GRID = value; });
            // this.onFormLoad();
            // this.checkForHTabOverFlow();
        });
        this.onFormLoad();
    }
    clearError() {
        super.clearBasicFieldsError();
        super.clearHTabErrors();
        super.clearVTabErrors();
        this.FieldId_1.clearError();
        this.CUST_DTLS.clearError();
        this.FAMILY_DTLS.clearError();
        this.FieldId_14.clearError();
        this.FieldId_15.clearError();
        this.FieldId_6.clearError();
        this.FieldId_9.clearError();
        this.CUSTOMER_GRID.clearError();
        this.FieldId_16.clearError();
        this.FieldId_13.clearError();
        this.errors = 0;
        this.errorMessage = [];
    }
    onReset() {
        super.resetBasicFields();
        this.FieldId_1.onReset();
        this.CUST_DTLS.onReset();
        this.FAMILY_DTLS.onReset();
        this.FieldId_14.onReset();
        this.FieldId_15.onReset();
        this.FieldId_6.onReset();
        this.FieldId_9.onReset();
        this.FieldId_16.onReset();
        this.FieldId_13.onReset();
        // this.CUSTOMER_GRID.onReset();
        this.clearHTabErrors();
        this.clearVTabErrors();
        this.errors = 0;
        this.errorMessage = [];
        this.additionalInfo = undefined;
        this.dependencyMap.clear();
        this.value = new DDEModel();
        this.passNewValue(this.value);
        this.setReadOnly(false);
        this.onFormLoad();
    }
    async BORROWER_TAB_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
            this.CUST_DTLS.revalidate(),
            this.FAMILY_DTLS.revalidate(),
            this.FieldId_14.revalidate(),
            this.FieldId_15.revalidate(),
            this.FieldId_6.revalidate(),
            this.FieldId_9.revalidate(),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.hTabGroups['FieldId_10'].tabs['BORROWER_TAB'].errorCount = totalErrors;
        return totalErrors;
    }
    async VISIT_REF_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
            this.FieldId_16.revalidate(),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.hTabGroups['FieldId_10'].tabs['VISIT_REF'].errorCount = totalErrors;
        return totalErrors;
    }
    async COLATTERAL_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.hTabGroups['FieldId_10'].tabs['COLATTERAL'].errorCount = totalErrors;
        return totalErrors;
    }
    async GO_NO_GO_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.hTabGroups['FieldId_10'].tabs['GO_NO_GO'].errorCount = totalErrors;
        return totalErrors;
    }
    async COMMENTS_TAB_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
            this.FieldId_13.revalidate(),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        this.hTabGroups['FieldId_10'].tabs['COMMENTS_TAB'].errorCount = totalErrors;
        return totalErrors;
    }
    async FieldId_10_revalidate(): Promise<number> {
        var totalErrors = 0;
        await Promise.all([
            this.BORROWER_TAB_revalidate(),
            this.VISIT_REF_revalidate(),
            this.COLATTERAL_revalidate(),
            this.GO_NO_GO_revalidate(),
            this.COMMENTS_TAB_revalidate(),
        ]).then((errorCounts) => {
            errorCounts.forEach((errorCount) => {
                totalErrors += errorCount;
            });
        });
        return totalErrors;
    }
    // async CUSTOMER_DETAILS_passBorrowerSeq(event) {
    //     let inputMap = new Map();
    //     await this.FAMILY_DTLS.FAMILY_GRID.gridDataLoad({
    //         'passFamilyGrid': event.BorrowerSeq,

    //     });
    //     // this.FAMILY_DTLS.Cust_FullName = event.CustomerArray.FullName;
    //     // this.FAMILY_DTLS.familyBorrowerSeq = event.BorrowerSeq;
    //     // await this.REFERRER_DTLS.ReferralDetailsGrid.gridDataLoad({
    //     //     'ReferrerSeqToGrid': event.BorrowerSeq,

    //     // });
    //     // this.REFERRER_DTLS.familyBorrowerSeq = event.BorrowerSeq;
    // }

    async CUST_DTLS_updateCustGrid(event) {
        console.log("Calling update customer grid Emitter");
        this.CUSTOMER_GRID.doAPIForCustomerList(event);
        // this.CUSTOMER_DETAILS.customerDetailMap = this.FieldId_9.doAPIForCustomerList(event)
    }
    async CUSTOMER_GRID_selectCustId(event) {
        let inputMap = new Map();
        this.CUST_DTLS.CUST_DTLS_GRID_custDtlsEdit(event);
    }

    async CUSTOMER_GRID_resetCustForm(event) {
        this.ActiveCustomerDtls = undefined;
        this.ActiveBorrowerSeq = undefined;
        this.CustomerType = event.customerType;
        this.injectDynamicComponent('CustomerDetails', 0, 0);
        //this.CUST_DTLS.setNewCustomerFrom(event);
    }

    //triggered when clicked - edit btn(b,cb,etc) and when first time loaded and on form save success(customerDTLS)
    async CUSTOMER_GRID_passArrayToCustomer(event) {
        console.log("CUSTOMER_GRID_passArrayToCustomer");

        let singleCustomer = [];
        this.ActiveCustomerDtls = event.CustomerArray;
        this.ActiveBorrowerSeq = event.CustomerArray.BorrowerSeq;
        this.CustomerType = event.CustomerArray.CustomerType;
        // this.ActiveCustomerName = event.CustomerArray.FullName;
        // this.ActiveCustomerDOB = event.CustomerArray.DOB;
        // this.ActiveCustomerMobile = event.CustomerArray.MobileNo;
        console.log(event);
        if (this.formMenuObject.activeBorrowerSeq == this.ActiveBorrowerSeq) {

        } else {
            this.formMenuObject.activeBorrowerSeq = this.ActiveBorrowerSeq;
            if (this.completedMenuSectionList.customerSection.size || this.completedMenuSectionList.applicationSection.size)
                this.reCalculateMenuSections(this.ActiveBorrowerSeq);
        }

        //passes customer data
        singleCustomer.push(event.CustomerArray);

        let obj = {
            "name": "CustomerDetails",
            "data": singleCustomer,
            "BorrowerSeq": event.CustomerArray.BorrowerSeq,
        }
        this.services.rloCommonData.globalComponentLvlDataHandler(obj);

        this.injectDynamicComponent('CustomerDetails', 0, 0);
    }

    getCustomerId(customerType, borrowerSeq): string {
        return customerType + "_" + borrowerSeq;
    }

    reCalculateMenuSections(activeBorrowerSeq) {
        console.warn("deep", activeBorrowerSeq, this.formMenuObject.isCustomerTabSelected);
        let alreadyCompletedSectionList;

        if (this.formMenuObject.isCustomerTabSelected) {
            alreadyCompletedSectionList = this.completedMenuSectionList.customerSection.get(activeBorrowerSeq);
            this.updateRoleBasedMenuData(alreadyCompletedSectionList);
        } else {

        }
    }

    updateRoleBasedMenuData(alreadyCompletedSections: any) {
        this.formsMenuList = JSON.parse(JSON.stringify(this.customerMenu));//refresh data
        for (let i = 0; i < this.formsMenuList.length; i++) {
            let subEle = this.formsMenuList[i];
            for (let j = 0; j < subEle.length; j++) {
                let element = subEle[j];
                if (this.CustomerType == 'G' && element.id != "AddressDetails") {
                    element.isOptional = true;
                }

                if (alreadyCompletedSections != undefined) {
                    console.log(alreadyCompletedSections.includes(element.id))
                    if (alreadyCompletedSections.includes(element.id)) {
                        element.completed = true;
                    }
                }
            }
        }
        console.log(this.formsMenuList);
    }

    // async FAMILY_DTLS_familyBlur(event) {
    //     console.log("Calling this Emitter", this.Cust_FullName);
    //     this.Cust_FullName;
    //     this.Cust_DOB;
    // }

    async Submit_click(event) {
        let inputMap = new Map();
        inputMap.clear();
    }

    brodcastApplicationId() {
        console.log("shweta :: in qde ApplicationId is ", this.ApplicationId);
        this.CUSTOMER_GRID.ApplicationId = this.ApplicationId;
    }


    injectDynamicComponent(componentId: string, ele1?: number, ele2?: number) {

        console.log(this.formMenuObject, this.formsMenuList);
        this.formsMenuList.forEach(element => { element.forEach(ele => { ele.isActive = false; }); });
        this.formsMenuList[ele1][ele2].isActive = true;

        this.formMenuObject.firstArr = ele1;
        this.formMenuObject.secondArr = ele2;
        this.formMenuObject.selectedMenuComponent = this.formsMenuList[ele1][ele2].name;
        this.formMenuObject.selectedMenuId = this.formsMenuList[ele1][ele2].id;

        const componentRef = this.getComponentClassRef(componentId);
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentRef.component);

        const viewContainerRef = this.FormHost;
        viewContainerRef.clear();

        const dynamicComponent = viewContainerRef.createComponent(componentFactory);
        var componentInstance = dynamicComponent.instance;
        this.currentCompInstance = componentInstance;
        componentInstance.ApplicationId = this.ApplicationId;
        componentInstance.isLoanCategory = this.isLoanCategory;

        // on tab switched or section switched or passArray Emitter called
        if (componentId == 'CustomerDetails') {
            componentInstance.parentFormCode = this.componentCode;
            if (this.ActiveCustomerDtls != undefined) {
                //   console.log("shweta :: DDE passArray or section/tab switch called",this.ActiveCustomerDtls);
                setTimeout(() => {
                    componentInstance.LoadCustomerDetailsonFormLoad(this.ActiveCustomerDtls);
                }, 500);
            } else if (this.CustomerType !== 'B') {
                // method will be called for new customer form after section switch
                //  console.log("shweta :: DDE section switch on new cust",this.CustomerType);
                let data = { 'customerType': this.CustomerType };
                setTimeout(() => {
                    componentInstance.setNewCustomerFrom(data);
                }, 500);
            }
        } else if (this.isCustomerTab && this.ActiveBorrowerSeq != undefined) {
            componentInstance.activeBorrowerSeq = this.ActiveBorrowerSeq;
        }
        // if (componentId == 'FamilyDetails') {
        //     componentInstance.ActiveCustomerDtls = this.ActiveCustomerDtls;
        // }
        // if (componentInstance.componentCode == "LoanDetailsForm" || componentId == 'ReferrerDetails') {
        //     componentInstance.CustomerDetailsArray = this.CustomerDetailsArray;
        // }

        this.services.rloCommonData.dynamicComponentInstance = componentInstance;
    }

    updateRoleBasedScore(action: string) {
        if (this.CustomerType == "B") {
            this.calculateScore(action);
        }
        else if (this.CustomerType == "CB" && this.formMenuObject.validCoBorrowerId == this.formMenuObject.activeBorrowerSeq) {
            console.error("@@@@@@@@@@@@@@@@ CB with LO");
            this.calculateScore(action);
        }
    }

    getComponentClassRef(componentId: string): AddSpecificComponent {
        switch (componentId) {
            case 'CustomerDetails':
                return new AddSpecificComponent(CustomerDtlsComponent);
                break;

            case 'FamilyDetails':
                return new AddSpecificComponent(FamilyDetailsFormComponent);
                break;

            case 'LiabilityDetails':
                return new AddSpecificComponent(LiabilityDtlsFormComponent);
                break;

            case 'AssetDetails':
                return new AddSpecificComponent(AssetDetailsFormComponent);
                break;

            case 'IncomeSummary':
                return new AddSpecificComponent(IncomeSummaryFormComponent);
                break;
            case 'GoNoGoDetails':
                return new AddSpecificComponent(GoNoGoComponent);
                break;
            case 'ReferrerDetails':
                return new AddSpecificComponent(ReferralDetailsFormComponent);
                break;
            case 'CreditCardDetails':
                return new AddSpecificComponent(CreditCardDetailsComponent);
                break;
            case 'AddressDetails':
                return new AddSpecificComponent(AddressDetailsComponent);
                break;
            case 'OccupationDetails':
                return new AddSpecificComponent(OccupationDtlsFormComponent);
                break;
            case 'LoanDetails':
                return new AddSpecificComponent(LoanDetailsFormComponent);
                break;
            case 'PersonalInterviewDetails':
                return new AddSpecificComponent(PersonalInterviewComponent);
                break;
            case 'RmVisitDetails':
                return new AddSpecificComponent(VisitReportFormComponent);
                break;
            case 'Notes':
                return new AddSpecificComponent(NotepadDetailsFormComponent);
                break;
            default:
                return new AddSpecificComponent(CustomerDtlsComponent);
                break;

        }
    }

    tabSwitched(tabName: string) {
        console.log(tabName);
        let defaultSection: string = '';
        if (tabName == "customer") {
            this.formMenuObject.isCustomerTabSelected = true;
            this.reCalculateMenuSections(this.ActiveBorrowerSeq);
            this.updateSelectedTabIndex(0, 0);
            this.injectDynamicComponent('CustomerDetails', 0, 0);
        }
        else {
            console.log(this.isLoanCategory);
            this.formMenuObject.isCustomerTabSelected = false;
            this.formsMenuList = this.applicationMenu;
            this.formsMenuList.forEach(element => {
                for (let i = 0; i < element.length; i++) {
                    const section = element[i];
                    section.isActive = false;
                    if (this.isLoanCategory) {//ie. loan type credit card
                        if (section.id == "CreditCardDetails")
                            element.splice(i, 1);
                    }
                    else {//CC type loan
                        if (section.id == "LoanDetails")
                            element.splice(i, 1);
                    }
                }
            });
            this.updateSelectedTabIndex(1, 3);
            this.injectDynamicComponent('GoNoGoDetails', 1, 0);
        }
    }

    updateSelectedTabIndex(firstArrayIndex: number, secondArrayIndex: number): void {
        this.formMenuObject.firstArr = firstArrayIndex;
        this.formMenuObject.secondArr = secondArrayIndex;
    }

    //going back and forth via btns

    loadForm(loadDirection: string, firstArrayIndex: number = -1, secondArrayIndex: number = -1) {
        console.log(this.formMenuObject, loadDirection);
        console.error(this.formsMenuList);
        let firstArray = firstArrayIndex == -1 ? this.formMenuObject.firstArr : firstArrayIndex;
        let secondArray = secondArrayIndex == -1 ? this.formMenuObject.secondArr : secondArrayIndex;
        let selectedIndex = -1;

        if (loadDirection == 'nxt') {
            for (let j = 0; j < this.formsMenuList[firstArray].length; j++) {
                const arrEle = this.formsMenuList[firstArray][j];
                if (j >= secondArray && !arrEle.isActive && !arrEle.completed && selectedIndex == -1) {
                    console.warn(arrEle);
                    this.injectDynamicComponent(arrEle.id, firstArray, j);
                    selectedIndex = j;
                }
            }
            if (selectedIndex == -1) {
                let sIndex;
                if (this.formsMenuList.length - 1 == firstArray) {
                    sIndex = 0;
                    alert("reached last section");
                } else {
                    sIndex = firstArray + 1;
                    this.loadForm('nxt', sIndex, 0);
                }
            }
        }
        else {
            for (let j = this.formsMenuList[firstArray].length - 1; j >= 0; j--) {
                const arrEle = this.formsMenuList[firstArray][j];
                if (j <= secondArray && !arrEle.isActive && !arrEle.completed && selectedIndex == -1) {
                    console.warn(arrEle);
                    this.injectDynamicComponent(arrEle.id, firstArray, j);
                    selectedIndex = j;
                }
            }
            if (selectedIndex == -1) {
                let sIndex;
                if (firstArray == 0) {
                    sIndex = this.formsMenuList.length - 1;
                    alert("No more unfilled sections");
                } else {
                    sIndex = firstArray - 1;
                    this.loadForm('prev', sIndex, this.formsMenuList[sIndex].length - 1);
                }
            }
        }
    }

    /* Cancel / Back button */
    goBack() {
        if (confirm("Are you sure you want to cancel?")) {
            // history.back();
            this.services.router.navigate(['home', 'LANDING']);
        }
    }

    async brodcastProdCategory(event) {
        //  event.isLoanCategory false when type is 'CC'
        this.isLoanCategory = event.isLoanCategory;
        if (this.formMenuObject.selectedMenuId == 'CustomerDetails') {
            this.currentCompInstance.loanCategoryChanged(event.isLoanCategory);
            // this.services.rloCommonData.childToParentSubject.next({
            //     action: 'loanCategoryUpdated',
            //     data: { 'isLoanCategory':  event.isLoanCategory }
            // });
        }
        this.CUSTOMER_GRID.isLoanCategory = event.isLoanCategory;
    }

    async headerState(event) {
        this.showExpandedHeader = event.headerState;
        this.scoreCardComponent.headerChanges(event);
        this.headerProgressBar.headerChanges(event);
    }

    updateProgressBar() {
        if (this.initialLoadDone) {
            let individualSectionScore = (1 / this.progressStatusObject.manditorySection) * 100;
            let score = Math.round(individualSectionScore * this.progressStatusObject.completedSection);
            this.headerProgressBar.update(score);
        }
    }

    calculateScore(action: string) {
        let isSectionOptional = this.formsMenuList[this.formMenuObject.firstArr][this.formMenuObject.secondArr].isOptional;
        console.log(this.progressStatusObject);
        if (!isSectionOptional) {
            if (action == "add") {
                this.progressStatusObject.completedSection += 1;
            } else {
                this.progressStatusObject.completedSection -= 1;
            }
        }
        this.updateProgressBar();
    }

    //after adding and removing section from map
    updateMenu(action: string, menuList: any, componentLvlData: IComponentLvlData) {
        let state = action == "add" ? true : false;
        this.completedMenuSectionList.customerSection.set(componentLvlData.BorrowerSeq, menuList);
        this.formsMenuList[this.formMenuObject.firstArr][this.formMenuObject.secondArr].completed = state;//change status

        console.log("deep ===", this.formMenuObject);
        if (!this.formsMenuList[this.formMenuObject.firstArr][this.formMenuObject.secondArr].isOptional) {
            this.updateRoleBasedScore(action);
        }

    }

    addOrRemoveCompletedSection(DataMap: any, componentLvlData: IComponentLvlData) {
        let clonedMasterDataMap = new Map();
        let data = [];
        const masterDataMapComponent: Map<any, any> = this.services.rloCommonData.masterDataMap.get("customerMap").get(componentLvlData.BorrowerSeq);

        //if (componentLvlData.BorrowerSeq === this.formMenuObject.activeBorrowerSeq) {
        if (this.formMenuObject.isCustomerTabSelected) {
            clonedMasterDataMap = DataMap.get("customerMap").get(componentLvlData.BorrowerSeq);
            console.log(clonedMasterDataMap);
            //first time loading data; customer not present
            if (this.completedMenuSectionList.customerSection.get(componentLvlData.BorrowerSeq) === undefined) {
                console.error("SECTION COMPLETED | CALCULATE SCORE");
                data.push(componentLvlData.name);
                this.updateMenu('add', data, componentLvlData);
            }
            else {
                let dataList = this.completedMenuSectionList.customerSection.get(componentLvlData.BorrowerSeq);
                if (clonedMasterDataMap.size < masterDataMapComponent.size) {
                    console.error("SECTION COMPLETED | CALCULATE SCORE");
                    dataList.push(componentLvlData.name);
                    this.updateMenu('add', dataList, componentLvlData);
                }
                else if (clonedMasterDataMap.size > masterDataMapComponent.size) {
                    console.error("SECTION REMOVED | CALCULATE SCORE");
                    dataList.splice(dataList.indexOf(componentLvlData.BorrowerSeq), 1);
                    this.updateMenu('remove', dataList, componentLvlData);
                }
            }
        }
        else {
            clonedMasterDataMap = DataMap.get("applicationMap");
        }
        //}
        console.warn(this.completedMenuSectionList, this.progressStatusObject);
    }

    setInitialObjectData(data) {
        console.log("setInitialObjectData", data.data[0]);
        console.error("deep-", data);
        let customerData = data.data[0];
        this.CustomerType = customerData.CustomerType;
        //if (customerData.CustomerType == "B" && customerData.LoanOwnership == 100) loan ownership field not present in response JSON
        if (customerData.CustomerType == "B") {
            this.initialLoadDone = true;
        }
        else {
            if (customerData.CustomerType == "CB" && customerData.LoanOwnership > 0 && this.progressStatusObject.manditorySection < 11) {
                this.progressStatusObject.manditorySection += 4;
                this.formMenuObject.validCoBorrowerId = customerData.BorrowerSeq;
                this.initialLoadDone = true;
            }
        }
        console.log("deep", this.progressStatusObject);

    }
}


