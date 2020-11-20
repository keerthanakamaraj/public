import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalData, IButtonObj } from './popup-interface'
import { AnyNaptrRecord } from 'dns';
import { AddSpecificComponent } from './popup-alert.model';
import { NotepadDetailsFormComponent } from '../NotepadDetailsForm/NotepadDetailsForm.component';
import { AmortizationScheduleComponent } from '../amortization-schedule/AmortizationSchedule.component'
import { FamilyDetailsFormComponent } from '../FamilyDetailsForm/FamilyDetailsForm.component';
import { GoNoGoComponent } from '../go-no-go/go-no-go.component';
import { ReferralDetailsFormComponent } from '../ReferralDetailsForm/ReferralDetailsForm.component';
import { CreditCardDetailsComponent } from '../CreditCardDetails/CreditCardDetails.component';
import { AddressDetailsComponent } from '../AddressDetails/AddressDetails.component';
import { LoanDetailsFormComponent } from '../LoanDetailsForm/LoanDetailsForm.component';
import { PersonalInterviewComponent } from '../PersonalInterview/personal-interview.component';
import { VisitReportFormComponent } from '../VisitReportForm/VisitReportForm.component';
import { ApplicationDtlsComponent } from '../ApplicationDtls/ApplicationDtls.component';
import { FormComponent } from '../form/form.component';
import { OccupationDtlsFormComponent } from '../OccupationDtlsForm/OccupationDtlsForm.component';
import { AssetDetailsFormComponent } from '../AssetDetailsForm/AssetDetailsForm.component';
import { CustomerDtlsComponent } from '../CustomerDtls/CustomerDtls.component';
import { FeesChargesDetailsComponent } from '../Fees&ChargesDetails/Fees&ChargesDetails.component';
import { DisbursementDetailsComponent } from '../DisbursementDetails/DisbursementDetails.component';
import { IncomeSummaryFormComponent } from '../IncomeSummaryForm/IncomeSummaryForm.component';
import { LiabilityDtlsFormComponent } from '../LiabilityDtlsForm/LiabilityDtlsForm.component';
import { DocumentUploadComponent } from '../document-upload/document-upload.component';
import { IAmortizationForm, IPopUpModalResponse } from '../Interface/masterInterface';
import { PropertyDetailsComponent } from '../PropertyDetails/PropertyDetails.component';
import { PolicyCheckResultComponent } from '../policy-check-result/policy-check-result.component';
import { ScoreCardResultComponent } from '../score-card-result/score-card-result.component';
import { CustomerSearchComponent } from '../customer-search/customer-search.component';
import { CustomerSearchFieldsComponent } from '../customer-search-fields/customer-search-fields.component';
import { DecisionAlertComponent } from '../DecisionAlert/DecisionAlert.component';
import { InterfaceResultsComponent } from '../interface-results/interface-results.component';

@Component({
  selector: 'app-popup-alert',
  templateUrl: './popup-alert.component.html',
  styleUrls: ['./popup-alert.component.css']
})
export class PopupAlertComponent implements OnInit {

  @ViewChild('appAlertComponents', { static: true, read: ViewContainerRef }) FormHost: ViewContainerRef;
  @ViewChild('FAMILY_DTLS', { static: false }) FAMILY_DTLS: FamilyDetailsFormComponent;
  @ViewChild('OCCUPATION_DTLS', { static: false }) OCCUPATION_DTLS: OccupationDtlsFormComponent;

  modalObject: IModalData;
  dynamicallyLoadableComponent: any;//instance of the component that will be loaded dynamically

  constructor(public activeModal: NgbActiveModal, public services: ServiceStock, private componentFactoryResolver: ComponentFactoryResolver, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.modalObject = this.services.rloui.modalObject;
    console.error(this.modalObject);
    // console.log(this.modalObject.rawHtml);
    console.warn(this.modalObject.buttons, this.modalObject.componentName);
  }

