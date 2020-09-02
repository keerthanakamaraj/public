import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupAlertComponent } from './popup-alert.component';
import { NotepadDetailsFormModule } from '../NotepadDetailsForm/NotepadDetailsForm.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { AmortizationScheduleModule } from '../amortization-schedule/AmortizationSchedule.module'
import { FamilyDetailsFormModule } from '../FamilyDetailsForm/FamilyDetailsForm.module';
import { GoNoGoModule } from '../go-no-go/go-no-go.module';
import { ReferralDetailsFormModule } from '../ReferralDetailsForm/ReferralDetailsForm.module';
import { CreditCardDetailsModule } from '../CreditCardDetails/CreditCardDetails.module';
import { AddressDetailsModule } from '../AddressDetails/AddressDetails.module';
import { LoanDetailsFormModule } from '../LoanDetailsForm/LoanDetailsForm.module';
import { PersonalInterviewModule } from '../PersonalInterview/personal-interview.module';
import { VisitReportFormModule } from '../VisitReportForm/VisitReportForm.module';
import { ApplicationDtlsModule } from '../ApplicationDtls/ApplicationDtls.module';
import { OccupationDtlsFormModule } from '../OccupationDtlsForm/OccupationDtlsForm.module';
import { AssetDetailsFormModule } from '../AssetDetailsForm/AssetDetailsForm.module';
import { CustomerDtlsModule } from '../CustomerDtls/CustomerDtls.module';
import { FeesChargesDetailsModule } from '../Fees&ChargesDetails/Fees&ChargesDetails.module';
import { DisbursementDetailsModule } from '../DisbursementDetails/DisbursementDetails.module';
import { IncomeSummaryFormModule } from '../IncomeSummaryForm/IncomeSummaryForm.module';
import { LiabilityDtlsFormModule } from '../LiabilityDtlsForm/LiabilityDtlsForm.module';
import { DocumentUploadModule } from '../document-upload/document-upload.module';
import { PropertyDetailsModule } from '../PropertyDetails/PropertyDetails.module';
import { PolicyCheckResultModule } from '../policy-check-result/policy-check-result.module';
import { ScoreCardResultModule } from '../score-card-result/score-card-result.module';

@NgModule({
    imports: [
        CommonModule,
        NotepadDetailsFormModule,
        AmortizationScheduleModule,
        FamilyDetailsFormModule,
        GoNoGoModule,
        ReferralDetailsFormModule,
        CreditCardDetailsModule,
        AddressDetailsModule,
        LoanDetailsFormModule,
        PersonalInterviewModule,
        VisitReportFormModule,
        ApplicationDtlsModule,
        OccupationDtlsFormModule,
        AssetDetailsFormModule,
        FeesChargesDetailsModule,
        CustomerDtlsModule,
        DisbursementDetailsModule,
        IncomeSummaryFormModule,
        LiabilityDtlsFormModule,
        DocumentUploadModule,
        PropertyDetailsModule,
        PolicyCheckResultModule,
        ScoreCardResultModule
    ],
    declarations: [
        PopupAlertComponent,
    ],
    exports: [
        PopupAlertComponent
    ],

})
export class PopUpAlertModule { }
