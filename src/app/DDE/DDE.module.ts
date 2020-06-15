import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { DDERoutingModule } from './DDE-routing.module';
import { DDEComponent } from './DDE.component';
import { VisitReportFormModule } from '../VisitReportForm/VisitReportForm.module';
import { HeaderModule } from '../Header/Header.module';
import { FamilyDetailsFormModule } from '../FamilyDetailsForm/FamilyDetailsForm.module';
import { LiabilityDtlsFormModule } from '../LiabilityDtlsForm/LiabilityDtlsForm.module';
import { NotepadDetailsFormModule } from '../NotepadDetailsForm/NotepadDetailsForm.module';
import { IncomeSummaryFormModule } from '../IncomeSummaryForm/IncomeSummaryForm.module';
import { CustomerDtlsModule } from '../CustomerDtls/CustomerDtls.module';
import { OtherDeductionFormModule } from '../OtherDeductionForm/OtherDeductionForm.module';
import { AssetDetailsFormModule } from '../AssetDetailsForm/AssetDetailsForm.module';
import { GoNoGoModule } from '../go-no-go/go-no-go.module';
import { DDEHandlerModule } from '../DDE/DDE-handler.module';
import { ScoreCardModule } from '../score-card/score-card.module';
import { CustomerGridDTLSModule } from '../CustomerGridDTLS/CustomerGridDTLS.module';
import { ReferralDetailsFormModule } from '../ReferralDetailsForm/ReferralDetailsForm.module';
import { HeaderProgressModule } from '../header-progress/header-progress.module';
import { OccupationDtlsFormModule } from '../OccupationDtlsForm/OccupationDtlsForm.module';
import { AddressDetailsModule } from '../AddressDetails/AddressDetails.module';
import { CreditCardDetailsModule } from '../CreditCardDetails/CreditCardDetails.module';
import { PersonalInterviewModule } from '../PersonalInterview/personal-interview.module'

@NgModule({
    imports: [
        CommonModule,
        DDERoutingModule,
        RAFormModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        VisitReportFormModule,
        HeaderModule,
        FamilyDetailsFormModule,
        LiabilityDtlsFormModule,
        NotepadDetailsFormModule,
        IncomeSummaryFormModule,
        CustomerDtlsModule,
        OtherDeductionFormModule,
        AssetDetailsFormModule,
        GoNoGoModule,
        DDEHandlerModule,
        ScoreCardModule,
        HeaderProgressModule,
        CustomerGridDTLSModule,
        OccupationDtlsFormModule,
        AddressDetailsModule,
        ReferralDetailsFormModule,
        CreditCardDetailsModule,
        PersonalInterviewModule
    ],
    declarations: [
        DDEComponent,
    ],
    exports: [
        DDEComponent,
    ],
})
export class DDEModule { }