  async onClick(buttonObj: AnyNaptrRecord): Promise<any> {
    if (buttonObj['text'] == "PRINT") {
      var prtContent = document.getElementById("printdiv");
      var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=500px,toolbar=0,scrollbars=0,status=0');
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    }

    if (this.modalObject.componentName == "DecisionAlert") {
      this.dynamicallyLoadableComponent.pageSpecificData().then((response: any) => {
        console.warn('DEEP | modal closed  for' + this.modalObject.componentName, response);
        let closeModelResponse: IPopUpModalResponse;
        closeModelResponse["action"] = "icon-close";
        closeModelResponse["response"] = null;
        this.activeModal.close(closeModelResponse);
      });
    } else {
      this.activeModal.close(buttonObj);
      //on click of modal button send the button obj eg: {id: 1, text: 'Save';, type: "success", class: "btn-primary"}.
      //Depending on which btn click(id); perform actions. Respnse snt where the component/ngModal is invoked 
    }
  }

  ngAfterViewInit() {
    if (this.modalObject.hasOwnProperty('componentName')) {
      this.injectDynamicComponent();
    }
    this.cdRef.detectChanges();
  }

  injectDynamicComponent() {
    const componentRef = this.getComponentClassRef(this.modalObject.componentName);
    let headerObj = this.services.rloCommonData.globalApplicationDtls;

    let isLoanCategory = false;
    if (headerObj != null || headerObj != undefined) {
      isLoanCategory = headerObj.isLoanCategory;
    }

    // console.log("DEEP | popup alert object______", this.modalObject);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentRef.component);

    const viewContainerRef = this.FormHost;
    viewContainerRef.clear();

    const dynamicComponent = viewContainerRef.createComponent(componentFactory);
    this.dynamicallyLoadableComponent = dynamicComponent.instance;
    this.dynamicallyLoadableComponent.parentData = this.modalObject.data;

    if (this.modalObject.componentName != 'AmortizationScheduleComponent' && this.modalObject.componentName != 'DisbursementDetailsComponent' && this.modalObject.componentName != 'FeesChargesDetailsComponent') {
      this.dynamicallyLoadableComponent.isLoanCategory = isLoanCategory;
      this.dynamicallyLoadableComponent.parentFormCode = this.modalObject.componentCode;
      this.dynamicallyLoadableComponent.ApplicationId = this.modalObject.applicationId;
      this.dynamicallyLoadableComponent.activeBorrowerSeq = this.modalObject.borrowerSeq;
      this.dynamicallyLoadableComponent.readOnly = true;

      if (this.modalObject.componentName == "CustomerDetails") {
        setTimeout(() => {
          this.dynamicallyLoadableComponent.loanCategoryChanged(isLoanCategory);
        }, 1000);
      } else if (this.modalObject.componentName == "FeesAndChargesDetails") {
        const parentData: IAmortizationForm = undefined;
        let obj = {
          "ApplicationId": this.modalObject.applicationId
        }
        this.dynamicallyLoadableComponent.parentData = obj;
      } else if (this.modalObject.componentName == 'Amortization') {
        this.dynamicallyLoadableComponent.parentData = this.services.rloCommonData.amortizationModalDataUW
      } else if (this.modalObject.componentName == 'ObligationDetails') {
        this.dynamicallyLoadableComponent.setTypeObligation = true;
      } else if (this.modalObject.componentName == 'ScorecardResults') {
        this.dynamicallyLoadableComponent.openInModal = true;
      } else if (this.modalObject.componentName == 'PolicyCheckResults') {
        this.dynamicallyLoadableComponent.openInModal = true;
        this.dynamicallyLoadableComponent.parentFormCode = "DDE";//used in condition to check score acc. to stage
      } else if (this.modalObject.componentName == 'CreditCardDetails') {
        this.dynamicallyLoadableComponent.enableApproveLimit = true;
      } else if (this.modalObject.componentName == 'CustomerSearch') {
        //this.dynamicallyLoadableComponent.passedFieldData=this.dynamicallyLoadableComponent.parentData
      } else if (this.modalObject.componentName == 'InterfaceResults') {
        this.dynamicallyLoadableComponent.ApplicationId = this.modalObject.applicationId;
        this.dynamicallyLoadableComponent.uwCustomerList = this.modalObject.customerList;
      }

      // async brodcastProdCategory(event) {
      //   //  event.isLoanCategory false when type is 'CC'
      //   this.isLoanCategory = event.isLoanCategory;
      //   if (this.formMenuObject.selectedMenuId == 'CustomerDetails') {
      //   this.dynamicallyLoadableComponent.loanCategoryChanged(event.isLoanCategory);
      //     // this.services.rloCommonData.childToParentSubject.next({
      //     //     action: 'loanCategoryUpdated',
      //     //     data: { 'isLoanCategory':  event.isLoanCategory }
      //     // });
      //   }
      //   this.CUSTOMER_GRID.isLoanCategory = event.isLoanCategory;
      // }
    }

    if (this.modalObject.componentName == 'DecisionAlert') {
      setTimeout(() => {
        //event emitter added for in decisionAlert
        this.dynamicallyLoadableComponent.decisionAction.subscribe((data) => {
          console.log("DEEP | decisionAction()", data);
          this.activeModal.close(data);
        });
      }, 1000);
    }
  }

