import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { QDERoutingModule } from './QDE-routing.module';
import { QDEComponent } from './QDE.component';
import { ReferralDetailsFormModule } from '../ReferralDetailsForm/ReferralDetailsForm.module';
import { HeaderModule } from '../Header/Header.module';

import { QDEHandlerModule } from '../QDE/QDE-handler.module';
import { AddressDetailsModule } from '../AddressDetails/AddressDetails.module';
import { OccupationDtlsFormModule } from '../OccupationDtlsForm/OccupationDtlsForm.module';
// import { CUSTOMERHANDLERModule } from '../customer-handler/customer-handler.module';
import { CustomerGridDTLSModule } from '../CustomerGridDTLS/CustomerGridDTLS.module';
import { CustomerDtlsModule } from '../CustomerDtls/CustomerDtls.module';
import { ApplicationDtlsModule } from '../ApplicationDtls/ApplicationDtls.module';
import { NotepadDetailsFormModule } from '../NotepadDetailsForm/NotepadDetailsForm.module'
import { RloUiAccordionModule } from '../rlo-ui-accordion/rlo-ui-accordion.module';

@NgModule({
    imports: [
        CommonModule,
        QDERoutingModule,
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
        ReferralDetailsFormModule,
        HeaderModule,
        CustomerGridDTLSModule,
        QDEHandlerModule,
        AddressDetailsModule,
        OccupationDtlsFormModule,
        CustomerDtlsModule,
        ApplicationDtlsModule,
        NotepadDetailsFormModule,
        RloUiAccordionModule
    ],
    declarations: [
        QDEComponent
    ],
    exports: [
        QDEComponent,
    ],
})
export class QDEModule { }
