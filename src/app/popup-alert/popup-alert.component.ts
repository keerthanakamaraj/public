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
import { IAmortizationForm } from '../Interface/masterInterface';
import { PropertyDetailsComponent } from '../PropertyDetails/PropertyDetails.component';
import { PolicyCheckResultComponent } from '../policy-check-result/policy-check-result.component';
import { ScoreCardResultComponent } from '../score-card-result/score-card-result.component';
import { CustomerSearchComponent } from '../customer-search/customer-search.component';

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

  constructor(public activeModal: NgbActiveModal, public services: ServiceStock, private componentFactoryResolver: ComponentFactoryResolver, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.modalObject = this.services.rloui.modalObject;
    console.error(this.modalObject);
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
    this.activeModal.close(buttonObj);
    //on click of modal button send the button obj eg: {id: 1, text: 'Save';, type: "success", class: "btn-primary"}. Depending on which btn click(id); perform actions. Respnse snt where the component/ngModal is invoked 
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

    console.log("DEEP | popup alert object______", this.modalObject);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentRef.component);

    const viewContainerRef = this.FormHost;
    viewContainerRef.clear();

    const dynamicComponent = viewContainerRef.createComponent(componentFactory);
    var componentInstance = dynamicComponent.instance;
    componentInstance.parentData = this.modalObject.data;

    if (this.modalObject.componentName != 'AmortizationScheduleComponent' && this.modalObject.componentName != 'DisbursementDetailsComponent' && this.modalObject.componentName != 'FeesChargesDetailsComponent') {
      componentInstance.isLoanCategory = isLoanCategory;
      componentInstance.parentFormCode = this.modalObject.componentCode;
      componentInstance.ApplicationId = this.modalObject.applicationId;
      componentInstance.activeBorrowerSeq = this.modalObject.borrowerSeq;
      componentInstance.readOnly = true;

      if (this.modalObject.componentName == "CustomerDetails") {
        setTimeout(() => {
          componentInstance.loanCategoryChanged(isLoanCategory);
        }, 1000);
      } else if (this.modalObject.componentName == "FeesAndChargesDetails") {
        const parentData: IAmortizationForm = undefined;
        let obj = {
          "ApplicationId": this.modalObject.applicationId
        }
        componentInstance.parentData = obj;
      } else if (this.modalObject.componentName == 'Amortization') {
        componentInstance.parentData = this.services.rloCommonData.amortizationModalDataUW
      } else if (this.modalObject.componentName == 'ObligationDetails') {
        componentInstance.setTypeObligation = true;
      } else if (this.modalObject.componentName == 'ScorecardResults') {
        componentInstance.openInModal = true;
      } else if (this.modalObject.componentName == 'PolicyCheckResults') {
        componentInstance.openInModal = true;
        componentInstance.parentFormCode = "DDE";//used in condition to check score acc. to stage
      } else if (this.modalObject.componentName == 'CreditCardDetails') {
        componentInstance.enableApproveLimit = true;
      }

      // async brodcastProdCategory(event) {
      //   //  event.isLoanCategory false when type is 'CC'
      //   this.isLoanCategory = event.isLoanCategory;
      //   if (this.formMenuObject.selectedMenuId == 'CustomerDetails') {
      //   componentInstance.loanCategoryChanged(event.isLoanCategory);
      //     // this.services.rloCommonData.childToParentSubject.next({
      //     //     action: 'loanCategoryUpdated',
      //     //     data: { 'isLoanCategory':  event.isLoanCategory }
      //     // });
      //   }
      //   this.CUSTOMER_GRID.isLoanCategory = event.isLoanCategory;
      // }
    }

    setTimeout(() => {
      const activePanel = document.getElementsByClassName("pop-up-components");
      const firstInput = activePanel[0].getElementsByTagName('input')[0];
      if (firstInput != undefined)
        firstInput.blur();
    }, 10);
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
        return new AddSpecificComponent(CustomerSearchComponent);
        break;

    }
  }
  // ngOnDestroy() {
  //   this.services.rloCommonData.modalDataSubject.unsubscribe();
  // }
}