  getComponentClassRef(componentId: string): AddSpecificComponent {
    switch (componentId) {
      case 'NotepadDetailsFormComponent':
        return new AddSpecificComponent(NotepadDetailsFormComponent);
        break;
      case 'AmortizationScheduleComponent':
      case 'Amortization':
        return new AddSpecificComponent(AmortizationScheduleComponent);
        break;
      case 'FeesChargesDetailsComponent':
      case 'FeesAndChargesDetails':
        return new AddSpecificComponent(FeesChargesDetailsComponent);
        break;
      case 'DisbursementDetailsComponent':
      case 'DisbursementDetails':
        return new AddSpecificComponent(DisbursementDetailsComponent);
        break;
      case 'FamilyDetails':
        return new AddSpecificComponent(FamilyDetailsFormComponent);
        break;
      case 'CustomerDetails':
        return new AddSpecificComponent(CustomerDtlsComponent);
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
      case 'ApplicationDetails':
        return new AddSpecificComponent(ApplicationDtlsComponent);
        break;
      case 'OccupationDetails':
        return new AddSpecificComponent(OccupationDtlsFormComponent);
        break;
      case 'AssetDetails':
        return new AddSpecificComponent(AssetDetailsFormComponent);
        break;
      case 'IncomeSummary':
        return new AddSpecificComponent(IncomeSummaryFormComponent);
        break;
      case 'LiabilityDetails':
      case 'ObligationDetails':
        return new AddSpecificComponent(LiabilityDtlsFormComponent);
        break;
      case 'FileUpload':
        return new AddSpecificComponent(DocumentUploadComponent);
        break;
      case 'PropertyDetails':
        return new AddSpecificComponent(PropertyDetailsComponent);
        break;
      case 'PolicyCheckResults':
        return new AddSpecificComponent(PolicyCheckResultComponent);
        break;
      case 'ScorecardResults':
        return new AddSpecificComponent(ScoreCardResultComponent);
        break;
      case 'CustomerSearch':
        // return new AddSpecificComponent(CustomerSearchComponent);
        return new AddSpecificComponent(CustomerSearchFieldsComponent);
        break;
      case 'DecisionAlert':
        return new AddSpecificComponent(DecisionAlertComponent);
        break;
      case 'InterfaceResults':
        return new AddSpecificComponent(InterfaceResultsComponent);
        break;
    }
  }
  // ngOnDestroy() {
  //   this.services.rloCommonData.modalDataSubject.unsubscribe();
  // }
}
