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
        OccupationDtlsFormModule
    ],
    declarations: [
        PopupAlertComponent,
    ],
    exports: [
        PopupAlertComponent
    ],

})
export class PopUpAlertModule { }
