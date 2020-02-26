import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { QDERoutingModule } from './QDE-routing.module';
import { QDEComponent } from './QDE.component';
import { ApplicationDtlsModule } from '../ApplicationDtls/ApplicationDtls.module';
import { LoanDetailsFormModule } from '../LoanDetailsForm/LoanDetailsForm.module';
import { AddressDetailsModule } from '../AddressDetails/AddressDetails.module';
import { OccupationDtlsFormModule } from '../OccupationDtlsForm/OccupationDtlsForm.module';
import { CustomerDtlsModule } from '../CustomerDtls/CustomerDtls.module';
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
ApplicationDtlsModule,
LoanDetailsFormModule,
AddressDetailsModule,
OccupationDtlsFormModule,
CustomerDtlsModule,
],
declarations: [
QDEComponent,
],
exports:[
QDEComponent,
],
})
export class QDEModule { }
